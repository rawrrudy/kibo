function InsightCard({ emotion, streak }) {

    let insight = "";

    if (streak >= 7) {
        insight = 
          " Amazing consistency! You're on fire! 🔥🔥🔥";
    }

    else if (emotion === "happy") {
        insight =
          "You've mostly been feeling happy lately! Keep doing things that make you smile 😀😀😀";
    }

    else if (emotion === "sad") {
        insight =
          "Awww noooo :( You've been feeling down recently. Don't forget that every emotion is temporary and I'm already proud of you just by checking in!";
    }

    else if (emotion === "angry") {
        insight =
          "You've expereienced some frustration recently. WE GOT THIS. Take small breaks and slow down the tempo, and I'm sure things will be great again! ❤️❤️❤️";
    }

    else if (emotion === "anxious") {
        insight =
          "Things may feel overwhelming sometimes. Focus on one thing at a time. YOU'VE GOT THIS!!! 😁😁😁";
    }

    else if (emotion === "excited") {
        insight =
          "WOOHOOO!!! THIS EXCITEMENT OF YOURS IS CONTAGIOUS!!! ENJOY AND CHERISH THESE MOMENTS!!! 🥳🥳🥳";
    }

    else {
        insight =
          "Keep checking in daily to unlock PERSONALIZED INSIGHTS (I promise, it's SUPER COOL 😎)";
    }

    return (
        <div
          style={{
            marginTop: "0px",
            height: "100%",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
            padding: "25px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>
            Kibo Insights
          </h2>

          <p
            style={{
              color: "#CBD5E1",
              lineHeight: "1.8",
            }}
          >
            {insight}
          </p>
        </div>
    );
}

export default InsightCard;