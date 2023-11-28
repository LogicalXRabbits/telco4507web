// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  // Get all the navigation items
  const navItems = document.querySelectorAll('.item');

  // Get the underline element
  const underline = document.querySelector('.underline');

  // Function to update the width of the underline based on the active nav item
  function updateUnderlineWidth() {
    // Get the width of the active nav item
    const activeItemWidth = document.querySelector('.item.active').offsetWidth;

    // Set the width of the underline to match the active nav item's width
    underline.style.width = `${activeItemWidth}px`;
  }

  // Add click event listeners to each nav item
  navItems.forEach(function (item) {
    item.addEventListener('click', function () {
      // Remove the 'active' class from all nav items
      navItems.forEach(function (navItem) {
        navItem.classList.remove('active');
      });

      // Add the 'active' class to the clicked nav item
      item.classList.add('active');

      // Update the width of the underline
      updateUnderlineWidth();
    });
  });

  // Update the width of the underline initially
  updateUnderlineWidth();
});
