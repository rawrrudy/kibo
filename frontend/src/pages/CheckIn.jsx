import { useState } from "react";
import api from "../services/api";
import EmotionCard from "../components/EmotionCard";
import Navbar from "../components/Navbar";

function CheckIn() {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [response, setResponse] = useState("");

  const emotions = [
    { emoji: "😊", name: "happy" },
    { emoji: "😔", name: "sad" },
    { emoji: "😡", name: "angry" },
    { emoji: "😰", name: "anxious" },
    { emoji: "🤩", name: "excited" },
  ];

  const submitEmotion = async () => {
    if (!selectedEmotion) {
      setResponse("Please select an emotion first!");
      return;
    }

    try {
      await api.post("/emotion", {
        emotion: selectedEmotion,
      });

      setResponse(
        responses[selectedEmotion] ||
        "Thank you for checking in today! YAYAYAYAYA"
      );

      setSelectedEmotion("");
    } catch (error) {
      console.error(error);
      setResponse("Could not connect to backed.");
    }
  };

  const responses = {
    happy:
      "That's wondeful!!! You go and spread that pawsitive energy 💅💅",
    
    sad:
      "It's completely okay to feel that dude. But you go and rock 💪💪",

    angry:
      "Take a deep breath. You've got this 🤘🤘",

    anxious:
      "One step at a time. I know you can do this ✌️✌️",

    excited:
      "NOW THATS THE SPIRIT I LIKE. KEEP GOING CHAMP 🕺🕺",
  };


  return (
    <>
      <Navbar />
    
    <div>
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "10px",
          }}
        >
          How are you feeling today?
        </h1>

        <p
          style={{
            color: "#94A3B8",
          }}
        >
          Take a quick emotional check-in!
        </p>
      </div>

      <div 
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {emotions.map((emotion) => (
          <EmotionCard
            key={emotion.name}
            emoji={emotion.emoji}
            label={emotion.name}
            selected={
              selectedEmotion === emotion.name
            }
            onClick={() =>
              setSelectedEmotion(emotion.name)
            }
          />
        ))}
      </div>

      <br />
      <br />

      {selectedEmotion && (
        <h2
          style={{
            marginTop: "25px",
            color: "#A78BFA",
          }}
        >
          Feeling {selectedEmotion} today
        </h2>
      )}

      <button
        onClick={submitEmotion}
        style={{
          marginTop: "30px",
          background: "#4F46E5",
          color: "white",
          border: "none",
          padding: "14px 30px",
          borderRadius: "12px",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        Continue
      </button>

      {response && (
        <div
          style={{
            marginTop: "25px",
            background: "rgba(139,92,246,0.15)",
            border: "1px solid #8B5CF6",
            padding: "15px",
            borderRadius: "12px",
          }}
        >
          {response}
        </div>
      )}
    </div>
    </>
  );
}

export default CheckIn;