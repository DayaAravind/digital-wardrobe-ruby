import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    location: "",
  });

  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailBlur = () => {
    setTouchedEmail(true);

    if (form.email && !emailRegex.test(form.email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Password checks
  const passwordChecks = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[@$!%*?&]/.test(form.password),
  };

  const isPasswordValid =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.number &&
    passwordChecks.special;

  const isFormValid =
    form.fullName &&
    emailRegex.test(form.email) &&
    form.mobile &&
    form.age &&
    form.gender &&
    form.location &&
    isPasswordValid &&
    form.password === form.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/verify-otp");
    }
  };

  return (
    <div className="center-screen">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          className="full-input"
          placeholder="Full Name"
          required
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
        />

        {/* Email */}
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
          placeholder="Mobile"
          required
          onChange={(e) =>
            setForm({ ...form, mobile: e.target.value })
          }
        />

        {/* Password */}
        <input
          className="full-input"
          type="password"
          placeholder="Password"
          required
          onFocus={() => setIsTypingPassword(true)}
          onBlur={() => setIsTypingPassword(false)}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Password Rules (only while typing) */}
        {isTypingPassword && (
          <div className="password-rules">
            <p className={passwordChecks.length ? "valid" : ""}>
              • Minimum 8 characters
            </p>
            <p className={passwordChecks.uppercase ? "valid" : ""}>
              • At least 1 uppercase letter
            </p>
            <p className={passwordChecks.number ? "valid" : ""}>
              • At least 1 number
            </p>
            <p className={passwordChecks.special ? "valid" : ""}>
              • At least 1 special character (@$!%*?&)
            </p>
          </div>
        )}

        <input
          className="full-input"
          type="password"
          placeholder="Confirm Password"
          required
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
        />

        {form.confirmPassword &&
          form.password !== form.confirmPassword && (
            <p className="error">
              Passwords do not match
            </p>
          )}

        <input
          className="full-input"
          type="number"
          placeholder="Age"
          required
          onChange={(e) =>
            setForm({ ...form, age: e.target.value })
          }
        />

        <select
          className="full-input"
          required
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value })
          }
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          className="full-input"
          placeholder="Location"
          required
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

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
          Create Account
        </button>
      </form>
    </div>
  );
}
