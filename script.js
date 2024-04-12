// //    0 | 1 | 2     let the posibility of winning case
// //    3 | 4 | 5     0,1,2 | 0,3,6 | 0,4,8 | 1,4,7 | 
// //    6 | 7 | 8     2,5,8 | 2,4,6 | 3,4,5 | 6,7,8 |  
//                 //    TOTAL OF 8 WINNING POSSIBILITY
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // its's a O turn / X turn
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
   [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// ---------- Adding eventListener is each boxes("to perform some action")
boxes.forEach((box) => 
{
  box.addEventListener("click",()=>{
    if (turnO) {
      //playerO
      box.innerText = "O"; // turn 0
      turnO = false;         // after the O turn is complete it will not allow
    } else {
      //playerX
      box.innerText = "X"; // after O turn, X Turn willl be assign
      turnO = true;          // after X turn O turn will be asign 
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) { // if 9 times button are clicked still didn't get any Winner
      gameDraw();                   // then game Drawn
    }
  });
});
const gameDraw = ()=> {
  msg.innerText = `Loose.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
// After winner is announced the game should stop 
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = ""; // when new game start the msg box shold be black
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
//after clicking to check weather there is any winner or not
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let p1Val = boxes[pattern[0]].innerText;
    let p2Val = boxes[pattern[1]].innerText;
    let p3Val = boxes[pattern[2]].innerText;

    if (p1Val != "" && p2Val != "" && p3Val != "") {
      if (p1Val === p2Val && p2Val === p3Val) {
      // console.log(p1val); to check in console the winner "O" or "X"
        showWinner(p1Val);  //after passing value we must return true BECOZ,
        return true; // so after we know the winner it will print it      
      }
    }
  }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

