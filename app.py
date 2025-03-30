from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='public')
CORS(app)

WEATHER_API_KEY = os.getenv('WEATHER_API_KEY')
WEATHER_BASE_URL = os.getenv('WEATHER_BASE_URL', 'https://api.openweathermap.org/data/2.5')

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/weather')
def get_weather():
    try:
        city = request.args.get('city')
        if not city:
            return jsonify({'error': 'City parameter is required'}), 400

        params = {
            'q': city,
            'appid': WEATHER_API_KEY,
            'units': 'metric'
        }
        
        response = requests.get(f"{WEATHER_BASE_URL}/weather", params=params)
        response.raise_for_status()
        
        return jsonify(response.json())
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=True)
