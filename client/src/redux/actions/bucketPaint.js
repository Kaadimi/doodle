export default class BucketPaint {
    constructor(canvas) {
        this.context = canvas.getContext('2d')
        this.targetColor = [-1, -1, -1, -1]
        this.replacementColor = [-1, -1, -1, -1]
        this.imageData = []
        this.pixelStack = []
    }

    dropBucket(imageData, start, color)
    {
        this.imageData = imageData
        this.targetColor = this.getPixel(start)
        this.replacementColor = this.hexToRgb(color)
        this.flood_fill(start)
        this.fillColor()
    }

    colorMatch = (color1, color2) => {
        return (color1[0] === color2[0] && color1[1] === color2[1]
            && color1[2] === color2[2] && color1[3] === color2[3])
    }
    
    hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            255
        ] : [-1, -1, -1, -1];
    }
    
    getPixel = (start) => {
        if (!this.imageData || start.y < 0 || start.x < 0 || start.y >= this.imageData.height || start.x >= this.imageData.width)
            return [-1, -1, -1, -1]
        else {
            const offset = (start.y * this.imageData.width + start.x) * 4
            return [
                this.imageData.data[offset],
                this.imageData.data[offset + 1],
                this.imageData.data[offset + 2],
                this.imageData.data[offset + 3]
            ]
        }
    }
    
    setPixel = (start) => {
        const offset = (start.y * this.imageData.width + start.x) * 4

        this.imageData.data[offset] = this.replacementColor[0];
        this.imageData.data[offset + 1] = this.replacementColor[1];
        this.imageData.data[offset + 2] = this.replacementColor[2];
        this.imageData.data[offset + 3] = this.replacementColor[3];
    }
    
    fillColor = () => {
        if (this.pixelStack.length) {
            const range = this.pixelStack.length;
    
            for (let i = 0; i < range; i++) {
                this.flood_fill(this.pixelStack[i])
            }
            this.pixelStack.splice(0, range);
            this.fillColor();
        } else {
            this.context.putImageData(this.imageData, 0, 0)
            this.pixelStack = []
        }
    }
    
    flood_fill = (start) => {
        if (this.colorMatch(this.targetColor, this.replacementColor))
            return ;
        const currentColor = this.getPixel(start)
        if (this.colorMatch(currentColor, this.targetColor)) {
            this.setPixel(start);
            this.pixelStack.push({x: start.x + 1, y: start.y});
            this.pixelStack.push({x: start.x - 1, y: start.y});
            this.pixelStack.push({x: start.x, y: start.y + 1});
            this.pixelStack.push({x: start.x, y: start.y - 1});
        }
        return ;
    }
}