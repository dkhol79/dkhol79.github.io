class Frog {
    constructor(x, y, spriteFolder) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.spriteFolder = spriteFolder;
        this.sprites = [];
        this.currentSpriteIndex = 0;
        this.facingDirection = "UP";

        this.tongueLength = 0;
        this.tongueVisible = false;
        this.tongueMaxLength = 60;
        this.tongueSpeed = 15;
        this.tongueTimer = 0;

        this.isJumping = false;

        this.createFrogElement();
        this.loadSprites();
    }

    async loadSprites() {
        for (let i = 1; i <= 7; i++) {
            let img = new Image();
            img.src = `${this.spriteFolder}/frog${i}.png`;
            await img.decode();
            this.sprites.push(img);
        }
        this.updateSprite(); // Set initial sprite
    }

    createFrogElement() {
        this.frogElement = document.createElement("div");
        this.frogElement.classList.add("frog");
        this.frogElement.style.width = this.size + "px";
        this.frogElement.style.height = this.size + "px";
        this.frogElement.style.position = "absolute";
        this.frogElement.style.left = this.x + "px";
        this.frogElement.style.top = this.y + "px";

        this.spriteElement = document.createElement("div");
        this.spriteElement.style.width = "100%";
        this.spriteElement.style.height = "100%";
        this.spriteElement.style.position = "absolute";
        this.spriteElement.style.zIndex = "2";
        this.spriteElement.style.backgroundSize = "contain";
        this.spriteElement.style.backgroundRepeat = "no-repeat";
        this.spriteElement.style.backgroundPosition = "center";
        this.spriteElement.style.transformOrigin = "center";

        this.tongueElement = document.createElement("div");
        this.tongueElement.classList.add("tongue");
        this.tongueElement.style.position = "absolute";
        this.tongueElement.style.backgroundColor = "pink";
        this.tongueElement.style.width = "5px";
        this.tongueElement.style.height = "0px";
        this.tongueElement.style.display = "none";
        this.tongueElement.style.zIndex = "1";

        this.frogElement.appendChild(this.tongueElement);
        this.frogElement.appendChild(this.spriteElement);
        document.getElementById("game-container").appendChild(this.frogElement);
    }

    updateSprite() {
        if (this.sprites.length > 0) {
            // Simply set the sprite based on current index, no automatic cycling
            this.spriteElement.style.backgroundImage = `url(${this.sprites[this.currentSpriteIndex].src})`;

            // Apply direction-based transform (assuming sprites face UP by default)
            this.spriteElement.style.transform = ""; // Reset transform first
            switch (this.facingDirection) {
                case "UP":
                    this.spriteElement.style.transform = "rotate(0deg) scaleX(1)";
                    break;
                case "DOWN":
                    this.spriteElement.style.transform = "rotate(180deg) scaleX(1)";
                    break;
                case "LEFT":
                    this.spriteElement.style.transform = "rotate(-90deg) scaleX(-1)";
                    break;
                case "RIGHT":
                    this.spriteElement.style.transform = "rotate(90deg) scaleX(1)";
                    break;
            }
            console.log(`Facing: ${this.facingDirection}, Sprite: frog${this.currentSpriteIndex + 1}.png`);
        }
    }

    async move(dx, dy) {
        if (this.isJumping) return; // Prevent overlapping jumps

        let jumpDistance = 2;
        dx *= jumpDistance;
        dy *= jumpDistance;

        this.x = Math.max(0, Math.min(750, this.x + dx));
        this.y = Math.max(0, Math.min(750, this.y + dy));

        this.frogElement.style.left = this.x + "px";
        this.frogElement.style.top = this.y + "px";

        // Update direction
        if (dx < 0) this.facingDirection = "LEFT";
        else if (dx > 0) this.facingDirection = "RIGHT";
        else if (dy < 0) this.facingDirection = "UP";
        else if (dy > 0) this.facingDirection = "DOWN";

        // Start jump animation
        this.isJumping = true;
        this.currentSpriteIndex = 0; // Start at frog1.png
        this.updateSprite();

        // Animate through sprites 0 to 6
        for (let i = 1; i <= 6; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            this.currentSpriteIndex = i;
            this.updateSprite();
        }

        this.isJumping = false; // Jump complete, ends on frog7.pn
    }

    extendTongue() {
        if (!this.tongueVisible) {
            this.tongueVisible = true;
            this.tongueLength = 0;
            this.tongueElement.style.display = "block";
            this.tongueTimer = performance.now();
            requestAnimationFrame(() => this.updateTongue());
        }
    }

    updateTongue() {
        if (this.tongueVisible) {
            let elapsedTime = performance.now() - this.tongueTimer;

            if (elapsedTime < 200) {
                this.tongueLength = Math.min(this.tongueLength + this.tongueSpeed, this.tongueMaxLength);
            } else if (elapsedTime < 900) {
                this.tongueLength = Math.max(this.tongueLength - this.tongueSpeed, 0);
            } else {
                this.tongueVisible = false;
                this.tongueLength = 0;
                this.tongueElement.style.display = "none";
            }

            this.updateTonguePosition();
            if (this.tongueVisible) requestAnimationFrame(() => this.updateTongue());
        }
    }

    updateTonguePosition() {
        const centerX = this.size / 2;
        const centerY = this.size / 2;
        const tongueWidth = 5;

        if (this.facingDirection === "UP") {
            this.tongueElement.style.left = `${centerX - tongueWidth / 2}px`;
            this.tongueElement.style.top = `${centerY - this.tongueLength}px`;
            this.tongueElement.style.width = `${tongueWidth}px`;
            this.tongueElement.style.height = `${this.tongueLength}px`;
        } else if (this.facingDirection === "DOWN") {
            this.tongueElement.style.left = `${centerX - tongueWidth / 2}px`;
            this.tongueElement.style.top = `${centerY}px`;
            this.tongueElement.style.width = `${tongueWidth}px`;
            this.tongueElement.style.height = `${this.tongueLength}px`;
        } else if (this.facingDirection === "LEFT") {
            this.tongueElement.style.left = `${centerX - this.tongueLength}px`;
            this.tongueElement.style.top = `${centerY - tongueWidth / 2}px`;
            this.tongueElement.style.width = `${this.tongueLength}px`;
            this.tongueElement.style.height = `${tongueWidth}px`;
        } else if (this.facingDirection === "RIGHT") {
            this.tongueElement.style.left = `${centerX}px`;
            this.tongueElement.style.top = `${centerY - tongueWidth / 2}px`;
            this.tongueElement.style.width = `${this.tongueLength}px`;
            this.tongueElement.style.height = `${tongueWidth}px`;
        }
    }
}