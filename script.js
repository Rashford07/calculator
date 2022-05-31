"use strict";
const btn = document.querySelectorAll(".btn");
const wrapper = document.querySelector(".wrapper");
const screen = document.querySelector(".display--input");
const ansDisplay = document.querySelector(".display--read-only");
const answerBtn = document.querySelector(".enter");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const lastAnsBtn = document.querySelector(".ans");
let result;
let expArray;
let lastAns;
///////////////////////////////////////////////////////

// Implementing each click
wrapper.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    const clicked = e.target.textContent;
    screen.value += clicked;
  }
});

// Implementing Enter Btn
answerBtn.addEventListener("click", (e) => {
  if (screen.value) {
    expArray = [...screen.value];
    ansDisplay.textContent = screen.value;

    // Checking for special cases
    expArray.forEach((item, i) => {
      if (item === "x") {
        expArray[i] = "*";
      } else if (item === "%") {
        expArray[i] = `${expArray[i - 1] * 0.01}`;
        expArray.splice(i - 1, 1);
      } else if (item === "^") {
        expArray[i + 1] = `${expArray[i - 1] ** expArray[i + 1]}`;
        expArray.splice(i - 1, 2);
      } else if (item === "a") {
        expArray[i] = lastAns;
        expArray.splice(i + 1, 2);
      }
    });
    console.log(expArray);
    screen.value = expArray.join("");

    // Calculation
    result = Function(`
      return ${screen.value}
      `)();
    lastAns = result;
    if (result) {
      screen.value = result;
    } else {
      screen.value = `Commot body jhor!🤣`;
    }
    // screen.value = result;
  }
});

// Implementing Clear Btn
clearBtn.addEventListener("click", function (e) {
  ansDisplay.textContent = "";
  screen.value = "";
});

// Implementing Del Btn
delBtn.addEventListener("click", function (e) {
  /* expArray = [...screen.value];
  if (expArray[-1] === "s") {
    expArray.splice(-1, 3);
  }
  expArray.pop();
  screen.value = expArray.join(""); */
  const index = screen.value.lastIndexOf("") - 1;
  if (screen.value[index] === "s") {
    // screen.value = screen.value.replace("ans", "");
    console.log(7);
    screen.value = screen.value.slice(0, -3);
  } else {
    // screen.value = screen.value.substring(0, screen.value.lastIndexOf("") - 1);
    screen.value = screen.value.slice(0, -1);
  }
});

// implementing Some Animation Effects
wrapper.addEventListener("click", function (e) {
  // const button = document.querySelector(".btn");
  // console.log(e.target);
  // console.log(btn);

  if (
    e.target.classList.contains("btn") ||
    e.target === clearBtn ||
    e.target === answerBtn ||
    e.target === delBtn
  ) {
    e.target.classList.add("pressed");
    setTimeout(() => {
      e.target.classList.remove("pressed");
    }, 200);
  }
});
