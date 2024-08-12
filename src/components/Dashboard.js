import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWidget } from "../reducers/dashboardSlice";
import Addwidget from "./Addwidget";

const Dashboard = () => {
  const categories = useSelector((state) => state.dashboard.categories);
  const dispatch = useDispatch();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  const handleRemoveWidget = (categoryName, widgetId) => {
    dispatch(removeWidget({ categoryName, widgetId }));
  };

  const handleOpenOffcanvas = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedCategory("");
  };

  // Function to filter widgets based on search term
  const filterWidgets = (widgets) => {
    return widgets.filter(widget => widget.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  // Filter categories based on whether they contain any matching widgets
  const filteredCategories = categories.filter(category => 
    filterWidgets(category.widgets).length > 0
  );

  return (
    <div className="p-4">
      {/* Search Box */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Widgets"
        className="border p-2 rounded-xl shadow-md mb-4 w-full"
      />

      {/* Filtered Categories and Widgets */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <div key={category.name} className="mb-8">
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filterWidgets(category.widgets).map((widget) => (
                <div
                  key={widget.id}
                  className="bg-teal-300 p-4 rounded shadow-lg"
                >
                  <h4 className="text-lg font-semibold mb-2">{widget.name}</h4>
                  <p className="text-sm text-justify text-gray-600 mb-4">{widget.text}</p>
                  <button
                    onClick={() => handleRemoveWidget(category.name, widget.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    &times; Remove
                  </button>
                </div>
              ))}
              <div
                onClick={() => handleOpenOffcanvas(category.name)}
                className="bg-gray-200 p-4 rounded shadow-md flex items-center justify-center cursor-pointer"
              >
                <span className="text-3xl text-gray-500">+</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          No matching widgets found
        </div>
      )}


      {/* Offcanvas for Adding Widget */}
      <div
        className={`fixed top-0 right-0 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform offcanvas ${
          isOffcanvasOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="text-lg bg-slate-400 border pb-2 flex items-center justify-center relative">
          <button
            onClick={handleCloseOffcanvas}
            className="text-red-500 font-bold ms-5 text-4xl"
          >
            &times;
          </button>
          <span className="font-bold mt-2 mx-auto text-center">Add Widgets</span>
        </div>
        {isOffcanvasOpen && <Addwidget categoryName={selectedCategory} />}
      </div>
    </div>
  );
};

export default Dashboard;
