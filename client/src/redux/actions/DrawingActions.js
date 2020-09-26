const distanceFinder = (start, end) => {
    let x = Math.pow(end.x - start.x, 2)
    let y = Math.pow(end.y - start.y, 2)
    return Math.sqrt(x + y)
}

export const drawPath = (tool, start, end, lineWidth, context) => {
    context.beginPath();

    switch (tool) {
        case 'eraser':
            const size = lineWidth * 5
            context.clearRect(start.x - (size / 2), start.y - (size / 2), size, size)
            break ;
        case 'pencil': case 'line':
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            break ;
        case 'rectangle':
            context.rect(start.x, start.y, end.x - start.x, end.y - start.y)
            break ;
        case 'circle':
            let distance = distanceFinder(start, end)
            context.arc(start.x, start.y, distance, 0, 2 * Math.PI)
            break ;
        case 'triangle':
            context.moveTo(start.x, start.y)
            context.lineTo(start.x + ((end.x - start.x) / 2), end.y)
            context.lineTo(start.x - ((end.x - start.x) / 2), end.y)
            context.closePath();
            break ;
        default:
            break ;
    }
    context.stroke();
    context.closePath();
}

export const drawCursor = (end, lineWidth, context) => {
   const size = lineWidth * 5
   context.beginPath()
   context.rect(end.x - (size / 2), end.y - (size / 2), size, size)
   context.stroke();
   context.closePath()
}

// const colorMatch = (color1, color2) => {
//     return (color1[0] === color2[0] && color1[1] === color2[1]
//         && color1[2] === color2[2] && color1[3] === color2[3])
// }

// export const hexToRgb = (hex) => {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? [
//         parseInt(result[1], 16),
//         parseInt(result[2], 16),
//         parseInt(result[3], 16),
//         255
//     ] : [-1, -1, -1, -1];
// }

// export const getPixel = (imageData, start) => {
//     if (!imageData || start.y < 0 || start.x < 0 || start.y > imageData.height || start.x > imageData.width)
//         return [-1, -1, -1, -1]
//     else {
//         const offset = (start.y * imageData.width + start.x) * 4
//         return [
//             imageData.data[offset],
//             imageData.data[offset + 1],
//             imageData.data[offset + 2],
//             imageData.data[offset + 3]
//         ]
//     }
// }

// const setPixel = (imageData, start, replacementColor) => {
//     const offset = (start.y * imageData.width + start.x) * 4
        
//     imageData.data[offset] = replacementColor[0];
//     imageData.data[offset + 1] = replacementColor[1];
//     imageData.data[offset + 2] = replacementColor[2];
//     imageData.data[offset + 3] = replacementColor[3];
// }

// export const fillColor = (context, imageData, pixelStack) => {
//     if (pixelStack.length) {
//         const range = pixelStack.length;

//         for (let i = 0; i < range; i++) {
//             flood_fill(pixelStack[i][0], pixelStack[i][1], pixelStack[i][2], pixelStack[i][3])
//         }
//         pixelStack.splice(0, range);
//         fillColor(context, imageData, pixelStack);
//     } else {
//         context.putImageData(imageData, 0, 0)
//     }
// }

// export const flood_fill = (imageData, start, targetColor, replacementColor) => {
//     if (colorMatch(targetColor, replacementColor))
//         return ;
//     const currentColor = getPixel(imageData, start)
//     if (colorMatch(currentColor, targetColor)) {
//         setPixel(imageData, start, replacementColor);
//         let pixelStack = []
//         pixelStack.push([imageData, {x: start.x + 1, y: start.y}, targetColor, replacementColor]);
//         pixelStack.push([imageData, {x: start.x - 1, y: start.y}, targetColor, replacementColor]);
//         pixelStack.push([imageData, {x: start.x, y: start.y + 1}, targetColor, replacementColor]);
//         pixelStack.push([imageData, {x: start.x, y: start.y - 1}, targetColor, replacementColor]);
//         return pixelStack;
//     }
//     return ;
// }
