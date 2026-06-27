function RecentCheckins({ entries }) {
  const moodEmoji = {
    happy: "😊",
    sad: "😔",
    angry: "😡",
    anxious: "😰",
    excited: "🤩",
  };

function formatDate(timestamp) {
  const date = new Date(timestamp);

  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

  return (
    <div
      style={{
        marginTop: "30px",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "25px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        📅 Recent Check-ins
      </h2>

      {entries.length === 0 ? (
        <p>No checkins yet.</p>
      ) : (
        entries
          .slice()
          .reverse()
          .map((entry, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom:
                  index !== entries.length - 1
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "none",
              }}
            >
              <span
                style={{
                    fontSize: "1.1rem",
                }}
              >
                {moodEmoji[entry.emotion]}{" "}
                {entry.emotion}
              </span>

              <span
                style={{
                    color: "#94A3B8",
                    fontSize: "0.9rem",
                }}
              >
                {formatDate(entry.timestamp)}
              </span>
            </div>
          ))
      )}
    </div>
  );
}

export default RecentCheckins;