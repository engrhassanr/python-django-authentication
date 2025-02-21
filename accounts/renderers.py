from rest_framework import renderers
import json

class UserRenderer(renderers.JSONRenderer): 
    charset = "utf-8"

    def render(self, data, accepted_media_types=None, renderer_context=None):  
        response = ""

        
        if isinstance(data, dict) and not  data.get('msg'):
            response = json.dumps({"errors": data})  
        else:
            response = json.dumps(data)

        return response
