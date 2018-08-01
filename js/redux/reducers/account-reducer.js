const initialState = {
  accounts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  case 'LOAD_ACCOUNTS': {
    console.log({ payload: action.payload });

    const response = action.payload;

    const accounts = response.status === 200 && Array.isArray(response.data) ? response.data : [];

    return {
      ...state,
      accounts
    };
  }
  default: {
    return state;
  }
  }
};
