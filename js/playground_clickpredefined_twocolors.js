const hoverLine = document.getElementById('hover-line');
const predefinedLocations = document.querySelectorAll('.predefined-location');
const container = document.querySelector('.container');
let redArrows = [];  // Array to store the created red arrows
let purpleArrows = [];  // Array to store the created purple arrows
let currentMarker = 'red';  // Default to red arrow
const maxRedArrows = 20;  // Maximum number of red arrows allowed
const maxPurpleArrows = 20;  // Maximum number of purple arrows allowed

// Switch to red marker (Arrow 1)
document.getElementById('red-marker').addEventListener('click', () => {
  currentMarker = 'red';
  document.getElementById('red-marker').style.border = '2px solid black';
  document.getElementById('purple-marker').style.border = '1px solid #ccc';
  document.getElementById('eraser').style.border = '1px solid #ccc';
});

// Switch to purple marker (Arrow 2)
document.getElementById('purple-marker').addEventListener('click', () => {
  currentMarker = 'purple';
  document.getElementById('purple-marker').style.border = '2px solid black';
  document.getElementById('red-marker').style.border = '1px solid #ccc';
  document.getElementById('eraser').style.border = '1px solid #ccc';
});

// Switch to eraser (Marker 3)
document.getElementById('eraser').addEventListener('click', () => {
  currentMarker = 'eraser';
  document.getElementById('eraser').style.border = '2px solid black';
  document.getElementById('red-marker').style.border = '1px solid #ccc';
  document.getElementById('purple-marker').style.border = '1px solid #ccc';
});

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

// Listen for click events on the container to place or remove the arrow
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

    // If the current marker is the eraser, remove the closest arrow (red or purple)
    if (currentMarker === 'eraser') {
      let arrowToRemove = null;
      let arrowsArray = [...redArrows, ...purpleArrows];

      arrowsArray.forEach((arrow) => {
        const arrowRect = arrow.getBoundingClientRect();
        const arrowX = arrowRect.left + arrowRect.width / 2;
        const arrowY = arrowRect.top + arrowRect.height / 2;
        const locationX = closestRect.left + closestRect.width / 2;
        const locationY = closestRect.top + closestRect.height / 2 + 20; // 20px below the line

        // Check if the arrow is close enough to the target position
        if (Math.abs(arrowX - locationX) < 10 && Math.abs(arrowY - locationY) < 10) {
          arrowToRemove = arrow;
        }
      });

      if (arrowToRemove) {
        container.removeChild(arrowToRemove);
        if (redArrows.includes(arrowToRemove)) {
          redArrows.splice(redArrows.indexOf(arrowToRemove), 1);
        } else if (purpleArrows.includes(arrowToRemove)) {
          purpleArrows.splice(purpleArrows.indexOf(arrowToRemove), 1);
        }
      }
    } else {
      // Otherwise, add a new arrow (red or purple)
      let arrowsArray = currentMarker === 'red' ? redArrows : purpleArrows;
      if (arrowsArray.length < (currentMarker === 'red' ? maxRedArrows : maxPurpleArrows)) {
        const newArrow = document.createElement('div');
        newArrow.classList.add('arrow', currentMarker === 'red' ? 'red-arrow' : 'purple-arrow');
        newArrow.style.left = `${closestRect.left - containerRect.left + closestRect.width / 2 - 5}px`; // Center the arrow horizontally
        newArrow.style.top = `${closestRect.top - containerRect.top + closestRect.height / 2 + 20 - 5}px`;  // Position the arrow 20px below the line

        // Add the new arrow to the container and the appropriate array (red or purple)
        container.appendChild(newArrow);
        arrowsArray.push(newArrow);
      }
    }
  }
});
