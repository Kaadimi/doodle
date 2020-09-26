const { SET_COLOR, SET_LINE_WIDTH, SET_TOOL, SET_CONTEXT } = require("../actions")

const initialState = {
    imageData: [],
    context: null,
    color: '#000000',
    tool: 'pencil',
    lineWidth: 3
}

const mainReducer = (state = initialState, {type, payload}) => {
    switch (type)
    {
        case SET_CONTEXT:
            return {
                ...state,
                context: payload
            }
        case SET_COLOR:
            return {
                ...state,
                color: payload
            }
        case SET_LINE_WIDTH:
            return {
                ...state,
                lineWidth: payload
            }
        case SET_TOOL:
            return {
                ...state,
                tool: payload
            }
        default:
            return state
    }
}

export default mainReducer