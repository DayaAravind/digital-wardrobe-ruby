import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { MdOutlineCheckroom, MdOutlineLocalLaundryService } from "react-icons/md";
import { AiOutlineRise } from "react-icons/ai";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    "Smart Wardrobe Management",
    "Laundry Tracking",
    "Style Recommendations",
    "Partner Matching",
  ];

  return (
    <div className="landing-hero">
      {/* Hero Section */}
      <div className="landing-content">
        <div className="landing-left">
          <h1 className="landing-title">
            Plan Your Style.
            <span className="landing-highlight"> Wear With Confidence.</span>
          </h1>
          <p className="landing-subtitle">
            Your personal AI-powered fashion assistant. Manage your wardrobe,
            track laundry, get style recommendations, and find your perfect
            match.
          </p>

          {/* Features List */}
          <div className="landing-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <FiCheck className="feature-check" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="landing-cta">
            <button
              className="cta-primary"
              onClick={() => navigate("/signup")}
            >
              Get Started
              <FiArrowRight />
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate("/login")}
            >
              Already Have Account?
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="landing-right">
          <div className="landing-visual">
            <div className="visual-card card-1">
              <MdOutlineCheckroom className="card-icon" />
              <span>Wardrobe</span>
            </div>
            <div className="visual-card card-2">
              <MdOutlineLocalLaundryService className="card-icon" />
              <span>Laundry</span>
            </div>
            <div className="visual-card card-3">
              <AiOutlineRise className="card-icon" />
              <span>Trends</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Background */}
      <svg className="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.87,168.19-17.28,250.6-.39C823.78,31,906.4,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="#1F6F66"
        />
      </svg>
    </div>
  );
}
