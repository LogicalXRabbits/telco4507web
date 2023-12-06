document.addEventListener("DOMContentLoaded", function () {
  // Show the loader when the DOM is fully loaded
  document.getElementById("loader").style.display = "block";

  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Hide the loader with a small delay when the page is fully loaded
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, 1000); // Adjust the delay time as needed
});
