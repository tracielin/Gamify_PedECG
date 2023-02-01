const bar = document.querySelector(".bar");
const percentageTag = document.querySelector(".percentage");
const totalTag = document.querySelector("#num1");
const solvedTag = document.querySelector("#num2");
const addBtn = document.querySelector("#add");
const add2Btn = document.querySelector("#add2");
const subBtn = document.querySelector("#sub");
const sub2Btn = document.querySelector("#sub2");
const total = 6;
var total_minus1= total-1;
let solved = 0;

const ruleOfThree = (total, solved) => {
  const proportion = (solved * 100) / total;
  return Math.round(proportion * 10) / 10;
};

const updateBarLength = () => {
  const percentage = ruleOfThree(total, solved);
  bar.style.width = percentage + "%";
};

const updateText = () => {
  solvedTag.textContent = solved;
  percentageTag.textContent = ruleOfThree(total, solved) + "%";
};

function backgroundcolor_win(){
  document.body.style.backgroundColor="green";
}

addBtn.onclick = () => {
  if (solved < total) {
    solved++;
    updateBarLength();
    updateText();
    if (solved==total){
      backgroundcolor_win();
    }
  }
};

add2Btn.onclick = () => {
  if (solved < total_minus1) {
    solved= solved+2;
    updateBarLength();
    updateText();
    if (solved==total){
      backgroundcolor_win();
    }
  } else if (solved == total_minus1){
    solved = solved+1;
    updateBarLength();
    updateText();
    if (solved==total){
      backgroundcolor_win();
    }
  }
};

subBtn.onclick = () => {
  if (solved > 0) {
    solved--;
    updateBarLength();
    updateText();
  }
};
sub2Btn.onclick = () => {
  if (solved > 1) {
    solved = solved - 2;
    updateBarLength();
    updateText();
  } else if(solved<=1){
    solved = 0;
    updateBarLength();
    updateText();
  }
};

totalTag.textContent = total;
solvedTag.textContent = solved;
percentageTag.textContent = ruleOfThree(total, solved) + "%";
