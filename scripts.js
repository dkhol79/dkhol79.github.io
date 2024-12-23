// Video Container Expansion
window.addEventListener('scroll', function () {
    const videoSection = document.querySelector('.featured-work');
    const videoContainer = document.querySelector('.video-container');
    const scrollY = window.scrollY;

    // Calculate scroll percentage (based on scroll position)
    const scrollPercent = Math.min(1, scrollY / 200); // Limit to 100% expansion

    // Adjust video container width dynamically
    const videoWidth = 90 + (scrollPercent * 10); // Starting width of 85% to 100% as you scroll

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
  const email = "khoindtran@gmail.com";
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
