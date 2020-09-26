import { SET_COLOR, SET_CONTEXT, SET_LINE_WIDTH, SET_TOOL } from "."

export const setContext = (payload) => {
    return {
        type: SET_CONTEXT,
        payload
    }
}

export const setColor = (payload) => {
    return {
        type: SET_COLOR,
        payload
    }
}

export const setTool = (payload) => {
    return {
        type: SET_TOOL,
        payload
    }
}

export const setLineWidth = (payload) => {
    return {
        type: SET_LINE_WIDTH,
        payload
    }
}

export const mouseCoordinates = (evt, canvas) => {
    return {
            x: evt.clientX - canvas.offsetLeft,
            y: evt.clientY - canvas.offsetTop,
    }
}