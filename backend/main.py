from fastapi.middleware.cors import CORSMiddleware
from calendar_service import get_calendar
from weather import get_weather
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import time
import socket
import subprocess


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


previous = psutil.net_io_counters()
previous_time = time.time()

boot_time = psutil.boot_time()
def docker_running(name):
    result = subprocess.run(
        [
            "docker",
            "ps",
            "--filter",
            f"name={name}",
            "--format",
            "{{.Names}}"
        ],
        capture_output=True,
        text=True
    )

    return bool(result.stdout.strip())

def service_running(name):
    result = subprocess.run(
        [
            "systemctl",
            "is-active",
            name
        ],
        capture_output=True,
        text=True
    )

    return result.stdout.strip() == "active"

@app.get("/stats")
def stats():
    global previous, previous_time

    current = psutil.net_io_counters()
    current_time = time.time()

    elapsed = current_time - previous_time

    upload = 0
    download = 0

    if elapsed > 0:
        upload = (
            current.bytes_sent -
            previous.bytes_sent
        ) / elapsed

        download = (
            current.bytes_recv -
            previous.bytes_recv
        ) / elapsed


    previous = current
    previous_time = current_time


    return {

         "hostname": socket.gethostname(),

         "cpu": psutil.cpu_percent(),

         "ram": psutil.virtual_memory().percent,

         "disk": psutil.disk_usage("/").percent,

         "media": psutil.disk_usage("/mnt/agaadhamu").percent,

         "upload": round(upload / 1024 / 1024, 2),

         "download": round(download / 1024 / 1024, 2),

         "uptime": int(time.time() - boot_time),

         "services": {
             "jellyfin": docker_running("jellyfin"),
             "immich": docker_running("immich"),
             "pihole": service_running("pihole-FTL"),
             "homeAssistant": docker_running("home-assistant"),
    },

    "weather": get_weather(),
    "calendar": get_calendar(),
}
