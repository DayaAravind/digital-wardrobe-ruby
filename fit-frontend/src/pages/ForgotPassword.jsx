import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="center-screen">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        <input placeholder="Enter your email" required />

        <button
          className="primary-btn"
          onClick={() => navigate("/reset")}
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
