document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('myImage');
    const dotContainer = document.getElementById('dot-container');
    const dotHeightPercentage = 1/3;
    const colorSelector = document.querySelectorAll('input[name="dotColor"]');
    let currentDotColor = "red";

    // Set the initial dot color
    const selectedRadioButton = document.querySelector('input[name="dotColor"]:checked');
    if (selectedRadioButton) {
        currentDotColor = selectedRadioButton.value;
    }

    // Event listener for radio button changes
    colorSelector.forEach(radio => {
      radio.addEventListener('change', (event) => {
          currentDotColor = event.target.value;
      });
    });

     // Function to handle dot deletion
    const handleDotClick = function(event) {
        event.stopPropagation(); // Prevent click from bubbling to image
        dotContainer.removeChild(event.target);
    };

    // Event listener for image clicks
    image.addEventListener('click', function(event) {
      const rect = image.getBoundingClientRect();
      const imageHeight = rect.height;
      const x = event.clientX - rect.left;
      const y = rect.top + imageHeight * dotHeightPercentage;

      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.style.left = `${x}px`;
      dot.style.top = `${y - rect.top}px`;
      dot.style.backgroundColor = currentDotColor;
      dot.addEventListener('click', handleDotClick)
      dotContainer.appendChild(dot);
    });
});