export const actionTypes = {
    UPDATE_REMOTE_SERVER: "UPDATE_REMOTE_SERVER",
    UPDATE_REMOTE_USER: "UPDATE_REMOTE_USER",
    UPDATE_REMOTE_PW: "UPDATE_REMOTE_PW"
};

let initialState = {
    remote: {
        valid: false,
        server: null,
        username: null,
        password: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_REMOTE_SERVER:
            return {
                ...state,
                remote: {
                    ...state.remote,
                    server: action.server
                }
            }

        case actionTypes.UPDATE_REMOTE_USER:
            return {
                ...state,
                remote: {
                    ...state.remote,
                    username: action.username
                }
            }

        case actionTypes.UPDATE_REMOTE_PW:
            return {
                ...state,
                remote: {
                    ...state.remote,
                    password: action.password
                }
            }

        default:
            return state;
    }
};
