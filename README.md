**Dockerfile**
# Use Python image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Expose port 8000
EXPOSE 8000

# Run the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]




**docker-compose.yml**
version: "3.8"

services:
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    environment:
      - DEBUG=1
    command: python manage.py runserver 0.0.0.0:8000




docker-compose up --build -d

docker-compose run web django-admin startproject auth_project .

docker-compose run web python manage.py migrate

docker-compose run web python manage.py startapp accounts

docker-compose run web python manage.py createsuperuser


docker-compose down  # Stop and remove old containers
docker-compose build  # Rebuild the image
docker-compose up -d  # Run in detached mode


docker-compose run web python manage.py migrate
docker-compose run web python manage.py createsuperuser
