import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget } from "../reducers/dashboardSlice";

const Addwidget = ({ categoryName }) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryName);
  const categories = useSelector((state) => state.dashboard.categories);
  const dispatch = useDispatch();

  const handleAddClick = (e) => {
    e.preventDefault();
    if (widgetName && widgetText) {
      dispatch(addWidget({ categoryName: selectedCategory, widgetName, widgetText }));
      setWidgetName("");
      setWidgetText("");
    }
  };

  return (
    <div className="m-6">
      <div className="mb-4">
        {categories.map((category) => (
          <label key={category.name} className="block mb-2">
            <input
              type="radio"
              name="category"
              value={category.name}
              checked={selectedCategory === category.name}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mr-2"
            />
            {category.name}
            
          </label>
        ))}
      </div>

      <input
        type="text"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
        placeholder="Enter Widget Name"
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        value={widgetText}
        onChange={(e) => setWidgetText(e.target.value)}
        placeholder="Enter Widget Text"
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={handleAddClick}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Widget
      </button>
    </div>
  );
};

export default Addwidget;
