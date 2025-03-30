from django.http import JsonResponse
import requests
import os

def get_weather(request):
    try:
        city = request.GET.get('city')
        if not city:
            return JsonResponse({'error': 'City parameter is required'}, status=400)

        api_key = 'd2446a24cb949c7460fb076899f018f9'
        base_url = 'https://api.openweathermap.org/data/2.5'
        
        params = {
            'q': city,
            'appid': api_key,
            'units': 'metric'
        }
        
        response = requests.get(f"{base_url}/weather", params=params)
        response.raise_for_status()
        
        return JsonResponse(response.json())
    
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
