import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiRefreshCw, FiPlus, FiShoppingBag, FiFilter, FiGrid, FiList, FiSearch, FiX, FiHeart, FiStar, FiClock, FiUser, FiDroplet, FiEdit2, FiSave } from "react-icons/fi";
import { useWardrobe } from "../context/WardrobeContext";
import "../styles/auth.css";

export default function MyItems() {
  const navigate = useNavigate();
  const { wardrobeItems, addItem, removeItem, updateItem } = useWardrobe();
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showEditModal, setShowEditModal] = useState(null);
  const [editForm, setEditForm] = useState({
    category: "",
    color: "",
    size: "",
    owner: ""
  });

  // Sample preset items (added on first load if wardrobe is empty)
  const presetItems = [
    {
      id: "preset-1",
      image: "https://i.pinimg.com/736x/71/5e/99/715e999de039d44aa66eafd952460aca.jpg",
      category: "T-Shirt",
      color: "White",
      size: "M",
      owner: "Self",
      timesWorn: 2,
      lastWorn: "12/02/2026",
      lastWashed: "10/02/2026",
      addedAt: Date.now() - 100000,
    },
    {
      id: "preset-2",
      image: "https://i.pinimg.com/736x/61/04/f5/6104f5a32843ad883f59b40d75157c0e.jpg",
      category: "Jeans",
      color: "Dark Blue",
      size: "M",
      owner: "Self",
      timesWorn: 1,
      lastWorn: "11/02/2026",
      lastWashed: "09/02/2026",
      addedAt: Date.now() - 200000,
    },
    {
      id: "preset-3",
      image: "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
      category: "Hoodie",
      color: "Green",
      size: "L",
      owner: "Partner",
      timesWorn: 4,
      lastWorn: "13/02/2026",
      lastWashed: "05/02/2026",
      addedAt: Date.now() - 300000,
    },
    {
      id: "preset-4",
      image: "https://i.pinimg.com/1200x/94/5b/05/945b053faf046ec6eaa52c62e3e130e3.jpg",
      category: "Formal Shirt",
      color: "Beige",
      size: "M",
      owner: "Self",
      timesWorn: 3,
      lastWorn: "08/02/2026",
      lastWashed: "06/02/2026",
      addedAt: Date.now() - 400000,
    },
    {
      id: "preset-5",
      image: "https://i.pinimg.com/1200x/a3/14/1d/a3141d88b2d850feb59a7c277740c4ac.jpg",
      category: "Other",
      color: "Pink",
      size: "S",
      owner: "Child",
      timesWorn: 2,
      lastWorn: "07/02/2026",
      lastWashed: "04/02/2026",
      addedAt: Date.now() - 500000,
    },
  ];

  // Add preset items if wardrobe is empty
  useEffect(() => {
    if (wardrobeItems.length === 0) {
      presetItems.forEach(item => addItem(item));
    }
  }, []);

  const categories = [
    "all", "T-Shirt", "Casual Shirt", "Formal Shirt", "Jeans", "Chinos",
    "Trousers", "Hoodie", "Sweater", "Jacket", "Dress", "Skirt", "Other"
  ];

  const filteredItems = wardrobeItems.filter((item) => {
    const matchesSearch = item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleWear = (id) => {
    const item = wardrobeItems.find(i => i.id === id);
    if (item) {
      updateItem(id, {
        timesWorn: (item.timesWorn || 0) + 1,
        lastWorn: new Date().toLocaleDateString("en-GB"),
      });
    }
  };

  const handleWash = (id) => {
    updateItem(id, {
      timesWorn: 0,
      lastWashed: new Date().toLocaleDateString("en-GB"),
    });
  };

  const handleDelete = (id) => {
    removeItem(id);
    setShowDeleteConfirm(null);
  };

  const handleEditClick = (item) => {
    setEditForm({
      category: item.category || "",
      color: item.color || "",
      size: item.size || "",
      owner: item.owner || "Self"
    });
    setShowEditModal(item.id);
  };

  const handleSaveEdit = () => {
    if (showEditModal) {
      updateItem(showEditModal, editForm);
      setShowEditModal(null);
    }
  };

  const colors = [
    "White", "Black", "Gray", "Navy Blue", "Light Blue", "Dark Blue",
    "Red", "Pink", "Beige", "Brown", "Cream", "Green", "Yellow", "Orange", "Purple"
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const owners = ["Self", "Partner", "Child"];

  const totalItems = wardrobeItems.length;
  const totalWorn = wardrobeItems.reduce((s, it) => s + (it.timesWorn || 0), 0);
  const needsWash = wardrobeItems.filter(it => (it.timesWorn || 0) >= 3).length;
  const favorites = wardrobeItems.filter(it => it.favorite).length;

  // Owner tabs
  const ownerTabs = ["all", "Self", "Partner", "Child"];
  
  // Filter by owner tab as well
  const tabFilteredItems = filteredItems.filter(item => 
    activeTab === "all" || item.owner === activeTab
  );

  // Get color code for display
  const getColorCode = (colorName) => {
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
  };

  return (
    <div className="myitems-page">
      {/* Header */}
      <div className="myitems-header">
        <div className="myitems-title-area">
          <h1 className="myitems-title">
            <FiShoppingBag className="title-icon" /> My Wardrobe
          </h1>
          <p className="myitems-subtitle">Your personal clothing collection</p>
        </div>

        <button className="add-item-btn" onClick={() => navigate("/scan")}>
          <FiPlus /> Add New
        </button>
      </div>

      {/* Stats Cards */}
      <div className="myitems-stats-row">
        <div className="myitems-stat-card">
          <FiShoppingBag className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{totalItems}</span>
            <span className="stat-label">Total Items</span>
          </div>
        </div>
        <div className="myitems-stat-card">
          <FiClock className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{totalWorn}</span>
            <span className="stat-label">Times Worn</span>
          </div>
        </div>
        <div className="myitems-stat-card needs-wash">
          <FiDroplet className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{needsWash}</span>
            <span className="stat-label">Needs Wash</span>
          </div>
        </div>
        <div className="myitems-stat-card">
          <FiHeart className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{favorites}</span>
            <span className="stat-label">Favorites</span>
          </div>
        </div>
      </div>

      {/* Owner Tabs */}
      <div className="myitems-owner-tabs">
        {ownerTabs.map((tab) => (
          <button
            key={tab}
            className={`owner-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            <FiUser className="tab-icon" />
            {tab === "all" ? "Everyone" : tab}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="myitems-controls">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or color..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              <FiX />
            </button>
          )}
        </div>

        <div className="filter-group">
          <FiFilter className="filter-icon" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Types" : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            <FiGrid />
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <FiList />
          </button>
        </div>
      </div>

      {/* Items Display */}
      {tabFilteredItems.length === 0 ? (
        <div className="empty-wardrobe">
          <FiShoppingBag className="empty-icon" />
          <h3>No items found</h3>
          <p>
            {totalItems === 0
              ? "Start building your wardrobe by scanning your first item!"
              : "Try adjusting your search or filters."}
          </p>
          {totalItems === 0 && (
            <button className="scan-now-btn" onClick={() => navigate("/scan")}>
              <FiPlus /> Scan Your First Item
            </button>
          )}
        </div>
      ) : (
        <div className={`items-container ${viewMode}`}>
          {tabFilteredItems.map((item) => (
            <div key={item.id} className={`wardrobe-item-card ${viewMode}`}>
              <div className="item-image-wrapper">
                {item.image ? (
                  <img src={item.image} alt={item.category} className="item-image" />
                ) : (
                  <div className="item-placeholder">
                    <FiShoppingBag />
                  </div>
                )}
                {(item.timesWorn || 0) >= 3 && (
                  <span className="wash-badge">Needs Wash</span>
                )}
                <span className="owner-badge">{item.owner || "Self"}</span>
              </div>
              <div className="item-details">
                <div className="item-header">
                  <h4 className="item-category">{item.category}</h4>
                  <button 
                    className={`favorite-btn ${item.favorite ? "active" : ""}`}
                    onClick={() => updateItem(item.id, { favorite: !item.favorite })}
                  >
                    <FiHeart />
                  </button>
                </div>
                <div className="item-meta">
                  <p className="item-color">
                    <span className="color-dot" style={{ background: getColorCode(item.color) }}></span>
                    {item.color}
                  </p>
                  <span className="item-size">{item.size}</span>
                </div>
                <div className="item-stats">
                  <span className="wear-badge">
                    <FiClock /> Worn {item.timesWorn || 0}x
                  </span>
                </div>
                <div className="item-actions">
                  <button className="action-btn wear" onClick={() => handleWear(item.id)}>
                    <FiStar /> Wear
                  </button>
                  <button className="action-btn wash" onClick={() => handleWash(item.id)}>
                    <FiDroplet /> Wash
                  </button>
                  <button className="action-btn edit" onClick={() => handleEditClick(item)}>
                    <FiEdit2 />
                  </button>
                  <button className="action-btn delete" onClick={() => setShowDeleteConfirm(item.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <FiTrash2 className="modal-icon" />
            <h3>Delete this item?</h3>
            <p>This will remove it from your wardrobe permanently.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowDeleteConfirm(null)}>
                Keep It
              </button>
              <button className="modal-btn delete" onClick={() => handleDelete(showDeleteConfirm)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <FiEdit2 className="modal-icon edit" />
              <h3>Edit Item Details</h3>
            </div>
            
            <div className="edit-form">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="edit-select"
                >
                  {categories.filter(c => c !== "all").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Color</label>
                <select
                  value={editForm.color}
                  onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                  className="edit-select"
                >
                  {colors.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Size</label>
                  <select
                    value={editForm.size}
                    onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                    className="edit-select"
                  >
                    {sizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group half">
                  <label>Owner</label>
                  <select
                    value={editForm.owner}
                    onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })}
                    className="edit-select"
                  >
                    {owners.map((owner) => (
                      <option key={owner} value={owner}>{owner}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowEditModal(null)}>
                Cancel
              </button>
              <button className="modal-btn save" onClick={handleSaveEdit}>
                <FiSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}