import { LOAD_ALL_PLASES } from "../reducer/../constants";

const defaultState = {
    plases: null
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_ALL_PLASES:
            return {
                ...state,
                plases: payload.items
            };
        default:
            return state;
    }
};
