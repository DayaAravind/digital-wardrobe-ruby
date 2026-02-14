import { useState } from "react";
import { FiLayers, FiShoppingBag, FiPlus, FiX, FiRefreshCw, FiSave, FiTrash2, FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useWardrobe } from "../context/WardrobeContext";
import "../styles/auth.css";

export default function Combine() {
  const navigate = useNavigate();
  const { wardrobeItems } = useWardrobe();
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState("");
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [editOutfitName, setEditOutfitName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const categories = {
    tops: ["T-Shirt", "Casual Shirt", "Formal Shirt", "Hoodie", "Sweater"],
    bottoms: ["Jeans", "Chinos", "Trousers", "Shorts", "Skirt"],
    outerwear: ["Jacket", "Coat", "Blazer"],
    other: ["Dress", "Other"]
  };

  const getItemsByType = (type) => {
    return wardrobeItems.filter(item => categories[type]?.includes(item.category));
  };

  const addToOutfit = (item) => {
    if (!selectedItems.find(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeFromOutfit = (itemId) => {
    setSelectedItems(selectedItems.filter(i => i.id !== itemId));
  };

  const clearOutfit = () => {
    setSelectedItems([]);
  };

  const saveOutfit = () => {
    if (selectedItems.length >= 2 && outfitName.trim()) {
      setSavedOutfits([...savedOutfits, { 
        id: Date.now(), 
        name: outfitName, 
        items: [...selectedItems] 
      }]);
      setOutfitName("");
      setSelectedItems([]);
      setShowSaveModal(false);
    }
  };

  const deleteSavedOutfit = (id) => {
    setSavedOutfits(savedOutfits.filter(o => o.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleEditClick = (outfit) => {
    setEditOutfitName(outfit.name);
    setShowEditModal(outfit.id);
  };

  const handleSaveEdit = () => {
    if (showEditModal && editOutfitName.trim()) {
      setSavedOutfits(savedOutfits.map(o => 
        o.id === showEditModal ? { ...o, name: editOutfitName } : o
      ));
      setShowEditModal(null);
    }
  };

  const loadOutfitForEditing = (outfit) => {
    setSelectedItems([...outfit.items]);
    setSavedOutfits(savedOutfits.filter(o => o.id !== outfit.id));
  };

  return (
    <div className="combine-page">
      {/* Header */}
      <div className="combine-header">
        <div>
          <h1 className="combine-title">
            <FiLayers className="title-icon" /> Create Outfit
          </h1>
          <p className="combine-subtitle">Pick clothes from My Items to make an outfit ({wardrobeItems.length} items available)</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="combine-layout">
        {/* Wardrobe Items Selection */}
        <div className="wardrobe-selection">
          <h2 className="section-title">My Items</h2>
          
          {wardrobeItems.length === 0 ? (
            <div className="empty-selection">
              <FiShoppingBag className="empty-icon" />
              <p>No clothes yet! Add some first.</p>
              <button className="scan-btn" onClick={() => navigate("/myitems")}>
                <FiPlus /> Go to My Items
              </button>
            </div>
          ) : (
            <div className="selection-categories">
              {Object.keys(categories).map(type => {
                const items = getItemsByType(type);
                if (items.length === 0) return null;
                return (
                  <div key={type} className="category-section">
                    <h3 className="category-label">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    <div className="category-items">
                      {items.map(item => (
                        <div 
                          key={item.id} 
                          className={`selectable-item ${selectedItems.find(i => i.id === item.id) ? 'selected' : ''}`}
                          onClick={() => addToOutfit(item)}
                        >
                          {item.image ? (
                            <img src={item.image} alt={item.category} />
                          ) : (
                            <div className="item-placeholder-mini">
                              <FiShoppingBag />
                            </div>
                          )}
                          <span className="item-label">{item.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Outfit Preview */}
        <div className="outfit-preview">
          <h2 className="section-title">Your Outfit ({selectedItems.length} items)</h2>
          
          {selectedItems.length === 0 ? (
            <div className="empty-outfit">
              <FiLayers className="empty-icon" />
              <p>Tap on clothes to add them here</p>
            </div>
          ) : (
            <>
              <div className="outfit-items">
                {selectedItems.map(item => (
                  <div key={item.id} className="outfit-item">
                    {item.image ? (
                      <img src={item.image} alt={item.category} />
                    ) : (
                      <div className="outfit-placeholder">
                        <FiShoppingBag />
                      </div>
                    )}
                    <div className="outfit-item-info">
                      <span>{item.category}</span>
                      <span className="item-color">{item.color}</span>
                    </div>
                    <button className="remove-item" onClick={() => removeFromOutfit(item.id)}>
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="outfit-actions">
                <button className="action-btn clear" onClick={clearOutfit}>
                  <FiRefreshCw /> Clear
                </button>
                <button 
                  className="action-btn save" 
                  onClick={() => setShowSaveModal(true)}
                  disabled={selectedItems.length < 2}
                >
                  <FiSave /> Save Outfit
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Saved Outfits */}
      {savedOutfits.length > 0 && (
        <div className="saved-outfits-section">
          <h2 className="section-title">Saved Outfits</h2>
          <div className="saved-outfits-grid">
            {savedOutfits.map(outfit => (
              <div key={outfit.id} className="saved-outfit-card">
                <div className="saved-outfit-header">
                  <h3>{outfit.name}</h3>
                  <div className="outfit-header-actions">
                    <button className="edit-outfit" onClick={() => handleEditClick(outfit)} title="Rename">
                      <FiEdit2 />
                    </button>
                    <button className="load-outfit" onClick={() => loadOutfitForEditing(outfit)} title="Edit Items">
                      <FiRefreshCw />
                    </button>
                    <button className="delete-outfit" onClick={() => setShowDeleteConfirm(outfit.id)} title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="saved-outfit-items">
                  {outfit.items.map(item => (
                    <div key={item.id} className="mini-item">
                      {item.image ? (
                        <img src={item.image} alt={item.category} />
                      ) : (
                        <FiShoppingBag />
                      )}
                    </div>
                  ))}
                </div>
                <span className="outfit-item-count">{outfit.items.length} items</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="save-modal" onClick={e => e.stopPropagation()}>
            <h3>Save Outfit</h3>
            <input
              type="text"
              placeholder="Enter outfit name..."
              value={outfitName}
              onChange={(e) => setOutfitName(e.target.value)}
              className="outfit-name-input"
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowSaveModal(false)}>Cancel</button>
              <button className="modal-btn save" onClick={saveOutfit} disabled={!outfitName.trim()}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Outfit Name Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(null)}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>
            <div className="edit-modal-header">
              <FiEdit2 className="modal-icon edit" />
              <h3>Rename Outfit</h3>
            </div>
            <div className="edit-form">
              <div className="form-group">
                <label>Outfit Name</label>
                <input
                  type="text"
                  value={editOutfitName}
                  onChange={(e) => setEditOutfitName(e.target.value)}
                  className="edit-input"
                  placeholder="Enter new name"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowEditModal(null)}>Cancel</button>
              <button className="modal-btn save" onClick={handleSaveEdit} disabled={!editOutfitName.trim()}>
                <FiSave /> Save
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
            <h3>Delete this outfit?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowDeleteConfirm(null)}>
                Keep It
              </button>
              <button className="modal-btn delete" onClick={() => deleteSavedOutfit(showDeleteConfirm)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}