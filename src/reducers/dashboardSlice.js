import { createSlice } from "@reduxjs/toolkit";
import categoriesData from "../data/categoriesData.json";

const initialState = {
    categories: categoriesData.categories
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {

    // Add Widget Reducer
    addWidget: (state, action) => {
      const { categoryName, widgetName, widgetText } = action.payload;
      const category = state.categories.find(
        (category) => category.name === categoryName
      );
      if (category) {
        category.widgets.push({
          id: Date.now(),
          name: widgetName,
          text: widgetText,
        });
      }
    },

    // Remove Widget Reducer
    removeWidget: (state, action) => {
        const { categoryName, widgetId } = action.payload;
        const category = state.categories.find(category => category.name === categoryName);
        if (category) {
            category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
        }
    }
  },
});


export const {addWidget, removeWidget} = dashboardSlice.actions;

export default dashboardSlice.reducer;