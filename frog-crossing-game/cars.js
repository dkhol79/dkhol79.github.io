const laneHeight = 135;
const carSpeeds = [2, 3, 4, 5];
const minimumDistance = 100;

const carImages = [
    "cars/blue-car.png",
    "cars/blue-2-car.png",
    "cars/dark-blue-car.png",
    "cars/red-car.png",
    "cars/red-truck.png",
    "cars/blue-truck.png",
    "cars/green-truck.png",
    "cars/dark-purple-truck.png",
    "cars/yellow-car.png",
    "cars/yellow-2-car.png",
    "cars/orange-car.png",
    "cars/light-yellow-car.png",
    "cars/purple-car.png",
    "cars/dark-purple-car.png",
    "cars/grey-car.png",
    "cars/white-car.png",
    "cars/green-suv.png"
];

let carPositions = {};
let carSpeedsOnLane = {};

const gameContainer = document.getElementById("game-container");
const gameWidth = gameContainer.offsetWidth || 800;

const laneHeightPerLane = laneHeight / 2;
const validRoadPositions = [100, 245, 390, 535];

function createCar(roadY, laneIndex, isRightToLeft) {
    const car = document.createElement("div");
    car.classList.add("car");

    const carImage = carImages[Math.floor(Math.random() * carImages.length)];
    const speed = carSpeeds[Math.floor(Math.random() * carSpeeds.length)];

    const img = new Image();
    img.src = carImage;

    img.onload = () => {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        const scaleFactor = 80 / naturalWidth;
        const carWidth = naturalWidth * scaleFactor;
        const carHeight = naturalHeight * scaleFactor;

        car.style.backgroundImage = `url(${carImage})`;
        car.style.width = `${carWidth}px`;
        car.style.height = `${carHeight}px`;

        const laneY = roadY + laneIndex * laneHeightPerLane;
        car.style.top = `${laneY + (laneHeightPerLane - carHeight) / 2}px`;
        car.style.position = "absolute";

        let initialPosition = isRightToLeft ? gameWidth : -carWidth;

        const laneKey = `${roadY}-${laneIndex}`;
        if (!carPositions[laneKey]) carPositions[laneKey] = [];
        while (isCarOverlapping(laneKey, initialPosition, carWidth)) {
            initialPosition = isRightToLeft ? initialPosition + (carWidth + 20) : initialPosition - (carWidth + 20);
        }

        carPositions[laneKey].push(initialPosition);

        car.style.transform = `translateX(${initialPosition}px)`;
        if (!isRightToLeft) {
            car.style.transform += " scaleX(-1)";
        }

        gameContainer.appendChild(car);

        if (!carSpeedsOnLane[laneKey]) carSpeedsOnLane[laneKey] = [];
        carSpeedsOnLane[laneKey].push({ car, speed, isRightToLeft, position: initialPosition });

        moveCar(car, isRightToLeft, speed, laneKey, carWidth);
    };
}

function isCarOverlapping(laneKey, position, carWidth) {
    return carPositions[laneKey].some(pos => Math.abs(pos - position) < carWidth);
}

function adjustCarSpeeds(laneKey) {
    const carsInLane = carSpeedsOnLane[laneKey] || [];

    for (let i = 0; i < carsInLane.length; i++) {
        const carInfo = carsInLane[i];
        const { speed, position, isRightToLeft } = carInfo;

        let adjustedSpeed = speed;
        for (let j = 0; j < carsInLane.length; j++) {
            if (i === j) continue;
            const nextCar = carsInLane[j];
            const distance = Math.abs(position - nextCar.position);

            if (distance < minimumDistance &&
                ((isRightToLeft && position > nextCar.position) ||
                 (!isRightToLeft && position < nextCar.position))) {
                adjustedSpeed = Math.min(adjustedSpeed, nextCar.speed);
            }
        }

        carSpeedsOnLane[laneKey][i].speed = adjustedSpeed;
    }
}

function moveCar(car, isRightToLeft, initialSpeed, laneKey, carWidth) {
    const direction = isRightToLeft ? -1 : 1;
    let carInfo = carSpeedsOnLane[laneKey].find(c => c.car === car);
    carInfo.speed = initialSpeed;

    function move() {
        adjustCarSpeeds(laneKey);

        const currentCarInfo = carSpeedsOnLane[laneKey].find(c => c.car === car);
        if (!currentCarInfo) return;

        currentCarInfo.position += direction * currentCarInfo.speed;

        car.style.transform = `translateX(${currentCarInfo.position}px)${!isRightToLeft ? " scaleX(-1)" : ""}`;

        if (isRightToLeft && currentCarInfo.position < -carWidth ||
            !isRightToLeft && currentCarInfo.position > gameWidth) {
            car.remove();
            carPositions[laneKey] = carPositions[laneKey].filter(pos => Math.abs(pos - currentCarInfo.position) > 1);
            carSpeedsOnLane[laneKey] = carSpeedsOnLane[laneKey].filter(c => c.car !== car);
        } else {
            requestAnimationFrame(move);
        }
    }

    requestAnimationFrame(move);
}

// Updated generateCars to accept roads as a parameter
function generateCars(roads) {
    roads.forEach((road) => {
        const roadY = road.offsetTop;

        if (validRoadPositions.includes(roadY)) {
            createCar(roadY, 0, true); // Upper lane: right-to-left
            createCar(roadY, 1, false); // Lower lane: left-to-right
        } else {
            console.log(`Skipping car generation for invalid roadY: ${roadY}`);
        }
    });
}