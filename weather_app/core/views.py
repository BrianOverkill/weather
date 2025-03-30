from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

from django.shortcuts import render
from django.http import JsonResponse
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('WEATHER_API_KEY')
BASE_URL = os.getenv('WEATHER_BASE_URL')

def index(request):
    return render(request, 'index.html')

def get_weather(request):
    city = request.GET.get('city')
    
    if not city:
        return JsonResponse({'error': 'City parameter is required'}, status=400)
    
    try:
        url = f"{BASE_URL}/weather"
        params = {
            'q': city,
            'appid': API_KEY,
            'units': 'metric'
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if response.status_code != 200:
            return JsonResponse({'error': data.get('message', 'Failed to fetch weather data')}, status=400)
        
        return JsonResponse(data)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

