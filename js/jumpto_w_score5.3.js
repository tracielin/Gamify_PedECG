const rightAnswerBtn = document.getElementById('rightAnswerBtn');
const wrongAnswerBtn = document.getElementById('wrongAnswerBtn');
const confidenceLow = document.getElementById('confidenceLow');
const confidenceHigh = document.getElementById('confidenceHigh');
const submitAnswerBtn = document.getElementById('submitAnswerBtn');
const errorMessage = document.getElementById('errorMessage');
let selectedAnswer = null;

//Dialogs
const dialogRightUnsure = document.getElementById('dialogRightUnsure');
const dialogRightConfident = document.getElementById('dialogRightConfident');
const dialogWrongUnsure = document.getElementById('dialogWrongUnsure');
const dialogWrongConfident = document.getElementById('dialogWrongConfident');

//Continue buttons
const continueRightUnsureBtn = document.getElementById('continueRightUnsure');
const continueRightConfidentBtn = document.getElementById('continueRightConfident');
const continueWrongUnsureBtn = document.getElementById('continueWrongUnsure');
const continueWrongConfidentBtn = document.getElementById('continueWrongConfident');


// Function to enable/disable submit button
function updateSubmitButtonState() {
    if (selectedAnswer !== null && (confidenceLow.checked || confidenceHigh.checked)) {
        submitAnswerBtn.disabled = false;
        submitAnswerBtn.style.backgroundColor = ''; // Revert to default or your chosen color
        submitAnswerBtn.style.cursor = 'pointer';
    } else {
        submitAnswerBtn.disabled = true;
        submitAnswerBtn.style.backgroundColor = 'gray';
        submitAnswerBtn.style.cursor = 'not-allowed';
    }
}

// Function to clear button highlights
function clearButtonHighlights() {
    rightAnswerBtn.classList.remove('selected');
    wrongAnswerBtn.classList.remove('selected');
}

// Answer button click handlers
rightAnswerBtn.addEventListener('click', () => {
    selectedAnswer = true;
    clearButtonHighlights();
    rightAnswerBtn.classList.add('selected');
    updateSubmitButtonState();
});

wrongAnswerBtn.addEventListener('click', () => {
    selectedAnswer = false;
    clearButtonHighlights();
    wrongAnswerBtn.classList.add('selected');
    updateSubmitButtonState();
});

// Confidence radio button handlers
confidenceLow.addEventListener('change', updateSubmitButtonState);
confidenceHigh.addEventListener('change', updateSubmitButtonState);

// Submit button click handler
submitAnswerBtn.addEventListener('click', () => {
    if (selectedAnswer === null || (!confidenceLow.checked && !confidenceHigh.checked)) {
        errorMessage.textContent = "Oops, you need to choose both an answer and confidence level to proceed.";
        return; // Stop execution
    } else {
        errorMessage.textContent = ""; // Clear any previous error message
    }

    // Proceed with answer submission, but now just show the dialog
    const confidenceLevel = document.querySelector('input[name="confidence"]:checked').value;

    if (selectedAnswer) {
        if (confidenceLevel === "low") {
            dialogRightUnsure.showModal();
        } else {
            dialogRightConfident.showModal();
        }
    } else {
        if (confidenceLevel === "low") {
            dialogWrongUnsure.showModal();
        } else {
            dialogWrongConfident.showModal();
        }
    }
});

// event function of button onclick
function scrollInto(id) {
    var elmnt = document.getElementById(id);
    if (elmnt) {
        elmnt.scrollIntoView({
            behavior: "instant",
            block: "start",
            inline: "nearest"
        });
    } else {
        console.warn(`Element with id "${id}" not found.`);
    }
}

// score board
const bar = document.querySelector("#bar");
const percentageTag = document.querySelector("#percentage");
const totalTag = document.querySelector("#num1");
const solvedTag = document.querySelector("#num2");
const total = 6;
var total_minus1 = total - 1;
let solved = 0;
let met = 0;
let percentage = 0;

const ruleOfThree = (total, solved) => {
    const proportion = (solved * 100) / total;
    return Math.round(proportion * 10) / 10;
};

const updateBarLength = () => {
    const percentage = ruleOfThree(total, solved);
    bar.style.width = percentage + "%";
};

const updateText = () => {
    const percentage = ruleOfThree(total, solved);
    document.querySelector("#percentage").textContent = percentage + "%";
};

const updateMetText = () => {
    document.querySelector("#met-score").textContent = met;
}

function backgroundcolor_win() {
    bar.style.background = 'linear-gradient(white, green 90%, white)';
};


// Add event listeners to continue buttons

continueRightUnsureBtn.addEventListener('click', () => {
    dialogRightUnsure.close();
    scrollInto("ans_right_unsure");
    solved = Math.min(solved + 1, total);
    updateScore();
    resetQuestion();
});

continueRightConfidentBtn.addEventListener('click', () => {
    dialogRightConfident.close();
    scrollInto("ans_right_confid");
    solved = Math.min(solved + 2, total);
    updateScore();
    resetQuestion();
});

continueWrongUnsureBtn.addEventListener('click', () => {
    dialogWrongUnsure.close();
    scrollInto("ans_wrong_unsure");
    updateScore();
    resetQuestion();
});

continueWrongConfidentBtn.addEventListener('click', () => {
    dialogWrongConfident.close();
    scrollInto("ans_wrong_confid");
    solved = Math.max(solved - 2, 0);
    updateScore();
    resetQuestion();
});

function updateScore() {
    met = met+1.5;
    updateMetText();
    solved = Math.max(0, Math.min(solved, total));
    updateBarLength();
    updateText();

    if (solved >= total) {
        backgroundcolor_win();
    } else {
        bar.style.background = 'linear-gradient(white, purple 90%, rebeccapurple)'; //reset win color
    }

    totalTag.textContent = total; // Updates the display of the Total number
    solvedTag.textContent = solved; // Updates the display of the Solved number
}

function resetQuestion() {
    clearButtonHighlights();
    confidenceLow.checked = false;
    confidenceHigh.checked = false;
    selectedAnswer = null;
    updateSubmitButtonState();
}

totalTag.textContent = total;
solvedTag.textContent = solved;
percentageTag.textContent = ruleOfThree(total, solved) + "%";
updateMetText();