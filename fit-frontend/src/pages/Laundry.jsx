import { useState } from "react";
import { FiCheck, FiX, FiArrowRight, FiEdit2, FiSave, FiTrash2 } from "react-icons/fi";
import "../styles/auth.css";

export default function Laundry() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Daily Wear",
      image:
        "https://i.pinimg.com/1200x/ff/2e/0e/ff2e0e6d4b9dfe51cd1a33a75f74e9b0.jpg",
      status: "Needs Wash",
      wearCount: 4,
      category: "Casual",
      color: "Blue",
    },
    {
      id: 2,
      name: "Office Outfit",
      image:
        "https://i.pinimg.com/1200x/f4/f9/ea/f4f9ea65d906bab7acc90303fb282860.jpg",
      status: "Clean",
      wearCount: 1,
      category: "Formal",
      color: "White",
    },
    {
      id: 3,
      name: "Weekend Clothes",
      image:
        "https://i.pinimg.com/736x/d7/21/79/d72179ff1a9af377dd7e56d535c0ecc3.jpg",
      status: "Needs Wash",
      wearCount: 5,
      category: "Casual",
      color: "Green",
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    color: "",
    wearCount: 0
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const categories = ["Casual", "Formal", "Sports", "Sleepwear", "Other"];
  const colors = [
    "White", "Black", "Gray", "Navy Blue", "Light Blue", "Dark Blue",
    "Red", "Pink", "Beige", "Brown", "Cream", "Green", "Yellow", "Orange", "Purple"
  ];

  const handleEditClick = (item) => {
    setEditForm({
      name: item.name || "",
      category: item.category || "Casual",
      color: item.color || "White",
      wearCount: item.wearCount || 0
    });
    setShowEditModal(item.id);
  };

  const handleSaveEdit = () => {
    if (showEditModal) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === showEditModal
            ? { ...item, ...editForm }
            : item
        )
      );
      setShowEditModal(null);
    }
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setShowDeleteConfirm(null);
  };

  const toggleStatus = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Clean"
                  ? "Needs Wash"
                  : "Clean",
              wearCount:
                item.status === "Needs Wash"
                  ? 0
                  : item.wearCount,
            }
          : item
      )
    );
  };

  const washAll = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        status: "Clean",
        wearCount: 0,
      }))
    );
  };

  const cleanCount = items.filter(item => item.status === "Clean").length;
  const dirtyCount = items.filter(item => item.status === "Needs Wash").length;
  const cleanItems = items.filter(item => item.status === "Clean");
  const dirtyItems = items.filter(item => item.status === "Needs Wash");

  return (
    <div className="laundry-page">
      {/* Header */}
      <div className="laundry-top-section">
        <div className="laundry-title-area">
          <h1 className="laundry-title">Laundry Management</h1>
          <p className="laundry-subtitle">Track and manage your clothing laundry status</p>
        </div>

        {/* Stats Cards */}
        <div className="laundry-stats">
          <div className="stat-card clean-stat">
            <FiCheck className="stat-icon" />
            <div>
              <p className="stat-label">Clean</p>
              <p className="stat-value">{cleanCount}</p>
            </div>
          </div>
          <div className="stat-card dirty-stat">
            <FiX className="stat-icon" />
            <div>
              <p className="stat-label">Needs Wash</p>
              <p className="stat-value">{dirtyCount}</p>
            </div>
          </div>
          <button className="wash-all-btn" onClick={washAll}>
            <FiArrowRight />
            Wash All
          </button>
        </div>
      </div>

      {/* Gallery */}
      {dirtyItems.length > 0 && (
        <div className="laundry-section">
          <h2 className="section-title">Needs Washing</h2>
          <div className="laundry-gallery-grid">
            {dirtyItems.map((item) => (
              <div
                key={item.id}
                className={`laundry-card dirty`}
              >
                <div className="laundry-image-wrapper">
                  <img src={item.image} alt={item.name} />
                  <div className="status-badge">
                    <FiX /> Needs Wash
                  </div>
                </div>

                <div className="laundry-card-content">
                  <h3>{item.name}</h3>
                  <p className="item-category-label">{item.category} • {item.color}</p>
                  <div className="wear-count">
                    <span>Worn</span>
                    <strong>{item.wearCount}x</strong>
                  </div>
                  <div className="laundry-actions">
                    <button
                      className="toggle-status-btn"
                      onClick={() => toggleStatus(item.id)}
                    >
                      Mark Clean
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditClick(item)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => setShowDeleteConfirm(item.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {cleanItems.length > 0 && (
        <div className="laundry-section">
          <h2 className="section-title">Clean & Ready</h2>
          <div className="laundry-gallery-grid">
            {cleanItems.map((item) => (
              <div
                key={item.id}
                className={`laundry-card clean`}
              >
                <div className="laundry-image-wrapper">
                  <img src={item.image} alt={item.name} />
                  <div className="status-badge">
                    <FiCheck /> Clean
                  </div>
                </div>

                <div className="laundry-card-content">
                  <h3>{item.name}</h3>
                  <p className="item-category-label">{item.category} • {item.color}</p>
                  <div className="wear-count">
                    <span>Worn</span>
                    <strong>{item.wearCount}x</strong>
                  </div>
                  <div className="laundry-actions">
                    <button
                      className="toggle-status-btn"
                      onClick={() => toggleStatus(item.id)}
                    >
                      Mark Needs Wash
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditClick(item)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => setShowDeleteConfirm(item.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <FiEdit2 className="modal-icon edit" />
              <h3>Edit Item</h3>
            </div>
            
            <div className="edit-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="edit-input"
                  placeholder="Item name"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="edit-select"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group half">
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

                <div className="form-group half">
                  <label>Wear Count</label>
                  <input
                    type="number"
                    value={editForm.wearCount}
                    onChange={(e) => setEditForm({ ...editForm, wearCount: parseInt(e.target.value) || 0 })}
                    className="edit-input"
                    min="0"
                  />
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <FiTrash2 className="modal-icon" />
            <h3>Delete this item?</h3>
            <p>This will remove it from your laundry list.</p>
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
    </div>
  );
}
