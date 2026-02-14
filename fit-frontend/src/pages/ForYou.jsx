import { useState, useCallback } from "react";
import { FiTarget, FiSun, FiCloud, FiRefreshCw, FiHeart, FiBriefcase, FiCoffee, FiMusic, FiStar, FiTrendingUp } from "react-icons/fi";
import "../styles/auth.css";

export default function ForYou() {
  const [activeOccasion, setActiveOccasion] = useState("casual");
  const [likedOutfits, setLikedOutfits] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  // Sample outfit suggestions - base data
  const allOutfits = {
    casual: [
      {
        id: 1,
        name: "Weekend Chill",
        top: "https://i.pinimg.com/1200x/ff/2e/0e/ff2e0e6d4b9dfe51cd1a33a75f74e9b0.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Casual Hoodie",
        bottomName: "Relaxed Jeans",
        match: 92,
      },
      {
        id: 2,
        name: "Street Style",
        top: "https://i.pinimg.com/1200x/f4/f9/ea/f4f9ea65d906bab7acc90303fb282860.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Graphic Tee",
        bottomName: "Dark Jeans",
        match: 88,
      },
      {
        id: 5,
        name: "Cozy Vibes",
        top: "https://i.pinimg.com/1200x/ff/2e/0e/ff2e0e6d4b9dfe51cd1a33a75f74e9b0.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Oversized Sweater",
        bottomName: "Joggers",
        match: 85,
      },
      {
        id: 6,
        name: "Urban Explorer",
        top: "https://i.pinimg.com/1200x/f4/f9/ea/f4f9ea65d906bab7acc90303fb282860.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Denim Jacket",
        bottomName: "Cargo Pants",
        match: 91,
      },
    ],
    work: [
      {
        id: 3,
        name: "Office Ready",
        top: "https://i.pinimg.com/1200x/f4/f9/ea/f4f9ea65d906bab7acc90303fb282860.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Formal Shirt",
        bottomName: "Dress Pants",
        match: 95,
      },
      {
        id: 7,
        name: "Business Casual",
        top: "https://i.pinimg.com/1200x/ff/2e/0e/ff2e0e6d4b9dfe51cd1a33a75f74e9b0.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Polo Shirt",
        bottomName: "Chinos",
        match: 89,
      },
      {
        id: 8,
        name: "Meeting Mode",
        top: "https://i.pinimg.com/1200x/f4/f9/ea/f4f9ea65d906bab7acc90303fb282860.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Blazer",
        bottomName: "Tailored Trousers",
        match: 97,
      },
    ],
    party: [
      {
        id: 4,
        name: "Night Out",
        top: "https://i.pinimg.com/1200x/ff/2e/0e/ff2e0e6d4b9dfe51cd1a33a75f74e9b0.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Stylish Jacket",
        bottomName: "Slim Fit Pants",
        match: 90,
      },
      {
        id: 9,
        name: "Club Ready",
        top: "https://i.pinimg.com/1200x/f4/f9/ea/f4f9ea65d906bab7acc90303fb282860.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Fitted Shirt",
        bottomName: "Dark Jeans",
        match: 93,
      },
      {
        id: 10,
        name: "Elegant Evening",
        top: "https://i.pinimg.com/1200x/ff/2e/0e/ff2e0e6d4b9dfe51cd1a33a75f74e9b0.jpg",
        bottom: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
        topName: "Velvet Blazer",
        bottomName: "Dress Pants",
        match: 96,
      },
    ],
  };

  // Shuffle function using Fisher-Yates algorithm
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Randomize match percentages slightly for variety
    return shuffled.map(outfit => ({
      ...outfit,
      match: Math.min(99, Math.max(80, outfit.match + Math.floor(Math.random() * 10) - 5))
    }));
  }, []);

  // Get shuffled outfits based on current shuffle key
  const getShuffledOutfits = useCallback(() => {
    const baseOutfits = allOutfits[activeOccasion] || [];
    if (shuffleKey === 0) return baseOutfits;
    return shuffleArray(baseOutfits);
  }, [activeOccasion, shuffleKey, shuffleArray]);

  const currentOutfits = getShuffledOutfits();

  // Refresh handler with animation
  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    // Simulate loading and shuffle
    setTimeout(() => {
      setShuffleKey(prev => prev + 1);
      setIsRefreshing(false);
    }, 800);
  }, [isRefreshing]);

  const occasions = [
    { id: "casual", name: "Casual", icon: <FiCoffee /> },
    { id: "work", name: "Work", icon: <FiBriefcase /> },
    { id: "party", name: "Party", icon: <FiMusic /> },
  ];

  const weatherInfo = {
    temp: "22°C",
    condition: "Partly Cloudy",
    recommendation: "Light layers recommended",
  };

  const toggleLike = (outfitId) => {
    setLikedOutfits((prev) =>
      prev.includes(outfitId)
        ? prev.filter((id) => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  return (
    <div className="foryou-page">
      {/* Header Section */}
      <div className="foryou-header">
        <div className="foryou-title-area">
          <h1 className="foryou-title">
            <FiTarget className="title-icon" /> For You
          </h1>
          <p className="foryou-subtitle">
            Personalized outfit recommendations based on your style
          </p>
        </div>

        {/* Weather Card */}
        <div className="weather-card">
          <div className="weather-icon">
            <FiCloud />
          </div>
          <div className="weather-info">
            <p className="weather-temp">{weatherInfo.temp}</p>
            <p className="weather-condition">{weatherInfo.condition}</p>
          </div>
          <p className="weather-tip">{weatherInfo.recommendation}</p>
        </div>
      </div>

      {/* Occasion Tabs */}
      <div className="occasion-tabs">
        {occasions.map((occasion) => (
          <button
            key={occasion.id}
            className={`occasion-tab ${activeOccasion === occasion.id ? "active" : ""}`}
            onClick={() => setActiveOccasion(occasion.id)}
          >
            <span className="tab-icon">{occasion.icon}</span>
            {occasion.name}
          </button>
        ))}
        <button 
          className={`refresh-btn ${isRefreshing ? "spinning" : ""}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <FiRefreshCw className="refresh-icon" /> 
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Main Content */}
      <div className={`foryou-main ${isRefreshing ? "refreshing" : ""}`} key={shuffleKey}>
        {/* Today's Pick */}
        <div className="todays-pick-section">
          <div className="section-header">
            <h2>
              <FiStar className="section-icon" /> Today's Top Pick
            </h2>
          </div>

          {currentOutfits.length > 0 && (
            <div className="featured-outfit">
              <div className="outfit-images">
                <div className="outfit-item-card">
                  <img src={currentOutfits[0].top} alt={currentOutfits[0].topName} />
                  <div className="item-label">{currentOutfits[0].topName}</div>
                </div>
                <div className="outfit-plus">+</div>
                <div className="outfit-item-card">
                  <img src={currentOutfits[0].bottom} alt={currentOutfits[0].bottomName} />
                  <div className="item-label">{currentOutfits[0].bottomName}</div>
                </div>
              </div>
              <div className="outfit-details">
                <h3>{currentOutfits[0].name}</h3>
                <div className="match-score">
                  <FiTrendingUp />
                  <span>{currentOutfits[0].match}% Match</span>
                </div>
                <button
                  className={`like-btn ${likedOutfits.includes(currentOutfits[0].id) ? "liked" : ""}`}
                  onClick={() => toggleLike(currentOutfits[0].id)}
                >
                  <FiHeart />
                  {likedOutfits.includes(currentOutfits[0].id) ? "Saved" : "Save Look"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* More Suggestions */}
        <div className="more-suggestions-section">
          <div className="section-header">
            <h2>More Suggestions</h2>
          </div>
          <div className="suggestions-grid">
            {currentOutfits.slice(1).map((outfit) => (
              <div key={outfit.id} className="suggestion-card">
                <div className="suggestion-images">
                  <img src={outfit.top} alt={outfit.topName} className="suggestion-img" />
                  <img src={outfit.bottom} alt={outfit.bottomName} className="suggestion-img" />
                </div>
                <div className="suggestion-info">
                  <h4>{outfit.name}</h4>
                  <div className="suggestion-meta">
                    <span className="match-badge">{outfit.match}% Match</span>
                    <button
                      className={`mini-like-btn ${likedOutfits.includes(outfit.id) ? "liked" : ""}`}
                      onClick={() => toggleLike(outfit.id)}
                    >
                      <FiHeart />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {currentOutfits.length <= 1 && (
              <div className="no-suggestions">
                <p>More suggestions coming soon for this occasion!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Style Tips */}
      <div className="style-tips-section">
        <h2>Style Tips For Today</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <FiSun className="tip-icon" />
            <h4>Weather Ready</h4>
            <p>Layer up with light fabrics for changing temperatures</p>
          </div>
          <div className="tip-card">
            <FiTrendingUp className="tip-icon" />
            <h4>Trending Now</h4>
            <p>Earth tones and minimalist accessories are in style</p>
          </div>
          <div className="tip-card">
            <FiHeart className="tip-icon" />
            <h4>Your Favorites</h4>
            <p>You have {likedOutfits.length} saved looks to choose from</p>
          </div>
        </div>
      </div>
    </div>
  );
}
