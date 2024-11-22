const P1Btn = document.querySelector(".p1 button");
const P2Btn = document.querySelector(".p2 button");
const srBtn = document.querySelector(".start");

const player1 = () => {
  const p1name = prompt("input your name");
  const p1symbol = prompt("input your symbol");
  document.querySelector(`.p${1} .name`).textContent = p1name;
  document.querySelector(`.p${1} .symbol`).textContent = p1symbol;
};

const player2 = () => {
  const p1name = prompt("input your name");
  const p1symbol = prompt("input your symbol");
  document.querySelector(`.p${2} .name`).textContent = p1name;
  document.querySelector(`.p${2} .symbol`).textContent = p1symbol;
};

P1Btn.addEventListener("click", player1);
P2Btn.addEventListener("click", player2);

const p1 = document.querySelector(`.p${1} .symbol`).textContent;
const p2 = document.querySelector(`.p${2} .symbol`).textContent;

//////// reset logic /////////
const reset = () => {
  let p1turn = true;
  document.querySelector(".p1").classList.add("highlight");
  document.querySelector(".p2").classList.remove("highlight");
  let s = 1;
  let p1win = false;
  let p2win = false;

  ///////// winning logic /////////
  const wincheck = (a, b, c) => {
    if (
      ((document.querySelector(`.box${a}`).textContent == p1 &&
        document.querySelector(`.box${b}`).textContent) == p1 &&
        document.querySelector(`.box${c}`).textContent) == p1
    ) {
      alert("p1 win!!!");
    } else if (
      ((document.querySelector(`.box${a}`).textContent == p2 &&
        document.querySelector(`.box${b}`).textContent) == p2 &&
        document.querySelector(`.box${c}`).textContent) == p2
    ) {
      alert("p2 win!!!");
    }
  };
  const checklist = ([1, 2, 3], [4, 5, 6], [7, 8, 9]);
  const doublecheck = () => {
    wincheck(1, 2, 3);
    wincheck(4, 5, 6);
    wincheck(7, 8, 9);
    wincheck(1, 4, 7);
    wincheck(2, 5, 8);
    wincheck(3, 6, 9);
    wincheck(1, 5, 9);
    wincheck(3, 5, 7);
  };

  /////// input logic /////////
  const inputNum = () => {
    if (p1turn) {
      event.target.textContent = p1;
      p1turn = false;
      document.querySelector(".p1").classList.remove("highlight");
      document.querySelector(".p2").classList.add("highlight");
    } else {
      event.target.textContent = p2;
      p1turn = true;
      document.querySelector(".p2").classList.remove("highlight");
      document.querySelector(".p1").classList.add("highlight");
    }
    doublecheck();
  };

  /////// checkbox logic ////////
  const box = document.querySelectorAll("ul li");
  for (const checkbox of box) {
    checkbox.textContent = "";
    checkbox.classList.add(`box${s}`);
    document.querySelector(`.box${s}`).addEventListener("click", inputNum);
    s += 1;
  }
};

srBtn.addEventListener("click", reset);

const test = [
  [1, 2],
  [3, 4],
];
console.log(test[0]);

const test1 = (a, b) => {
  console.log(a);
  console.log(b);
};

const doubletest = (a, b) => {
  test1(a);
  test1(b);
};

const teex = ([1, 2], [3, 4]);
doubletest((1, 1), 2);
