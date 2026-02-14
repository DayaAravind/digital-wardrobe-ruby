import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="center-screen">
      <div className="auth-card">
        <h2>Verify OTP</h2>

        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleBackspace(e, index)
              }
            />
          ))}
        </div>

        <div style={{ textAlign: "center", fontSize: "14px" }}>
          {timer > 0
            ? `Resend OTP in ${timer}s`
            : "You can resend OTP"}
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/dashboard")}
        >
          Verify
        </button>
      </div>
    </div>
  );
}
