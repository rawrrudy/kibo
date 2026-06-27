import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; 

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(15, 23, 42, 0.92)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
        }}
      >
        <img
          src={logo}
          alt="Kibo"
          style={{
            width: "42px",
            height: "42px",
            objectFit: "contain",
          }}
        />

        <span
          style={{
            color: "white",
            fontSize: "1.45rem",
            fontWeight: "700",
            letterSpacing: "-0.5px",
          }}
        >
          Kibo
        </span>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <Link
          to="/checkin"
          style={{
            color: "#CBD5E1",
            textDecoration: "none",
            fontWeight: "500",
            transition: "0.25s",
          }}
        >
          Check-In
        </Link>

        <Link
          to="/dashboard"
          style={{
            color: "#CBD5E1",
            textDecoration: "none",
            fontWeight: "500",
            transition: "0.25s",
          }}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;