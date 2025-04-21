import { useEffect, useState } from 'react';
import './../css/Sidebar.css';

const Sidebar = ({ category }) => {
  const [filterData, setFilterData] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4040/getFilter/${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFilterData(data.filter || []);
        setMinPrice(data.min || 0);
        setMaxPrice(data.max || 1000);
        setPrice(data.min || 0);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className='sidebar'>
      <div className='filter'>Filter & Category</div>
      <button className="apply-filter-btn" onClick={() => console.log("Apply Filter Clicked")}>
      Apply Filter
        </button>

      <div className='filter-price'>
        <div>Price: ₹{price}</div>
        <input
          type='range'
          min={minPrice}
          max={maxPrice}
          step="50"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className='filter-category'>
        {filterData.map((filter, index) => (
          <div key={index}>
            <div className='filter-heading'>{filter.heading}</div>
            {filter.options.map((option, idx) => (
              <div className='filter-content' key={idx}>
                <input type='checkbox' id={`${filter.heading}-${idx}`} />
                <label htmlFor={`${filter.heading}-${idx}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
