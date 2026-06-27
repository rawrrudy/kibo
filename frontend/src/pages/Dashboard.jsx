import { useEffect, useState } from "react";
import api from "../services/api";
import Card from "../components/Card";
import EmotionBars from "../components/EmotionBars";
import Navbar from "../components/Navbar";
import InsightCard from "../components/InsightCard";
import RecentCheckins from "../components/RecentCheckins";
import WeeklyGoal from "../components/WeeklyGoal";
import { motion } from "framer-motion";

function Dashboard() {
  const [data, setData] = useState(null);
  const [recentEmotions, setRecentEmotions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState({
    completed: 0,
    goal: 7,
  })

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        console.log(res.data);

        setData(res.data);
        setRecentEmotions(res.data.recent_emotions);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStreak = async () => {
      try {
        const res = await api.get("/streak");
        setStreak(res.data.current_streak);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchWeeklyGoal = async () => {
      try {
        const res = await api.get("/weekly-goal");
        setWeeklyGoal(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
    fetchStreak();
    fetchWeeklyGoal();
  }, []);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  const mostCommonEmotion =
    Object.entries(data.emotion_counts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "None";

  const moodEmoji = {
    happy: "😊",
    sad: "😔",
    angry: "😡",
    anxious: "😰",
    excited: "🤩",
  };

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <>
      <Navbar />
    
    <div style={{ padding: "50px" }}>

      <motion.div
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        style={{
          background:
            "linear-gradient(135deg, #4F46E5, #7C3AED",
          padding: "35px",
          borderRadius: "24px",
          marginBottom: "35px",
          boxShadow:
            "0 10px 30px rgba(79,70,229,0.35)",
        }}
      >
        <h2
          style={{
            fontSize: "2.2rem",
            marginBottom: "12px",
          }}
        >
          👋 {greeting}, Rudy!
        </h2>

        <p
          style={{
            fontSize: "1.15rem",
            opacity: 0.95,
            lineHeight: "1.6",
          }}
        >
          You're currently on a{" "}
          <strong>{streak} day streak</strong>!
          THATSSS THE SPIRITITTIT!!!! You can DEFINITELY do better 
        </p>

        <div
          style={{
            marginTop: "18px",
            display: "inline-block",
            background: "rgba(255,255,255,0.15)",
            padding: "10px 18px",
            borderRadius: "999px",
          }}
        >
          WOOHOOO KEEP GOING!!! Consistency beats perfection.
        </div>
      </motion.div>

      <WeeklyGoal
        completed={weeklyGoal.completed}
        goal={weeklyGoal.goal}
      />
      
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
          Kibo Dashboard
        </h1>

        <p 
          style={{
            color: "#94A3B8",
            fontSize: "1.1rem",
          }}
        >
          A cute companion that keeps check on your emotions!
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <Card
          title="Total Check-Ins"
          value={data.total_entries}
        />

        <Card
          title="Emotions Logged"
          value={
            Object.keys(data.emotion_counts).length
          }
        />

        <Card
          title="🔥 Streak"
          value={`${streak} Days`}
        />

        <Card
          title="Most Common Mood"
          value={`${moodEmoji[mostCommonEmotion] || ""} ${mostCommonEmotion}`}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "40px",
          marginTop: "30px",
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        <EmotionBars
          emotionCounts={data.emotion_counts}
        />

        <div
          style={{
            flex: 1,
            minWidth: "420px",
          }}
        >
          <InsightCard
            emotion={mostCommonEmotion}
            streak={streak}
          />
        </div>
      </div>

      <RecentCheckins
        entries={recentEmotions}
      />
      
    </div>
    </>
  );
}

export default Dashboard;