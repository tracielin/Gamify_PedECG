const marker = document.getElementById('marker');
const hoverLine = document.getElementById('hover-line');
const predefinedLocations = document.querySelectorAll('.predefined-location');

let currentHoverIndex = null;

marker.addEventListener('dragstart', () => {
  marker.style.opacity = '0.5';
});

marker.addEventListener('dragend', () => {
  marker.style.opacity = '1';
  hoverLine.style.display = 'none';

  if (currentHoverIndex !== null) {
    const targetLocation = predefinedLocations[currentHoverIndex];
    const targetRect = targetLocation.getBoundingClientRect();
    const containerRect = targetLocation.parentElement.getBoundingClientRect();

    // Center the marker at the predefined location
    marker.style.left = `${targetRect.left - containerRect.left + targetRect.width / 2}px`;
    marker.style.top = `${targetRect.top - containerRect.top + targetRect.height / 2}px`;
    currentHoverIndex = null;
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
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

    // Align hover line with the center of the closest predefined location
    hoverLine.style.left = `${closestRect.left - containerRect.left + closestRect.width / 2}px`;
    hoverLine.style.display = 'block';
    currentHoverIndex = closestIndex;
  } else {
    hoverLine.style.display = 'none';
    currentHoverIndex = null;
  }
});
