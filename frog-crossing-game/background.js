class Background {
    constructor(screenWidth, screenHeight, backgroundPath, roadPath) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight - 60;  // Adjust for the info board height

        // Load and scale background image
        this.backgroundImage = new Image();
        this.backgroundImage.src = backgroundPath;
        this.backgroundImage.onload = () => {
            this.backgroundImage = this.scaleToFitWidth(this.backgroundImage, this.screenWidth);
        };

        // Load and scale road image
        this.roadImage = new Image();
        this.roadImage.src = roadPath;
        this.roadImage.onload = () => {
            this.roadImage = this.scaleToFitWidth(this.roadImage, this.screenWidth);
            this.laneHeight = this.roadImage.height / 2;
            this.roadPositions = this.calculateRoadPositions();
        };
    }

    scaleToFitWidth(image, targetWidth) {
        const originalWidth = image.width;
        const originalHeight = image.height;
        const scaleFactor = targetWidth / originalWidth;
        const newWidth = Math.floor(originalWidth * scaleFactor);
        const newHeight = Math.floor(originalHeight * scaleFactor);
        return {
            image: image,
            width: newWidth,
            height: newHeight
        };
    }

    calculateRoadPositions() {
        const positions = [];
        const roadHeight = this.roadImage.height;

        // Start at a position such that the total height of roads is centered
        let yOffset = (this.screenHeight - roadHeight * 3 - 5 * 2) / 2; // Adjust based on 3 roads

        while (yOffset + roadHeight <= this.screenHeight) {
            positions.push(yOffset);
            yOffset += roadHeight + 5;  // 5px gap between roads
        }
        return positions;
    }

    draw(ctx) {
        if (this.backgroundImage) {
            ctx.drawImage(this.backgroundImage.image, 0, 60, this.backgroundImage.width, this.backgroundImage.height);
        }

        if (this.roadImage) {
            this.roadPositions.forEach(y => {
                ctx.drawImage(this.roadImage.image, 0, y + 60, this.roadImage.width, this.roadImage.height);
            });
        }
    }
}
