function Card({ title, value }) {
  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 15px 35px rgba(79,70,229,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 
          "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 8px 24px rgba(0,0,0,0.25)";
      }}
      style={{
        background:
          "rgba(255,255,255,0.05)",

        backdropFilter: "blur(12px)",

        border:
          "1px solid rgba(255,255,255,0.1)",
        
        borderRadius: "20px",

        padding: "24px",

        width: "260px",
        height: "140px",

        transition: "all 0.3s ease",

        cursor: "default",
        transition: "all 0.25s ease",

        boxShadow:
          "0 8px 24px rgba(0,0,0,0.25)",
      }}
    >
      <h3
        style={{
          color: "#94A3B8",
          marginBottom: "12px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: "#F8FAFC",
          fontSize: "2rem",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default Card;