import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.svg";

function Home() {
  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: "900px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <motion.img
            src={logo}
            alt="Kibo"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "240px",
              marginBottom: "20px",
              filter:
                "drop-shadow(0 0 18px rgba(124,58,237,0.35))",
            }}
          />

          <h1
            style={{
              fontSize: "5rem",
              fontWeight: "800",
              marginBottom: "15px",
              letterSpacing: "-2px",
            }}
          >
            Kibo
          </h1>

          <p
            style={{
              fontSize: "1.35rem",
              color: "#CBD5E1",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            Your cutest desktop companion that helps you
            deal with your emotions!
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "50px",
              flexWrap: "wrap",
            }}
          >
            <Link to="/checkin">
              <button
                style={{
                  background:
                    "linear-gradient(135deg,#4F46E5,#7C3AED)",
                  color: "white",
                  border: "none",
                  padding: "18px 34px",
                  borderRadius: "14px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  boxShadow:
                    "0 12px 25px rgba(79,70,229,0.35)",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
              >
                Start Today's CheckIn!
              </button>
            </Link>

            <Link to="/dashboard">
              <button
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "18px 34px",
                  borderRadius: "14px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
              >
                📊 View Dashboard
              </button>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "60px",
              marginTop: "70px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "2.4rem",
                  marginBottom: "8px",
                }}
              >
                😊
              </h2>

              <p
                style={{
                  color: "#CBD5E1",
                }}
              >
                Track Emotions!
              </p>
            </div>

            <div>
              <h2
                style={{
                  fontSize: "2.4rem",
                  marginBottom: "8px",
                }}
              >
                🔥
              </h2>

              <p
                style={{
                  color: "#CBD5E1",
                }}
              >
                Build Streaks!
              </p>
            </div>

            <div>
              <h2
                style={{
                  fontSize: "2.4rem",
                  marginBottom: "8px",
                }}
              >
                💡
              </h2>

              <p
                style={{
                  color: "#CBD5E1",
                }}
              >
                Gain Insights!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Home;