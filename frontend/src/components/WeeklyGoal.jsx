function WeeklyGoal({ completed, goal }) {
  const percentage = (completed / goal) * 100;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: "20px",
        padding: "25px",
        border: "1px solid rgba(255,255,255,0.08)",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        🎯 Weekly Goal
      </h2>

      <div
        style={{
          width: "100%",
          height: "14px",
          background: "#334155",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background:
              "linear-gradient(90deg, #4F46E5)",
            borderRadius: "999px",
            transition: "0.4s",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "15px",
          fontSize: "1.05rem",
          color: "#CBD5E1",
        }}
      >
        <strong>{completed}</strong> / {goal} days completed this week.
      </p>
    </div>
  );
}

export default WeeklyGoal;