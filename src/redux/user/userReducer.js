const initialData = {
  isLoading: false,
  isError: false,
  data: {},
};

const userReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case "ADD_USER": {
      return { ...state };
    }
    default:
      return state;
  }
};

export default userReducer;
