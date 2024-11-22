// This is how a comment is added to JavaScript
// Comments are not executed - they are just there to provide extra
// information to you or other developers

// Exercise Time!

// 1) Create three new variables:
//    - A variable that stores the name of an online course of your choice
//    - A variable that stores the price of that course
//    - A variable that stores the three main goals that you have, when taking this course
// 2) Output ("alert") the three variable values
// 3) Try "grouping" the three variables together and still output their values thereafter
// 4) Also output the second element in your "main goals" variable
// 5) Add a custom command that does the following:
//    - Use your "main goals" variable and access an element by its identifier
//    - The concrete identifier value should be dynamic / flexible
//      (i.e. the command can be executed for different identifier)
//    - The "main goals" variable should also be dynamic: The command should work
//      with ANY list of values
//    - The custom command should provide the accessed value (i.e. the list element)
// 6) Execute your custom command from (5) and output ("alert") the result

const test = (e) => {
  return 3 + e;
};

console.log(test(10));

console.log(10 % 3);
console.log(10 / 4);

const namelen = "shkim";
console.log(namelen.length);
console.log(namelen.toUpperCase());

// console.log(window);
console.dir(document);

const hl = document.querySelector("p");

let s = 1;
const clicked = () => {
  hl.textContent = `clicked [${s}] time`;
  console.log("clicked!");
  s += 1;
};

hl.addEventListener("click", clicked);

const NewAnchor = document.createElement("p");
const texted = document.querySelector(".input_any");
const cnt = document.querySelector(".count_character");
const remaining = document.querySelector(".remain_chars");

const copy_text = () => {
  let text_value = event.target.value.length;
  if (text_value > 0 && text_value <= 10) {
    remaining.style.color = "green";
  } else if (text_value == 20) {
    remaining.style.color = "red";
  } else if (text_value > 10) {
    remaining.style.color = "pink";
  } else remaining.style.color = "black";

  remaining.textContent = `${20 - text_value}`;
};

texted.addEventListener("input", copy_text);
cnt.classList.add("warning");
// cnt.classList.remove("warning");
////////   styling   ////////

const fruits = ["apple", "melon", "berry"];
const profile = {
  name: "sh",
  age: 44,
  sex: "male",
};

for (const fruit of fruits) {
  console.log(fruit);
}

for (const property in profile) {
  // console.log(property);
  console.log(`${property} is ${profile[property]}`);
}

let isenough = false;
let ss = 1;

while (!isenough) {
  isenough = confirm("Do you want to quit?");
  console.log(`question No.${ss}`);
  ss += 1;
}
console.log("Done!");
