import { useState } from "react";
import { FiBriefcase, FiPlus, FiMinus, FiCheck, FiMapPin, FiCalendar, FiSun, FiCloud, FiCloudRain } from "react-icons/fi";
import { useWardrobe } from "../context/WardrobeContext";
import "../styles/auth.css";

export default function PackingAssistant() {
  const { wardrobeItems } = useWardrobe();
  const [tripDays, setTripDays] = useState(3);
  const [destination, setDestination] = useState("");
  const [weather, setWeather] = useState("warm");
  const [packedItems, setPackedItems] = useState([]);

  const weatherTypes = [
    { id: "warm", label: "Warm & Sunny", icon: <FiSun /> },
    { id: "mild", label: "Mild & Cloudy", icon: <FiCloud /> },
    { id: "rainy", label: "Rainy", icon: <FiCloudRain /> }
  ];

  // Smart packing suggestions based on trip duration and weather
  const getSuggestedItems = () => {
    const suggestions = [];
    const categories = {
      tops: ["T-Shirt", "Casual Shirt", "Formal Shirt"],
      bottoms: ["Jeans", "Chinos", "Trousers", "Shorts"],
      layers: ["Hoodie", "Sweater", "Jacket"]
    };

    // Calculate quantities based on trip length
    const topsNeeded = Math.ceil(tripDays * 1.2);
    const bottomsNeeded = Math.ceil(tripDays * 0.5);
    const layersNeeded = weather === "warm" ? 1 : weather === "rainy" ? 2 : 1;

    // Get available items
    const tops = wardrobeItems.filter(item => categories.tops.includes(item.category));
    const bottoms = wardrobeItems.filter(item => categories.bottoms.includes(item.category));
    const layers = wardrobeItems.filter(item => categories.layers.includes(item.category));

    // Add suggestions
    tops.slice(0, topsNeeded).forEach(item => suggestions.push({ ...item, reason: "Daily wear" }));
    bottoms.slice(0, bottomsNeeded).forEach(item => suggestions.push({ ...item, reason: "Mix & match" }));
    if (weather !== "warm") {
      layers.slice(0, layersNeeded).forEach(item => suggestions.push({ ...item, reason: weather === "rainy" ? "Rain protection" : "Layering" }));
    }

    return suggestions;
  };

  const suggestedItems = getSuggestedItems();

  const togglePacked = (itemId) => {
    if (packedItems.includes(itemId)) {
      setPackedItems(packedItems.filter(id => id !== itemId));
    } else {
      setPackedItems([...packedItems, itemId]);
    }
  };

  const packedCount = suggestedItems.filter(item => packedItems.includes(item.id)).length;

  return (
    <div className="packing-page">
      <div className="packing-header">
        <h1 className="packing-title">
          <FiBriefcase className="title-icon" /> Packing Assistant
        </h1>
        <p className="packing-subtitle">Smart packing suggestions for your trip</p>
      </div>

      {/* Trip Configuration */}
      <div className="trip-config">
        <div className="config-card">
          <label className="config-label">
            <FiMapPin /> Destination
          </label>
          <input
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="config-input"
          />
        </div>

        <div className="config-card">
          <label className="config-label">
            <FiCalendar /> Trip Duration
          </label>
          <div className="days-selector">
            <button 
              className="days-btn" 
              onClick={() => setTripDays(Math.max(1, tripDays - 1))}
            >
              <FiMinus />
            </button>
            <span className="days-value">{tripDays} days</span>
            <button 
              className="days-btn" 
              onClick={() => setTripDays(tripDays + 1)}
            >
              <FiPlus />
            </button>
          </div>
        </div>

        <div className="config-card weather-config">
          <label className="config-label">Weather</label>
          <div className="weather-options">
            {weatherTypes.map(type => (
              <button
                key={type.id}
                className={`weather-btn ${weather === type.id ? 'active' : ''}`}
                onClick={() => setWeather(type.id)}
              >
                {type.icon}
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Packing List */}
      <div className="packing-list-section">
        <div className="list-header">
          <h2>Suggested Packing List</h2>
          <div className="progress-badge">
            {packedCount}/{suggestedItems.length} packed
          </div>
        </div>

        {suggestedItems.length === 0 ? (
          <div className="empty-packing">
            <FiBriefcase className="empty-icon" />
            <p>Add items to your wardrobe to get packing suggestions!</p>
          </div>
        ) : (
          <div className="packing-items">
            {suggestedItems.map(item => (
              <div 
                key={item.id} 
                className={`packing-item ${packedItems.includes(item.id) ? 'packed' : ''}`}
                onClick={() => togglePacked(item.id)}
              >
                <div className="pack-checkbox">
                  {packedItems.includes(item.id) && <FiCheck />}
                </div>
                <div className="pack-item-info">
                  <span className="pack-item-name">{item.category}</span>
                  <span className="pack-item-color">{item.color}</span>
                </div>
                <span className="pack-reason">{item.reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Demo Notice */}
      <div className="demo-notice">
        <p>🎒 This is a prototype demo. In the full version, you'll get AI-powered suggestions based on your destination's weather forecast!</p>
      </div>
    </div>
  );
}
