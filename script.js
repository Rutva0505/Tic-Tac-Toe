let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let winContainer = document.querySelector(".win-container");
let msg = document.querySelector("#msg");
let boxContainer = document.querySelector(".container");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    winContainer.classList.add("hide");
    boxContainer.classList.remove("hide");
    resetBtn.classList.remove("hide");

};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
    
        if(turnO){
            box.innerText = "0";
            box.style.color = "#F18805";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "#0E1428";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        checkDraw();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true; 
    }
};
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false; 
        box.innerText="";
    }
};
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    winContainer.classList.remove("hide");
    boxContainer.classList.add("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
};

const checkWinner= () => {
    for(let pattern of winPatterns){
       
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !="" && pos2 !="" && pos3 !=""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("Winner",pos1);
                showWinner(pos1);
            }
        }
    }
};

const checkDraw = () => {
    let filledBoxes = 0;

    boxes.forEach(box => {
        if (box.innerText !== "") {
            filledBoxes++;
        }
    });

    if (filledBoxes === 9 && winContainer.classList.contains("hide")) {
        msg.innerText = "It's a Draw!";
        winContainer.classList.remove("hide");
        boxContainer.classList.add("hide");
        resetBtn.classList.add("hide");
    }
};
newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);