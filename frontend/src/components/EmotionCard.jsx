function EmotionCard({
  emoji,
  label,
  selected,
  onClick,
}) {
  return (
    <div 
      onClick={onClick}
      style={{
        width: "170px",
        height: "170px",

        background:
          "rgba(255,255,255,0.05)",
        
        backdropFilter: "blur(12px)",

        border: selected
          ? "2px solid #8B5CF6"
          : "1px solid rgba(255,255,255,0.1)",

        borderRadius: "24px",

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

        cursor: "pointer",

        transition: "all 0.25s ease",

        transform: selected
          ? "scale(1.05)"
          : "scale(1)",

        boxShadow: selected
          ? "0 0 30px rgba(139,92,246,0.5)"
          : "0 8px 20px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          fontSize: "3rem",
          marginBottom: "12px",
        }}
      >
        {emoji}
      </div>

      <h3>{label}</h3>
    </div>
  );
}

export default EmotionCard;