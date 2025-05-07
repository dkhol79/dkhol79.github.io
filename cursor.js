document.addEventListener("DOMContentLoaded", () => {
    // Create the cursor elements
    const cursor = document.createElement("div");
    const cursorOutline = document.createElement("div");

    cursor.classList.add("cursor");
    cursorOutline.classList.add("cursor-outline");

    document.body.appendChild(cursor);
    document.body.appendChild(cursorOutline);

    // Initialize position variables
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    const smoothness = 0.1;

    // Restore last known position (if available)
    const lastX = sessionStorage.getItem("mouseX");
    const lastY = sessionStorage.getItem("mouseY");
    if (lastX && lastY) {
        mouseX = parseFloat(lastX);
        mouseY = parseFloat(lastY);
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        cursorOutline.style.left = `${mouseX}px`;
        cursorOutline.style.top = `${mouseY}px`;
    }

    // Function to get the background color of an element
    function getBackgroundColor(element) {
        while (element && element !== document.body) {
            const style = window.getComputedStyle(element);
            const bgColor = style.backgroundColor;
            if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                return bgColor;
            }
            element = element.parentElement;
        }
        return window.getComputedStyle(document.body).backgroundColor;
    }

    // Function to check if color is white or near-white
    function isWhiteColor(rgb) {
        const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!match) return false;
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        // Consider colors with RGB values >= 240 as near-white
        return r >= 240 && g >= 240 && b >= 240;
    }

    // Mouse movement tracking
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        cursor.style.opacity = "1";
        cursorOutline.style.opacity = "1";

        // Get element under cursor
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element) {
            const bgColor = getBackgroundColor(element);
            if (isWhiteColor(bgColor)) {
                cursor.style.backgroundColor = 'rgb(31, 84, 69)';
                cursorOutline.style.borderColor = 'rgb(31, 84, 69)';
            } else {
                cursor.style.backgroundColor = '#FFF4BA';
                cursorOutline.style.borderColor = '#FFF4BA';
            }
        }
    });

    // Animate outline to follow with lag
    function animateOutline() {
        outlineX += (mouseX - outlineX) * smoothness;
        outlineY += (mouseY - outlineY) * smoothness;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hide default cursor
    document.body.style.cursor = "none";

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
        "a, button, .nav-toggle, .cta, .cta-white, .cta-dark, .copy-email-button, .portfolio-title, .portfolio-description, .social-links, .logo, .portfolio-item img"
    );
    interactiveElements.forEach((el) => {
        el.style.cursor = "none";
        el.addEventListener("mouseenter", () => {
            el.style.cursor = "none";
        });
        el.addEventListener("mouseleave", () => {
            el.style.cursor = "none";
        });
    });

    // Hide custom cursor when mouse leaves the window
    window.addEventListener("mouseout", (e) => {
        if (e.relatedTarget === null && e.toElement === null) {
            cursor.style.opacity = "0";
            cursorOutline.style.opacity = "0";
        }
    });

    window.addEventListener("mouseover", () => {
        cursor.style.opacity = "1";
        cursorOutline.style.opacity = "1";
    });

    document.addEventListener("scroll", () => {
        cursor.style.opacity = "1";
        cursorOutline.style.opacity = "1";
    });

    // Hover effects
    function applyHoverEffect(element) {
        element.addEventListener("mouseenter", () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(3)";
            cursorOutline.style.borderWidth = ".75px";
            element.style.cursor = "none";
        });

        element.addEventListener("mouseleave", () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOutline.style.borderWidth = "1.5px";
            element.style.cursor = "none";
        });
    }

    // Apply hover effect to interactive elements
    if (document.querySelector(".nav-toggle")) applyHoverEffect(document.querySelector(".nav-toggle"));
    document.querySelectorAll(".cta, .cta-white, .cta-dark").forEach(applyHoverEffect);
    document.querySelectorAll(".portfolio-title, .portfolio-description, .portfolio-item img, .navigation a").forEach(applyHoverEffect);
    if (document.querySelector(".social-links")) applyHoverEffect(document.querySelector(".social-links"));
    document.querySelectorAll(".logo").forEach(applyHoverEffect);

    // Save position before navigating away
    window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("mouseX", mouseX);
        sessionStorage.setItem("mouseY", mouseY);
    });

    // Fade out cursor before clicking a link
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            cursor.style.opacity = "0";
            cursorOutline.style.opacity = "0";
        });
    });
});