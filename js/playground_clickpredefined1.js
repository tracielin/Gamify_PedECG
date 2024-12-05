const hoverLine = document.getElementById('hover-line');
const predefinedLocations = document.querySelectorAll('.predefined-location');
const container = document.querySelector('.container');
let redDots = [];  // Array to store the created red dots
const maxRedDots = 20;  // Maximum number of red dots allowed

// Listen for mouse move events on the container to show the hover line
container.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  
  // Find the closest predefined location
  let closestIndex = null;
  let minDistance = Infinity;

  predefinedLocations.forEach((location, index) => {
    const locationRect = location.getBoundingClientRect();
    const distance = Math.abs(mouseX - (locationRect.left + locationRect.width / 2));
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  if (closestIndex !== null) {
    const closestLocation = predefinedLocations[closestIndex];
    const closestRect = closestLocation.getBoundingClientRect();
    const containerRect = closestLocation.parentElement.getBoundingClientRect();

    // Show and position the hover line at the center of the closest predefined location
    hoverLine.style.left = `${closestRect.left - containerRect.left + closestRect.width / 2 - 1}px`; // Adjust for hover line width
    hoverLine.style.display = 'block';
  } else {
    hoverLine.style.display = 'none';
  }
});

// Listen for click events on the container to drop or remove the red dot
container.addEventListener('click', (e) => {
  const mouseX = e.clientX;

  // Find the closest predefined location
  let closestIndex = null;
  let minDistance = Infinity;

  predefinedLocations.forEach((location, index) => {
    const locationRect = location.getBoundingClientRect();
    const distance = Math.abs(mouseX - (locationRect.left + locationRect.width / 2));
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  if (closestIndex !== null) {
    const closestLocation = predefinedLocations[closestIndex];
    const closestRect = closestLocation.getBoundingClientRect();
    const containerRect = closestLocation.parentElement.getBoundingClientRect();

    // Check if there's already a red dot at this position
    const existingDotIndex = redDots.findIndex(dot => {
      const dotRect = dot.getBoundingClientRect();
      const dotX = dotRect.left + dotRect.width / 2;
      const dotY = dotRect.top + dotRect.height / 2;
      const locationX = closestRect.left + closestRect.width / 2;
      const locationY = closestRect.top + closestRect.height / 2 + 20; // 20px below the line
      return Math.abs(dotX - locationX) < 5 && Math.abs(dotY - locationY) < 5;
    });

    if (existingDotIndex !== -1) {
      // Remove the existing red dot if found
      const dotToRemove = redDots[existingDotIndex];
      container.removeChild(dotToRemove);
      redDots.splice(existingDotIndex, 1);  // Remove the dot from the array
    } else if (redDots.length < maxRedDots) {
      // Create a new red dot and position it 20px below the center of the closest predefined location
      const newRedDot = document.createElement('div');
      newRedDot.classList.add('red-dot');
      newRedDot.style.left = `${closestRect.left - containerRect.left + closestRect.width / 2 - 5}px`; // Center the dot horizontally
      newRedDot.style.top = `${closestRect.top - containerRect.top + closestRect.height / 2 + 120 - 5}px`;  // Position the dot 20px below the line

      // Add the new red dot to the container and the redDots array
      container.appendChild(newRedDot);
      redDots.push(newRedDot);
    }
  }
});
