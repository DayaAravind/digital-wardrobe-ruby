import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailBlur = () => {
    if (form.email && !emailRegex.test(form.email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const isFormValid =
    emailRegex.test(form.email) &&
    form.password.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    login();
    navigate("/dashboard");
  };

  return (
    <div className="center-screen">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          className={`full-input ${emailError ? "input-error" : ""}`}
          placeholder="Email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          onBlur={handleEmailBlur}
        />

        {emailError && (
          <p className="error">{emailError}</p>
        )}

        <input
          className="full-input"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <div
          className="link"
          onClick={() => setShowPassword(!showPassword)}
          style={{ textAlign: "left" }}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </div>

        <div
          className="link"
          onClick={() => navigate("/forgot")}
          style={{ textAlign: "left" }}
        >
          Forgot Password?
        </div>

        <button
          type="submit"
          className="primary-btn"
          disabled={!isFormValid}
          style={{
            opacity: isFormValid ? 1 : 0.6,
            cursor: isFormValid
              ? "pointer"
              : "not-allowed",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
