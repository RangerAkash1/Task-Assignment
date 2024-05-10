import requests
locations = ["Kharagpur", "Kolkata", "Delhi", "London"]
URL = 'http://api.weatherapi.com/v1/current.json?key=192e3aaf21ff4c0eaab95337240503&q=bulk'

req_body = []
for location in locations:
    req_body.append({'q': location})
req_body = {
    'locations': req_body
}
response = requests.post(URL, json=req_body)
response = response.json().get('bulk')
weather_data = []
for location in response:
    weather_data.append({
        'name': location.get('query').get('location').get('name'),
        'deg': location.get('query').get('current').get('temp_c'),
    })

print(weather_data)
