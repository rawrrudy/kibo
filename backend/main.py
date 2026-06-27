from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime,timedelta
from collections import Counter
import json
from storage import save_emotion
from fastapi import FastAPI
from pydantic import BaseModel

from emotions import EMOTION_RESPONSES

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmotionInput(BaseModel):
    emotion: str

@app.get("/")
def home():
    return {
        "project": "Kibo",
        "status": "Running"
    }

@app.post("/emotion")
def receive_emotion(data: EmotionInput):

    emotion = data.emotion.lower()

    save_emotion(emotion)

    if emotion in EMOTION_RESPONSES:
        return EMOTION_RESPONSES[emotion]
    
    return {
        "message": "Thank you for sharing how you feel!"
    }

@app.get("/history")
def get_history():

    with open("emotion_log.json", "r") as file:
        data = json.load(file)

    return data

@app.get("/analytics")
def get_analytics():

    with open("emotion_log.json", "r") as file:
        data = json.load(file)

    emotions = [entry["emotion"] for entry in data]

    counts = Counter(emotions)

    return{
        "total_entries": len(data),
        "emotion_counts": dict(counts)
    }

@app.get("/streak")
def get_streak():

    with open("emotion_log.json", "r") as file:
        data = json.load(file)

    if not data:
        return {"current streak": 0}
    
    dates = set()

    for entry in data:
        date = datetime.fromisoformat(
            entry["timestamp"]
        ).date()

        dates.add(date)
    
    dates = sorted(dates, reverse=True)

    today = datetime.now().date()

    streak = 0
    current_date = today

    while current_date in dates:
        streak += 1
        current_date -= timedelta(days=1)

    return {
        "current_streak": streak
    }

@app.get("/weekly-goal")
def weekly_goal():

    with open("emotion_log.json", "r") as file:
        data = json.load(file)
    
    today = datetime.now().date()
    week_ago = today - timedelta(days=6)

    checkin_days = set()

    for entry in data:
        date = datetime.fromisoformat(
            entry["timestamp"]
        ).date()

        if date >= week_ago:
            checkin_days.add(date)
    
    return {
        "goal": 7,
        "completed": len(checkin_days)
    }

@app.get("/dashboard")
def dashboard():

    with open("emotion_log.json", "r") as file:
        data = json.load(file)

    emotions = [entry["emotion"] for entry in data]

    counts = Counter(emotions)

    return {
        "total_entries": len(data),
        "emotion_counts": dict(counts),
        "recent_emotions": data[-5:]
    }