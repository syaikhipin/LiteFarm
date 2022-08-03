import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  sensorsReadingsOfTemperature: [],
  selectedSensorName: '',
  latestMinTemperature: null,
  latestMaxTemperature: null,
  nearestStationName: '',
};

const bulkSensorsReadingsSlice = createSlice({
  name: 'bulkSensorsReadingsReducer',
  initialState,
  reducers: {
    resetBulkSensorReadingsStates: (state, action) => {
      Object.assign(state, {
        loading: false,
        sensorsReadingsOfTemperature: [],
        selectedSensorName: '',
        latestMinTemperature: null,
        latestMaxTemperature: null,
        nearestStationName: '',
      });
    },
    bulkSensorReadingsLoading: (state, action) => {
      Object.assign(state, {
        loading: true,
        sensorsReadingsOfTemperature: [],
        selectedSensorName: '',
        latestMinTemperature: null,
        latestMaxTemperature: null,
        nearestStationName: '',
      });
    },
    bulkSensorReadingsSuccess: (state, { payload }) => {
      if (state.loading && Object.keys(payload?.latestTemperatureReadings).length) {
        Object.assign(state, {
          loading: false,
          sensorsReadingsOfTemperature: payload?.sensorReadings,
          selectedSensorName: payload?.selectedSensorName,
          latestMinTemperature: payload?.latestTemperatureReadings?.tempMin,
          latestMaxTemperature: payload?.latestTemperatureReadings?.tempMax,
          nearestStationName: payload?.nearestStationName,
        });
      }
    },
    bulkSensorReadingsFailure: (state, action) => {
      state.loading = true;
      state.sensorsReadingsOfTemperature = [];
      state.selectedSensorName = '';
      state.nearestStationName = '';
      (state.latestMinTemperature = null), (state.latestMaxTemperature = null);
    },
  },
});
export const {
  resetBulkSensorReadingsStates,
  bulkSensorReadingsLoading,
  bulkSensorReadingsSuccess,
  bulkSensorReadingsFailure,
} = bulkSensorsReadingsSlice.actions;
export default bulkSensorsReadingsSlice.reducer;
export const bulkSensorsReadingsSliceSelector = (state) => {
  return state?.entitiesReducer[bulkSensorsReadingsSlice.name];
};