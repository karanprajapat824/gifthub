import React, { useEffect, useState ,useContext} from "react";
import "./Admin.css";
import { AuthContext } from "../App";

const ManageFilters = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {token} = useContext(AuthContext);

  const fetchCategory = async ()=>{
    const response = await fetch("http://localhost:4040/getAllCategory",{
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    if(response.ok)
    {
        const data = await response.json();
        setCategories(data);
    }
    else {
        console.log("Unable to fetch data");
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  const openModal = async (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
    try {
      const res = await fetch(`/api/categories/${category._id}`);
      const data = await res.json();
      setFilters(data.filters || []);
    } catch (err) {
      console.error("Error fetching filters:", err);
    }
  };

  const addFilter = () => {
    setFilters(prev => [
      ...prev,
      {
        heading: "",
        key: "",
        type: "checkbox",
        options: []
      }
    ]);
  };

  const handleFilterChange = (index, field, value) => {
    const updated = [...filters];
    updated[index][field] = value;
    setFilters(updated);
  };

  const saveFilters = async () => {
    try {
      const res = await fetch(`/api/categories/${selectedCategory._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ filters })
      });

      if (res.ok) {
        alert("Filters saved!");
        setIsModalOpen(false);
      } else {
        alert("Failed to save filters");
      }
    } catch (err) {
      console.error("Error saving filters:", err);
    }
  };

  return (
    <div className="manage-schema">
      <h2 className="title">Manage Filters by Category</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="category-card"
            onClick={() => openModal(cat)}
          >
            {cat.category}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Edit Filters for {selectedCategory.category}</h3>

            {filters.map((filter, i) => (
              <div key={i} className="filter-box">
                <input
                  type="text"
                  placeholder="Heading"
                  value={filter.heading}
                  onChange={(e) => handleFilterChange(i, "heading", e.target.value)}
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Key"
                  value={filter.key}
                  onChange={(e) => handleFilterChange(i, "key", e.target.value)}
                  className="input"
                />
                <select
                  value={filter.type}
                  onChange={(e) => handleFilterChange(i, "type", e.target.value)}
                  className="input"
                >
                  <option value="checkbox">Checkbox</option>
                  <option value="range">Range</option>
                  <option value="color">Color</option>
                </select>

                {filter.type === "range" ? (
                  <div className="range-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filter.min || ""}
                      onChange={(e) => handleFilterChange(i, "min", Number(e.target.value))}
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filter.max || ""}
                      onChange={(e) => handleFilterChange(i, "max", Number(e.target.value))}
                      className="input"
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Options (comma-separated)"
                    value={filter.options?.join(", ") || ""}
                    onChange={(e) =>
                      handleFilterChange(i, "options", e.target.value.split(",").map(opt => opt.trim()))
                    }
                    className="input"
                  />
                )}
              </div>
            ))}

            <button className="add-btn" onClick={addFilter}>+ Add Filter</button>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={saveFilters}>Save Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFilters;
