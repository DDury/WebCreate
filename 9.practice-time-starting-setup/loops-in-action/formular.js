//////////////  sum total ///////////////

const CalSum = document.querySelector(".calsum");
const InputNum = document.querySelector("#user-number");
const output = document.querySelector("#calculated-sum");

const CalTotal = (n) => {
  let x = n;
  let t = 0;
  while (x > 0) {
    t = t + x;
    x -= 1;
  }
  return t;
};

const ShowTotal = () => {
  console.log(CalTotal(Number(InputNum.value)));
  output.textContent = CalTotal(Number(InputNum.value));
  output.style.display = "flex";
};

CalSum.addEventListener("click", ShowTotal);

////////////// highlight links /////////////////
const highlight = document.querySelector(".Highlight");
const LinkPara = document.querySelectorAll("#highlight-links a");
let light = false;
const Ahighlight = () => {
  if (!light) {
    for (const link of LinkPara) {
      link.classList.add("turnBlue");
    }
    light = true;
  } else {
    for (const link of LinkPara) {
      link.classList.remove("turnBlue");
    }
    light = false;
  }
};
highlight.addEventListener("click", Ahighlight);

////////////// my information //////////////////////

let show = false;
const myinfo = document.querySelector("#output-user-data");
const infobtn = document.querySelector(".infoBtn");

const showhide = () => {
  if (!show) {
    myinfo.classList.remove("hidden");
    show = true;
  } else {
    myinfo.classList.add("hidden");
    show = false;
  }
};

infobtn.addEventListener("click", showhide);

/////////////// statistics ///////////////////

const RandNum = () => {
  return Math.floor(Math.random() * 6 + 1);
};

const targetNum = document.querySelector("#user-target-number");
const diceBtn = document.querySelector(".roll");
const tryNum = document.querySelector("#output-total-rolls");
const finNum = document.querySelector("#output-target-number");
const bulletin = document.querySelector("#dice-rolls");
const dice_result = document.createElement("li");
let s = 1;

const guessNum = () => {
  let x = RandNum();
  tryNum.textContent = "X";
  finNum.textContent = "Y";
  console.log(x);
  dice_result.textContent = `Dice is ${x} - You roll [${s}]times`;
  bulletin.append(dice_result);
  if (x == Number(targetNum.value)) {
    tryNum.textContent = s;
    finNum.textContent = targetNum.value;
    s = 0;
  }
  s++;
};

diceBtn.addEventListener("click", guessNum);
