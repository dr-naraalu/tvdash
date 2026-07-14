import requests
from datetime import datetime

LAT = 17.3850
LON = 78.4867


def weather_message(temp, rain, condition):

    if rain >= 60:
        return "Raincoat pettuko... varsham padela undi"

    if temp >= 35:
        return "Endalu menduga kaayunu!! Water bottle marchipoku"

    if temp <= 18:
        return "Shiverrrinnnggaaaaa... sweater vesko pakkaaaa"

    if condition == "cloudy":
        return "Mabbu teralo soorid"

    return "Vaatavarana samacharam samaptam"


def get_weather():

    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={LAT}"
        f"&longitude={LON}"
        "&current=temperature_2m,relative_humidity_2m,weather_code"
        "&hourly=temperature_2m,precipitation_probability"
        "&timezone=Asia/Kolkata"
    )

    response = requests.get(url, timeout=10)
    data = response.json()

    current = data["current"]
    hourly = data["hourly"]

    temp = current["temperature_2m"]

    now = datetime.now()

    current_index = 0

    for i, t in enumerate(hourly["time"]):

        forecast_time = datetime.fromisoformat(t)

        if forecast_time >= now:
            current_index = i
            break

    rain = hourly["precipitation_probability"][current_index]

    forecast = []

    for i in range(current_index + 1, current_index + 5):

        if i >= len(hourly["time"]):
            break

        forecast.append(
            {
                "time": datetime.fromisoformat(
                    hourly["time"][i]
                ).strftime("%H:%M"),

                "temp": hourly["temperature_2m"][i],

                "rain": hourly["precipitation_probability"][i],
            }
        )

    return {

        "temperature": temp,

        "humidity": current["relative_humidity_2m"],

        "condition": current["weather_code"],

        "forecast": forecast,

        "message": weather_message(
            temp,
            rain,
            "normal",
        ),
    }
