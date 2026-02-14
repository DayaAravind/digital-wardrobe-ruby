import { useState } from "react";
import { FiSearch, FiTrendingUp, FiHeart, FiBookmark, FiExternalLink } from "react-icons/fi";
import "../styles/auth.css";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("trending");
  const [savedTrends, setSavedTrends] = useState([]);

  const categories = [
    { id: "trending", label: "Popular" },
    { id: "seasonal", label: "Seasons" },
    { id: "minimal", label: "Simple" },
    { id: "street", label: "Casual" }
  ];

  const trends = {
    trending: [
      { id: 1, title: "Simple & Classy", desc: "Less is more - clean looks with nice fabrics", tags: ["Neutral", "Elegant"] },
      { id: 2, title: "2000s Style", desc: "Low jeans and fun accessories are back!", tags: ["Fun", "Retro"] },
      { id: 3, title: "Outdoor Vibes", desc: "Hiking meets city style - comfy & cool", tags: ["Sporty", "Comfy"] },
      { id: 4, title: "Happy Colors", desc: "Wear bright colors to feel good!", tags: ["Colorful", "Cheerful"] }
    ],
    seasonal: [
      { id: 5, title: "Summer Looks", desc: "Light & airy clothes for hot days", tags: ["Light", "Cool"] },
      { id: 6, title: "Fall Layers", desc: "Mix & match for changing weather", tags: ["Cozy", "Layered"] }
    ],
    minimal: [
      { id: 7, title: "Less Clothes, More Style", desc: "Build outfits with just 30 items", tags: ["Simple", "Smart"] },
      { id: 8, title: "One Color Look", desc: "Rock head-to-toe in your fave color", tags: ["Clean", "Bold"] }
    ],
    street: [
      { id: 9, title: "Baggy & Comfy", desc: "Oversized clothes are in!", tags: ["Relaxed", "Cool"] },
      { id: 10, title: "Sneaker Focus", desc: "Let your kicks steal the show", tags: ["Shoes", "Trendy"] }
    ]
  };

  const toggleSave = (trendId) => {
    if (savedTrends.includes(trendId)) {
      setSavedTrends(savedTrends.filter(id => id !== trendId));
    } else {
      setSavedTrends([...savedTrends, trendId]);
    }
  };

  const currentTrends = trends[activeCategory] || [];
  const filteredTrends = currentTrends.filter(trend => 
    trend.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trend.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">
          <FiTrendingUp className="title-icon" /> Style Ideas
        </h1>
        <p className="explore-subtitle">Get inspired by what's popular right now</p>
      </div>

      {/* Search */}
      <div className="explore-search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search trends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="explore-search-input"
        />
      </div>

      {/* Category Tabs */}
      <div className="explore-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`explore-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Trends Grid */}
      <div className="trends-grid">
        {filteredTrends.map(trend => (
          <div key={trend.id} className="trend-card">
            <div className="trend-header">
              <h3>{trend.title}</h3>
              <button 
                className={`save-trend-btn ${savedTrends.includes(trend.id) ? 'saved' : ''}`}
                onClick={() => toggleSave(trend.id)}
              >
                {savedTrends.includes(trend.id) ? <FiHeart /> : <FiBookmark />}
              </button>
            </div>
            <p className="trend-desc">{trend.desc}</p>
            <div className="trend-tags">
              {trend.tags.map((tag, idx) => (
                <span key={idx} className="trend-tag">{tag}</span>
              ))}
            </div>
            <button className="explore-more-btn">
              <FiExternalLink /> Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Saved Section */}
      {savedTrends.length > 0 && (
        <div className="saved-trends-section">
          <h2>
            <FiHeart /> Saved Trends ({savedTrends.length})
          </h2>
        </div>
      )}

      {/* Demo Notice */}
      <div className="demo-notice">
        <p>💡 Coming soon: Get outfit ideas based on YOUR clothes!</p>
      </div>
    </div>
  );
}
