import logging
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, smart_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from accounts.renderers import UserRenderer
from django.core.mail import send_mail
from django.conf import settings

User = get_user_model()

# Set up logging
logger = logging.getLogger(__name__)

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ["email", "name", "tc", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    
    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        if password != password2:
            raise serializers.ValidationError({"password2": "Passwords must match"})
        return attrs

    
    def create(self, validated_data):
        validated_data.pop("password2")  
        return User.objects.create_user(**validated_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ["email", "password"]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","email", "name"]

class UserChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User 
        fields = ["password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")

        if password != password2:
            raise serializers.ValidationError({"password2": "Passwords must match"})
        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance
    

# 🔹 Send Password Reset Email
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")

        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "User not found with this email"})

        user = User.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(str(user.pk))) 
        token = PasswordResetTokenGenerator().make_token(user)
        reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"

        # Send email
        subject = "Password Reset Request"
        message = f"Click the link below to reset your password:\n{reset_link}"
        send_mail(subject, message, settings.EMAIL_HOST_USER, [email])

        return {"email": email, "reset_link": reset_link}



# 🔹 Reset Password
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        uid = self.context.get("uid")
        token = self.context.get("token")

        if password != password2:
            raise serializers.ValidationError({"password2": "Passwords must match"})

        try:
            user_id = smart_str(urlsafe_base64_decode(uid)) 
            user = User.objects.filter(id=user_id).first()

            if user is None or not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError({"token": "Token is invalid or expired"})

            user.set_password(password)
            user.save()
            return attrs

        except Exception:
            raise serializers.ValidationError({"token": "Invalid UID"})
