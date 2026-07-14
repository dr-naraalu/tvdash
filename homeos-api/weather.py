import requests


LAT = 17.3850
LON = 78.4867


def weather_message(temp, rain, condition):

    if rain >= 60:
        return "Raincoat pettuko... varsham padela undi 🌧️"


    if temp >= 35:
        return "Endalu menduga kaayunu!! Water bottle marchipoku ☀️"


    if temp <= 18:
        return "Shiverrrinnnggaaaaa... sweater vesko 🥶"


    if condition == "cloudy":
        return "Meghalu cover chestunnayi ☁️"


    return "Weather baagundi... enjoy cheyyi 😎"



def get_weather():

    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={LAT}"
        f"&longitude={LON}"
        "&current=temperature_2m,relative_humidity_2m,weather_code"
        "&hourly=temperature_2m,precipitation_probability"
        "&timezone=Asia/Kolkata"
    )


    data = requests.get(url).json()


    current = data["current"]

    hourly = data["hourly"]


    temp = current["temperature_2m"]


    rain = hourly["precipitation_probability"][0]



    forecast = []


    for i in range(1,5):

        forecast.append({

            "time":
            hourly["time"][i][-5:],


            "temp":
            hourly["temperature_2m"][i],


            "rain":
            hourly["precipitation_probability"][i],

        })



    return {

        "temperature": temp,

        "humidity":
        current["relative_humidity_2m"],


        "forecast": forecast,


        "message":
        weather_message(
            temp,
            rain,
            "normal"
        )

    }