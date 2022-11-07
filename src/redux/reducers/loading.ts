const initialState = {
  loading: false,
};

export default function loadingReducer(state = initialState, action: any) {
  switch (action.type) {
    case "show": {
      return {
        ...state,
        loading: true,
      };
    }
    case "hide": {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
