import json
from datetime import datetime

LOG_FILE = "emotion_log.json"

def save_emotion(emotion):

    try:
        with open(LOG_FILE, "r") as file:
            data = json.load(file)

    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    entry = {
        "emotion": emotion,
        "timestamp": datetime.now().isoformat()
    }

    data.append(entry)

    with open(LOG_FILE, "w") as file:
        json.dump(data, file, indent=4)