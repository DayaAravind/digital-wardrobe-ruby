import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(passwords.password))
      return "Password must be strong";
    if (passwords.password !== passwords.confirmPassword)
      return "Passwords do not match";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="center-screen">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          required
          onChange={(e) =>
            setPasswords({
              ...passwords,
              password: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          onChange={(e) =>
            setPasswords({
              ...passwords,
              confirmPassword: e.target.value,
            })
          }
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="primary-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
}
