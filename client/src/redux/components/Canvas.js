import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../styles/Canvas.css'
import { mouseCoordinates, setContext } from '../actions/CanvasActions'
import { drawCursor, drawPath, userJoined } from '../actions/actions'
import BucketPaint from '../actions/bucketPaint'

function Canvas() {
    const canvasRef = useRef(null)
    const dispatch = useDispatch()
    const {context, color, tool, lineWidth} = useSelector(state => state.canvas)
  
    useEffect(() => {
      const canvas = canvasRef.current
      let start = {x: 0, y: 0}
      let end = {x: 0, y: 0}
      let mouseDown = false
      let imageData = null
      const bucket = new BucketPaint(canvas)

      function init() {
        const renderCtx = canvas.getContext('2d')
       
        if (renderCtx) {
          dispatch(setContext(renderCtx))

          canvas.addEventListener('mousedown', handleMouseDown);
          document.addEventListener('mouseup', handleMouseUp);
          canvas.addEventListener('mousemove', handleMouseMove);
          canvas.addEventListener('mouseleave', handleMouseLeave);
        }
      }

      const handleMouseLeave = () => {
        if (context && imageData) {
          context.putImageData(imageData, 0, 0) 
        }
      }
  
      const handleMouseDown = (evt) => {
        if (context && !imageData)
          imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        mouseDown = true
        start = mouseCoordinates(evt, canvas)
        end = mouseCoordinates(evt, canvas)
        if (tool === 'bucket') {
          bucket.dropBucket(imageData, start, color)
        }
      }
  
      const handleMouseUp = () => {
          mouseDown = false
          if (context && imageData) {
            if (tool === 'pencil' || tool === 'eraser')
              context.putImageData(imageData, 0, 0)
            imageData = context.getImageData(0, 0, canvas.width, canvas.height)
          }
      }
  
      const handleMouseMove = (evt) => {
          if (mouseDown && context) {
            context.strokeStyle = color;
            context.lineWidth = lineWidth;

            if (tool === 'pencil' || tool === 'eraser') {
              start = {x: end.x, y: end.y}
            }
            context.putImageData(imageData, 0, 0)
            end = mouseCoordinates(evt, canvas)
            drawPath(tool, start, end, lineWidth, context)
            if (tool === 'pencil' || tool === 'eraser') {
              imageData = context.getImageData(0, 0, canvas.width, canvas.height)
              drawCursor(end, lineWidth, context)
            }
          } else if (context) {
            context.strokeStyle = color;
            if (!imageData)
              imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            context.putImageData(imageData, 0, 0)
            end = mouseCoordinates(evt, canvas)
            drawCursor(end, lineWidth, context)
          }
      }

      init()
      return function cleanup() {
        if (canvas) {
          canvas.removeEventListener('mousedown', handleMouseDown);
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.addEventListener('mouseleave', handleMouseLeave);
        }
        document.removeEventListener('mouseup', handleMouseUp);
      }
  }, [context, color, tool, lineWidth, dispatch])

  // useEffect(() => {
  //   userJoined()
  // }, [])

  return (
        <canvas id="myCanvas" width={500} height={500} ref={canvasRef}/>
  )
}

export default Canvas
