import * as types from "./locationType";

const initialData = {
  isLoading: false,
  isError: false,
  data: {
    message: "",
    states: [],
    districts: [],
    zones: [],
  },
};

const locationReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case types.GET_STATE_DATA_REQUEST:
    case types.ADD_STATE_DATA_REQUEST:
    case types.GET_DISTRICT_DATA_REQUEST:
    case types.ADD_DISTRICT_DATA_REQUEST:
    case types.GET_ZONE_DATA_REQUEST:
    case types.ADD_ZONE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.GET_STATE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, states: payload.data },
      };

    case types.ADD_STATE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          states: [...(state.data.states || []), payload],
        },
      };

    case types.GET_DISTRICT_DATA_SUCCESS: {
      console.log("payload==>", payload);
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, districts: payload.data },
      };
    }

    case types.ADD_DISTRICT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          districts: [...(state.data.districts || []), payload],
        },
      };

    case types.GET_ZONE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, zones: payload.data },
      };

    case types.ADD_ZONE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          zones: [...(state.data.zones || []), payload],
        },
      };

    case types.GET_STATE_DATA_ERROR:
    case types.ADD_STATE_DATA_ERROR:
    case types.GET_DISTRICT_DATA_ERROR:
    case types.ADD_DISTRICT_DATA_ERROR:
    case types.GET_ZONE_DATA_ERROR:
    case types.ADD_ZONE_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default locationReducer;
