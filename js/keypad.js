/*	Takes different actions based on buttons pushed and checks for the correct
 *	length and password entered
 */

// Required password
var password = [2, 3, 6, 'enter'];
// What the user has entered
var entered = [];

/* Checks to see if the entered password is the correct length
 * and if each button pushed matches the password
 */
function isCorrect() {
	if (password.length !== entered.length) {
		return false;
	}

	for (var i = 0; i < password.length; i++) {
		if (entered[i] !== password[i]) {
			return false;
		}
	}
	return true;
}

/* Event Listener on page load
 */
window.addEventListener('load', function() {
	// Gets the element IDs of the screen, hash button, and asterisk button
	var screen = document.getElementById('screen');
	var hash = document.getElementById('button-hash');
	var ast = document.getElementById('button-ast');

	// Event listener for when # is clicked
	// This should be the last button clicked
	hash.addEventListener('click', function() {
		// Adds # to the screen and pushes to the entered array
		screen.textContent += 'enter';
		entered.push('enter');

		// See if entered password matches, adds the CSS success tag,
		// and changes the screen message to "success"
		if (isCorrect()) {
			screen.classList.add('success');
			screen.textContent = 'success';
			var x = document.getElementById("myDIV");
     if (x.style.display === "block") {
    x.style.display = "none";
     } else {
      x.style.display = "block";
  }
		}

		else{
			screen.classList.add('try_again');
			screen.textContent = 'try_again';
		}
	});

	// Event listener for when * is clicked
	ast.addEventListener('click', function() {
		// Resets the screen to blank, and resets the entered array to empty
		screen.textContent = '';
		entered.length = 0;
	});

	// Helper loop for the bind() function to keep hold of the iterator
	// For buttons 0-9
	// Used http://stackoverflow.com/questions/8909652/adding-click-event-listeners-in-loop for the following
	for (var t = 0; t < 10; t++) {
		bind(t);
	}

	// Helper function to create and keep each instance of the buttons
	// Used for buttons 0-9
	function bind(t) {
		var button = document.getElementById('button-' + t);
		button.addEventListener('click', function() {
			// Adds the number to the screen and pushes it to the entered array
			screen.textContent += t;
			entered.push(t);
		});
	}
});
