let add1point = document.querySelector("button#add1point");
let add2point = document.querySelector("button#add2point");
// let p2But = document.querySelector("button#p2But");
let resetBut = document.querySelector("button#reset");
let p1Display = document.querySelector("span#p1Score");
// let p2Display = document.querySelector("span#p2Score");
// let numInput = document.querySelector("input");// original
// let pointsNeeded = document.querySelector("span#pointsNeeded");

let p1Score = 0;
// let p2Score = 0;
// let winPoints = +numInput.value; //original
let winPoints = 10;
let gameOver = false;

add1point.addEventListener("click", function(){
    if(!gameOver){
        if(p1Score < winPoints){
            p1Score++;
            p1Display.textContent = p1Score;
            if(p1Score >= winPoints){
                p1Display.classList.add("winner");
                document.querySelector("p#winner").textContent = "Nice job!"
                gameOver = true;

            }
        }
    }
});

add2point.addEventListener("click", function(){
    if(!gameOver){
        if(p1Score < winPoints){
            p1Score+=2;
            p1Display.textContent = p1Score;
            if(p1Score >= winPoints){
                p1Display.classList.add("winner");
                document.querySelector("p#winner").textContent = "Nice job!"
                gameOver = true;
            }
        }
    }
});

// p2But.addEventListener("click", function(){
//     if(!gameOver){
//         if(p2Score < winPoints){
//             p2Score++;
//             p2Display.textContent = p2Score;
//             if(p2Score === winPoints){
//                 p2Display.classList.add("winner");
//                 document.querySelector("p#winner").textContent = "Player 2 won!"
//                 gameOver = true;
//             }
//         }
//     }
// });

resetBut.addEventListener("click", reset);

// original
// numInput.addEventListener("input", function(){
//     winPoints = +numInput.value;
//     pointsNeeded.textContent = winPoints;
//     reset();
// });

// failed
// setmyowngoal function("input"){
//     winPoints = +numInput.value;
//     pointsNeeded.textContent = winPoints;
//     reset();
// };
//
function percentprogress(){
  let x = p1Score;
  console.log(x);
  let y = winPoints;
  console.log(y);
  progress = x/y;
  document.getElementByID("demo").innerHTML=progress;
}
//
// let x = 5;
// let y = 2;
// let z = x/y;
// document.getElementById("demo").innerHTML = z;

function reset(){
    gameOver = false;
    p1Score = 0;
    // p2Score = 0;
    p1Display.textContent = p1Score;
    // p2Display.textContent = p2Score;
    // p1Display.classList.remove("winner");
    // p2Display.classList.remove("winner");
    document.querySelector("p#winner").textContent = "";
}
