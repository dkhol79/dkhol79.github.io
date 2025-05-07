// Initialize frog but don't add it to the DOM yet
const frog = new Frog(375, 750, "images");
let gameStarted = false;

// Create roads but don't append them until the game starts
const roadGap = 10;
const roadPositions = [100, 235 + roadGap, 370 + 2 * roadGap, 505 + 3 * roadGap];

// Function to create roads and return them
function createRoads() {
    const gameContainer = document.getElementById("game-container");
    roadPositions.forEach((posY) => {
        let road = document.createElement("div");
        road.classList.add("road");
        road.style.top = posY + "px";
        gameContainer.appendChild(road);
    });
    // Return the newly created roads for use in cars.js
    return document.querySelectorAll(".road");
}

// Move the frog based on user input (only if game has started)
document.addEventListener("keydown", (event) => {
    if (!gameStarted) return; // Do nothing if game hasn't started
    if (event.key === "ArrowLeft") frog.move(-20, 0);
    if (event.key === "ArrowRight") frog.move(20, 0);
    if (event.key === "ArrowUp") frog.move(0, -20);
    if (event.key === "ArrowDown") frog.move(0, 20);
    if (event.key === " ") frog.extendTongue();
});

// Fixed collision detection with cars from cars.js
function checkCollision() {
    const gameContainer = document.getElementById("game-container");
    const containerRect = gameContainer.getBoundingClientRect();

    const frogLeft = frog.x;
    const frogTop = frog.y;
    const frogRight = frogLeft + frog.size;
    const frogBottom = frogTop + frog.size;

    const cars = document.querySelectorAll(".car");

    for (const car of cars) {
        const transform = window.getComputedStyle(car).transform;
        let carX = 0;
        if (transform && transform !== "none") {
            const matrix = transform.match(/matrix\((.+)\)/);
            if (matrix) {
                const values = matrix[1].split(",");
                carX = parseFloat(values[4]);
            }
        }

        const carTop = parseFloat(car.style.top);
        const carWidth = parseFloat(car.style.width);
        const carHeight = parseFloat(car.style.height);
        const carLeft = carX;
        const carRight = carLeft + carWidth;
        const carBottom = carTop + carHeight;

        const isColliding =
            frogLeft < carRight &&
            frogRight > carLeft &&
            frogTop < carBottom &&
            frogBottom > carTop;

        if (isColliding) {
            alert("Game Over! You hit a car. Try again.");
            window.location.reload();
            return;
        }
    }
}

// Win condition if the frog reaches the top
function checkWin() {
    if (frog.y <= 0) {
        alert("You Win! The frog crossed safely.");
        window.location.reload();
    }
}

// Game loop to continuously check for collisions and win condition
function gameLoop() {
    if (!gameStarted) return; // Stop loop if game hasn't started
    checkCollision();
    checkWin();
    requestAnimationFrame(gameLoop);
}

// Start game function
function startGame() {
    gameStarted = true;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    // Append frog to the game container
    document.getElementById("game-container").appendChild(frog.frogElement);

    // Create roads and get the updated list
    const roads = createRoads();

    // Start generating cars with the updated roads
    generateCars(roads); // Pass the roads to generateCars

    // Start the game loop
    gameLoop();

    // Start continuous car generation
    setInterval(() => generateCars(roads), 2000); // Add cars every 2 seconds
}

// Add event listener for the start button
document.getElementById("start-button").addEventListener("click", startGame);