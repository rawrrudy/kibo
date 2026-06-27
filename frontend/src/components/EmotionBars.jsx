function EmotionBars({ emotionCounts }) {
  if (!emotionCounts) {
    return null;
  }

  const maxValue = Math.max(...Object.values(emotionCounts));

  const moodEmoji = {
    happy: "😊",
    sad: "😔",
    angry: "😡",
    anxious: "😰",
    excited: "🤩",
  };

  return (
    <div
      style={{
        flex: 1,
        minWidth: "420px",
        background: "rgba(30, 41, 59, 0.9)",
        borderRadius: "20px",
        padding: "25px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2 
        style={{
          marginBottom: "25px",
        }}
      >
        📊 Emotion Distribution
      </h2>

      {Object.entries(emotionCounts).map(([emotion, count]) => (
        <div
          key={emotion}
          style={{
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span>
              {moodEmoji[emotion]} {emotion}
            </span>

            <strong>{count}</strong>
          </div>

          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#334155",
              borderRadius: "999px",
            }}
          >
            <div
              style={{
                width: `${(count / maxValue) * 100}%`,
                height: "100%",
                background:
                  "linear-gradient(90deg, #4F46E5, #22C55E)",
                borderRadius: "999px",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmotionBars;