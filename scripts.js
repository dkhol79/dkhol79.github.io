// Video Container Expansion
window.addEventListener('scroll', function () {
    const videoSection = document.querySelector('.featured-work');
    const videoContainer = document.querySelector('.video-container');
    const scrollY = window.scrollY;

    // Calculate scroll percentage (based on scroll position)
    const scrollPercent = Math.min(1, scrollY / 200); // Limit to 100% expansion

    // Adjust video container width dynamically
    const videoWidth = 90 + (scrollPercent * 10); // Starting width of 85% to 100% as scroll

    // Apply the new width to the video container
    videoContainer.style.width = `${videoWidth}%`;

    // Add scroll class to trigger full expansion (this could be adjusted based on scroll)
    if (scrollY > 50) {
        videoSection.classList.add('scrolled');
    } else {
        videoSection.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const contentSection = document.querySelector('.content');

  window.addEventListener('scroll', function () {
      const contentRect = contentSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if the majority of the content is within the viewport
      const isVisible =
          contentRect.top < viewportHeight * 0.8 && // Top edge is within 80% of the viewport
          contentRect.bottom > viewportHeight * 0.2; // Bottom edge is within 20% of the viewport

      if (isVisible) {
          contentSection.classList.add('visible');
      } else {
          contentSection.classList.remove('visible');
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
      document.body.classList.add("hide-cursor");
  }
});


// Portfolio Item Animation
document.addEventListener("DOMContentLoaded", () => {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    const onScroll = () => {
        portfolioItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                item.classList.add("visible");
            }
        });
    };

    // Trigger the animation on scroll
    window.addEventListener("scroll", onScroll);

    // Initial check in case some items are already in view
    onScroll();
});

// Menu Toggle
document.querySelector('.nav-toggle').addEventListener('click', function () {
  document.querySelector('nav').classList.toggle('active');
});
document.getElementById("copyEmailButton").addEventListener("click", function() {
  // Copy the email to the clipboard
  const email = "khoidntran@gmail.com";
  navigator.clipboard.writeText(email).then(function() {
    // Change the button text to 'Email Copied'
    const button = document.getElementById("copyEmailButton");
    button.innerHTML = "Email Copied" + button.querySelector(".arrow-container").outerHTML;

    // After 3 seconds, revert the button text back to 'Copy Email'
    setTimeout(function() {
      button.innerHTML = "Copy Email" + button.querySelector(".arrow-container").outerHTML;
    }, 3000);
  }).catch(function(err) {
    console.error("Could not copy text: ", err);
  });
});

// About me animation
document.addEventListener("DOMContentLoaded", function () {
  const titles = [
      ["Brand", "Designer"],
      ["UX/UI", "Designer"],
      ["Visual", "Designer"],
      ["Typeface", "Collector"]
  ];

  let index = 0;

  function animateLetters(parent, word, isNewText = true, delay = 0) {
      if (isNewText) {
          parent.innerHTML = ""; // Clear existing letters

          // Animate letters coming in with a delay
          word.split("").forEach((letter, i) => {
              const span = document.createElement("span");
              span.textContent = letter;
              span.classList.add("gradient-text");
              parent.appendChild(span);

              // Staggered delay for each letter with transition
              span.style.transition = `transform 1s ease-out, opacity 0.6s ease-out`;
              setTimeout(() => {
                  span.style.transform = "translateY(0)";
                  span.style.opacity = "1";
              }, i * 80 + delay); // Apply delay to the second line
          });
      } else {
          // Animate letters going out before new ones come in
          const currentSpans = parent.querySelectorAll("span");
          currentSpans.forEach((span, i) => {
              span.style.transition = `transform 1s ease-in-out, opacity 0.6s ease-in-out`;
              setTimeout(() => {
                  span.style.transform = "translateY(100%)"; // Pull up
                  span.style.opacity = "0";
              }, i * 80); // Each letter disappears 80ms apart
          });
      }
  }

  function updateText() {
      const [newTop, newBottom] = titles[index];

      // Animate current text going out
      animateLetters(document.getElementById("top-line"), "", false);
      animateLetters(document.getElementById("bottom-line"), "", false);

      // Wait for the letters to go out before animating new text
      setTimeout(() => {
          animateLetters(document.getElementById("top-line"), newTop, true);

          // Apply a slight delay (300ms) before animating the second line
          animateLetters(document.getElementById("bottom-line"), newBottom, true, 300);
      }, 800); // Wait for 800ms for top line to disappear before starting the animation
      index = (index + 1) % titles.length;
  }

  // Initialize with first title
  updateText();

  // Rotate every 4 seconds
  setInterval(updateText, 4000);
});

