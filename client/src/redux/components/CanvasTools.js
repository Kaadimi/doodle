import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setColor, setLineWidth, setTool } from '../actions/CanvasActions'

import '../styles/CanvasTools.css'

function CanvasTools() {
    const dispatch = useDispatch()
    const {context, color, tool, lineWidth} = useSelector(state => state)
    const icons = ['line', 'rectangle', 'circle', 'triangle', 'pencil', 'bucket', 'eraser']
    
    return (
        <div id="canvasTools">
            <button onClick={() => context.clearRect(0, 0, 500, 500)} className="toolButtons">
                <img alt='clean' src={process.env.PUBLIC_URL + '/clean.png'}></img>
            </button>
            <div id="divider"></div>
            {icons.map(icon => <button key={icon} onClick={() => dispatch(setTool(icon))} className="toolButtons" id={tool === icon ? 'active' : null}>
                <img alt={icon} src={process.env.PUBLIC_URL + `${icon}.png`}></img>
            </button>)}
            <div id="divider"></div>
            <input id="colorPicker" onChange={(event) => dispatch(setColor(event.target.value))} value={color} type="color"></input>
            <div id="widthSelector">
                <select id="lineWidth" onChange={(event) => dispatch(setLineWidth(event.target.value))} value={lineWidth} name="line width">
                    <option value="1">1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>
                    <option value="4" >4</option>
                    <option value="5" >5</option>
                    <option value="6" >6</option>
                </select>
            </div>
        </div>
    )
}

export default CanvasTools
