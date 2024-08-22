// dashboardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DashboardState = {
  components: string[];
};

const initialState: DashboardState = {
  components: ['AddCryptocurrency'],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<string>) => {
      if (!state.components.includes(action.payload)) {
        state.components.push(action.payload);
      }
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter(c => c !== action.payload);
    },
  },
});

export const { addComponent, removeComponent } = dashboardSlice.actions;
export default dashboardSlice.reducer;
