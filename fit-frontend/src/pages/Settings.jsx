import { useState } from "react";
import { FiSettings, FiUser, FiBell, FiLock, FiGlobe, FiTrash2, FiLogOut, FiChevronRight, FiMoon, FiHelpCircle, FiMail, FiShield, FiInfo, FiCamera, FiEdit2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useWardrobe } from "../context/WardrobeContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Settings() {
  const { logout, user } = useAuth();
  const { clearWardrobe, wardrobeItems } = useWardrobe();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleClearWardrobe = () => {
    clearWardrobe();
    setShowClearConfirm(false);
  };

  const userName = user?.name || "Fashion Lover";
  const userEmail = user?.email || "your.email@example.com";

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">
          <FiSettings className="title-icon spinning" /> Settings
        </h1>
        <p className="settings-subtitle">Personalize your FITeek experience</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          <FiUser className="avatar-icon" />
          <button className="avatar-edit">
            <FiCamera />
          </button>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{userName}</h2>
          <p className="profile-email">{userEmail}</p>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-value">{wardrobeItems?.length || 0}</span>
              <span className="stat-text">Items</span>
            </div>
            <div className="profile-stat">
              <span className="stat-value">12</span>
              <span className="stat-text">Outfits</span>
            </div>
            <div className="profile-stat">
              <span className="stat-value">3</span>
              <span className="stat-text">Trips</span>
            </div>
          </div>
        </div>
        <button className="edit-profile-btn">
          <FiEdit2 /> Edit Profile
        </button>
      </div>

      {/* Settings Sections */}
      <div className="settings-sections">
        {/* Account Section */}
        <div className="settings-section">
          <h2 className="section-heading">
            <FiUser className="section-icon" /> Account
          </h2>
          
          <div className="settings-item clickable">
            <div className="settings-item-left">
              <div className="settings-icon-wrapper">
                <FiUser className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Personal Info</span>
                <span className="settings-desc">Name, birthday, gender</span>
              </div>
            </div>
            <FiChevronRight className="chevron" />
          </div>

          <div className="settings-item clickable">
            <div className="settings-item-left">
              <div className="settings-icon-wrapper">
                <FiLock className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Password</span>
                <span className="settings-desc">Update your password</span>
              </div>
            </div>
            <FiChevronRight className="chevron" />
          </div>

          <div className="settings-item clickable">
            <div className="settings-item-left">
              <div className="settings-icon-wrapper">
                <FiMail className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Email</span>
                <span className="settings-desc">{userEmail}</span>
              </div>
            </div>
            <FiChevronRight className="chevron" />
          </div>
        </div>

        {/* Preferences Section */}
        <div className="settings-section">
          <h2 className="section-heading">
            <FiSettings className="section-icon" /> Preferences
          </h2>
          
          <div className="settings-item">
            <div className="settings-item-left">
              <div className="settings-icon-wrapper bell">
                <FiBell className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Notifications</span>
                <span className="settings-desc">Outfit tips & reminders</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notifications} 
                onChange={() => setNotifications(!notifications)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <div className="settings-item-left">
              <div className="settings-icon-wrapper moon">
                <FiMoon className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Dark Mode</span>
                <span className="settings-desc">Easier on the eyes</span>
              </div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={() => setDarkMode(!darkMode)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <div className="settings-item-left">
              <div className="settings-icon-wrapper globe">
                <FiGlobe className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Language</span>
                <span className="settings-desc">Choose your language</span>
              </div>
            </div>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="settings-select"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Support Section */}
        <div className="settings-section">
          <h2 className="section-heading">
            <FiHelpCircle className="section-icon" /> Help & Support
          </h2>
          
          <div className="settings-item clickable">
            <div className="settings-item-left">
              <div className="settings-icon-wrapper help">
                <FiHelpCircle className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Help Center</span>
                <span className="settings-desc">FAQs and tutorials</span>
              </div>
            </div>
            <FiChevronRight className="chevron" />
          </div>

          <div className="settings-item clickable">
            <div className="settings-item-left">
              <div className="settings-icon-wrapper shield">
                <FiShield className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Privacy Policy</span>
                <span className="settings-desc">How we protect your data</span>
              </div>
            </div>
            <FiChevronRight className="chevron" />
          </div>

          <div className="settings-item clickable">
            <div className="settings-item-left">
              <div className="settings-icon-wrapper info">
                <FiInfo className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">About FITeek</span>
                <span className="settings-desc">Version 1.0.0</span>
              </div>
            </div>
            <FiChevronRight className="chevron" />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section danger-zone">
          <h2 className="section-heading danger">
            <FiTrash2 className="section-icon" /> Danger Zone
          </h2>
          
          <div 
            className="settings-item danger clickable"
            onClick={() => setShowClearConfirm(true)}
          >
            <div className="settings-item-left">
              <div className="settings-icon-wrapper danger">
                <FiTrash2 className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Clear Wardrobe</span>
                <span className="settings-desc">Delete all your items</span>
              </div>
            </div>
            <FiChevronRight className="chevron" />
          </div>

          <div 
            className="settings-item logout clickable"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <div className="settings-item-left">
              <div className="settings-icon-wrapper logout">
                <FiLogOut className="settings-icon" />
              </div>
              <div>
                <span className="settings-label">Log Out</span>
                <span className="settings-desc">See you soon!</span>
              </div>
            </div>
            <FiChevronRight className="chevron" />
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="app-info">
        <div className="app-logo-small">FITeek</div>
        <p>Version 1.0.0</p>
        <p>Made with ❤️ for fashion lovers</p>
      </div>

      {/* Clear Wardrobe Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <FiTrash2 className="modal-icon" />
            <h3>Clear Your Wardrobe?</h3>
            <p>This will remove all {wardrobeItems?.length || 0} items. This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowClearConfirm(false)}>
                Keep Items
              </button>
              <button className="modal-btn delete" onClick={handleClearWardrobe}>
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="delete-modal logout-modal" onClick={(e) => e.stopPropagation()}>
            <FiLogOut className="modal-icon logout" />
            <h3>Log Out?</h3>
            <p>You'll need to sign in again to access your wardrobe.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowLogoutConfirm(false)}>
                Stay
              </button>
              <button className="modal-btn logout" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
