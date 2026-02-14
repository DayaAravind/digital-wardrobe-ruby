import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiRefreshCw,
  FiUsers,
  FiHeart,
  FiSmile,
  FiCamera,
  FiLayers,
  FiCalendar,
  FiBriefcase,
  FiTarget,
  FiSearch,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  /* ===== CORE FEATURES ===== */
  const coreFeatures = [
    { name: "My Items", icon: <FiShoppingBag /> },
    { name: "Laundry", icon: <FiRefreshCw /> },
    { name: "Family", icon: <FiUsers /> },
    { name: "Partner Matching", icon: <FiHeart /> },
    { name: "Kids Mode", icon: <FiSmile /> },
  ];

  /* ===== SECONDARY FEATURES (Sidebar Only) ===== */
  const sidebarFeatures = [
    { name: "Scan", icon: <FiCamera /> },
    { name: "Combine", icon: <FiLayers /> },
    { name: "Calendar", icon: <FiCalendar /> },
    { name: "Packing Assistant", icon: <FiBriefcase /> },
    { name: "For You", icon: <FiTarget /> },
    { name: "Explore", icon: <FiSearch /> },
    { name: "Statistics", icon: <FiBarChart2 /> },
    { name: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="full-dashboard">

      {/* Sidebar */}
      <aside
        className={`auto-sidebar ${collapsed ? "collapsed" : ""}`}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <div className="sidebar-brand">
          {!collapsed && "More Tools"}
        </div>

        <div className="sidebar-menu">
          {sidebarFeatures.map((item, index) => (
            <div
              key={index}
              className="sidebar-item clickable"
              onClick={() => {
                const routes = {
                  "Scan": "/scan",
                  "Combine": "/combine",
                  "Calendar": "/calendar",
                  "Packing Assistant": "/packing",
                  "For You": "/foryou",
                  "Explore": "/explore",
                  "Statistics": "/statistics",
                  "Settings": "/settings"
                };
                if (routes[item.name]) navigate(routes[item.name]);
              }}
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>
              {!collapsed && <span>{item.name}</span>}
            </div>
          ))}
        </div>

        <div
          className="sidebar-logout"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <FiLogOut />
          {!collapsed && " Logout"}
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-wrapper">
        <div className="dashboard-topbar">
          <div className="brand-title">FITeek</div>
        </div>

        <div className="hero-section">
          <h1>
            Plan Your Style.
            <br />
            <span>Wear With Confidence.</span>
          </h1>
        </div>

        <div className="feature-panel">
          {coreFeatures.map((feature, index) => (
            <div
              key={index}
              className="glass-card clickable"
              onClick={() => {
                const routes = {
                  "My Items": "/myitems",
                  "Laundry": "/laundry",
                  "Family": "/family",
                  "Partner Matching": "/partner",
                  "Kids Mode": "/kids"
                };
                if (routes[feature.name]) navigate(routes[feature.name]);
              }}
            >
              <div className="core-icon">
                {feature.icon}
              </div>
              <h3>{feature.name}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
