// Cursor Animation
document.addEventListener("DOMContentLoaded", () => {
    // Create the cursor elements
    const cursor = document.createElement("div");
    const cursorOutline = document.createElement("div");
  
    // Add classes for styling
    cursor.classList.add("cursor");
    cursorOutline.classList.add("cursor-outline");
  
    // Append the cursor elements to the body
    document.body.appendChild(cursor);
    document.body.appendChild(cursorOutline);
  
    // Initialize position variables
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
  
    // Smoothness factor for outline lag
    const smoothness = 0.1;
  
    // Track mouse movement
    document.addEventListener("mousemove", (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
  
        // Update the main cursor position immediately
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
  
        cursorOutline.style.left = `${mouseX}px`;
        cursorOutline.style.top = `${mouseY}px`;
  
        // Ensure cursor is visible when moving inside the viewport
        cursor.style.opacity = "1";
        cursorOutline.style.opacity = "1";
    });
  
      // Smooth animation for the outline cursor
      function animateOutline() {
          // Calculate the lagged position
          outlineX += (mouseX - outlineX) * smoothness;
          outlineY += (mouseY - outlineY) * smoothness;
  
          // Update the outline cursor position
          cursorOutline.style.left = `${outlineX}px`;
          cursorOutline.style.top = `${outlineY}px`;
  
          // Recursively call the animation frame
          requestAnimationFrame(animateOutline);
      }
  
      // Start the outline animation
      animateOutline();
  
      // Hide the default browser cursor
      document.body.style.cursor = "none";
  
      // Hide the custom cursor when leaving the viewport
      document.addEventListener("mouseleave", () => {
          cursor.style.opacity = "0";
          cursorOutline.style.opacity = "0";
      });
  
      // Show the custom cursor when entering the viewport
      document.addEventListener("mouseenter", () => {
          cursor.style.opacity = "1";
          cursorOutline.style.opacity = "1";
      });
    
      // Function to apply hover effects
      function applyHoverEffect(element) {
          element.addEventListener("mouseenter", () => {
              cursorOutline.style.transform = "translate(-50%, -50%) scale(3)"; // Expand the outline
              cursorOutline.style.borderWidth = ".75px"; // Adjust thickness
          });
  
          element.addEventListener("mouseleave", () => {
              cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"; // Reset to default
              cursorOutline.style.borderWidth = "1.5px"; // Reset thickness
          });
      }
  
      // Apply hover effect
      const menuIcon = document.querySelector(".nav-toggle");
      applyHoverEffect(menuIcon);
  
      const ctaButtons = document.querySelectorAll(".cta, .cta-white");
      ctaButtons.forEach(applyHoverEffect);
  
      const portfolioTitles = document.querySelectorAll(".portfolio-title, .portfolio-description");
      portfolioTitles.forEach(applyHoverEffect);

      const socialLinks = document.querySelector(".social-links");
      applyHoverEffect(socialLinks);

      const logo = document.querySelectorAll(".logo");
      logo.forEach(applyHoverEffect);
  });
  