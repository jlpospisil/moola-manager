let initialState = {
    accounts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_ACCOUNTS":
            // console.log({ payload: action.payload.request._response });

            return {
                ...state,
                accounts: JSON.parse(action.payload.request._response || [])
            }

        default:
            return state;
    }
};