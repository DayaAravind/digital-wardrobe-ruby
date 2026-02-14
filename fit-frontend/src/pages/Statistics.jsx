import { FiBarChart2, FiTrendingUp, FiPieChart, FiShoppingBag, FiCalendar, FiTarget } from "react-icons/fi";
import { useWardrobe } from "../context/WardrobeContext";
import "../styles/auth.css";

export default function Statistics() {
  const { wardrobeItems } = useWardrobe();

  // Calculate statistics
  const totalItems = wardrobeItems.length;
  
  // Count by category
  const categoryCount = wardrobeItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // Count by color
  const colorCount = wardrobeItems.reduce((acc, item) => {
    acc[item.color] = (acc[item.color] || 0) + 1;
    return acc;
  }, {});

  // Get top categories
  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Get top colors
  const topColors = Object.entries(colorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Demo data for prototype
  const demoStats = {
    outfitsCreated: 12,
    avgWearPerItem: 4.2,
    lastAdded: wardrobeItems.length > 0 ? new Date(wardrobeItems[wardrobeItems.length - 1]?.addedAt).toLocaleDateString() : "No items"
  };

  return (
    <div className="statistics-page">
      <div className="stats-header">
        <h1 className="stats-title">
          <FiBarChart2 className="title-icon" /> Wardrobe Statistics
        </h1>
        <p className="stats-subtitle">Insights into your fashion habits</p>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <FiShoppingBag className="stat-icon" />
          <div className="stat-value">{totalItems}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="stat-card">
          <FiPieChart className="stat-icon" />
          <div className="stat-value">{Object.keys(categoryCount).length}</div>
          <div className="stat-label">Categories</div>
        </div>
        <div className="stat-card">
          <FiTarget className="stat-icon" />
          <div className="stat-value">{demoStats.outfitsCreated}</div>
          <div className="stat-label">Outfits Created</div>
        </div>
        <div className="stat-card">
          <FiTrendingUp className="stat-icon" />
          <div className="stat-value">{demoStats.avgWearPerItem}</div>
          <div className="stat-label">Avg Wears/Item</div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="stats-details">
        {/* Category Breakdown */}
        <div className="stats-section">
          <h2>Category Breakdown</h2>
          {topCategories.length === 0 ? (
            <div className="empty-stats">No items to analyze</div>
          ) : (
            <div className="stats-bars">
              {topCategories.map(([category, count]) => (
                <div key={category} className="stats-bar-item">
                  <div className="bar-label">
                    <span>{category}</span>
                    <span>{count} items</span>
                  </div>
                  <div className="bar-track">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${(count / totalItems) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Color Palette */}
        <div className="stats-section">
          <h2>Color Palette</h2>
          {topColors.length === 0 ? (
            <div className="empty-stats">No items to analyze</div>
          ) : (
            <div className="color-palette-stats">
              {topColors.map(([color, count]) => (
                <div key={color} className="color-stat-item">
                  <div 
                    className="color-stat-dot" 
                    style={{ background: getColorCode(color) }}
                  />
                  <span className="color-stat-name">{color}</span>
                  <span className="color-stat-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity */}
        <div className="stats-section">
          <h2>Recent Activity</h2>
          <div className="activity-info">
            <div className="activity-item">
              <FiCalendar />
              <span>Last item added: {demoStats.lastAdded}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="demo-notice">
        <p>📊 In the full version, track your most worn items, discover underused pieces, and get personalized insights!</p>
      </div>
    </div>
  );
}

// Helper function
function getColorCode(colorName) {
  const colorMap = {
    "White": "#ffffff",
    "Black": "#1a1a1a",
    "Gray": "#808080",
    "Navy Blue": "#001f3f",
    "Light Blue": "#87ceeb",
    "Dark Blue": "#00008b",
    "Red": "#e74c3c",
    "Pink": "#ff69b4",
    "Beige": "#f5f5dc",
    "Brown": "#8b4513",
    "Cream": "#fffdd0",
    "Green": "#2ecc71",
    "Yellow": "#f1c40f",
  };
  return colorMap[colorName] || "#6fd3c3";
}
