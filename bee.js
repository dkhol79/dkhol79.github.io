document.addEventListener('DOMContentLoaded', () => {
    // Create bee element
    const bee = document.createElement('div');
    bee.className = 'bee';
    bee.style.position = 'fixed';
    bee.style.width = '40px';
    bee.style.height = '40px';
    bee.style.backgroundImage = 'url("assets/bee.png")'; // Ensure you have a bee image in assets
    bee.style.backgroundSize = 'contain';
    bee.style.backgroundRepeat = 'no-repeat';
    bee.style.zIndex = '10000';
    bee.style.pointerEvents = 'none';
    bee.style.display = 'none';
    document.body.appendChild(bee);

    // Function to animate bee in zigzag pattern
    function flyBee() {
        bee.style.display = 'block';

        // Random starting position (left or right side)
        const startFromLeft = Math.random() > 0.5;
        let posX = startFromLeft ? -40 : window.innerWidth;
        let posY = Math.random() * (window.innerHeight - 100) + 50;
        bee.style.left = `${posX}px`;
        bee.style.top = `${posY}px`;

        // Set rotation based on direction (upward-facing bee)
        const direction = startFromLeft ? 1 : -1;
        bee.style.transform = `rotate(${direction === 1 ? 90 : -90}deg)`; // 90° for right, -90° for left

        // Zigzag parameters
        const speed = 5; // Pixels per frame
        const zigzagHeight = 50; // Height of zigzag
        const zigzagWidth = 100; // Width of each zigzag segment
        let phase = 0; // Controls zigzag wave

        // Animation loop
        const animate = () => {
            posX += speed * direction;
            phase += 0.1;
            posY += Math.sin(phase) * zigzagHeight / 2;

            // Update position
            bee.style.left = `${posX}px`;
            bee.style.top = `${posY}px`;

            // Check if bee is off-screen
            if ((startFromLeft && posX > window.innerWidth) || (!startFromLeft && posX < -40)) {
                bee.style.display = 'none';
                return;
            }

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }

    // Run bee animation every 5 minutes
    function scheduleBee() {
        flyBee();
        setInterval(flyBee, 5 * 60 * 1000); // 5 minutes in milliseconds
    }

    // Start the schedule
    scheduleBee();
});