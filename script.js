let sourceBox;
let lastSwap;
let arr = [];
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  sourceBox = ev.target;
  ev.target.style.opacity = "0.4";
}

function drop(ev) {
  ev.preventDefault();
  let targetBox = ev.target;
  lastSwap = [sourceBox, targetBox];
  arr.push(lastSwap);
  let tempContent = sourceBox.innerHTML;
  let tempColor = sourceBox.style.backgroundColor;
  sourceBox.innerHTML = targetBox.innerHTML;
  sourceBox.style.backgroundColor = targetBox.style.backgroundColor;
  targetBox.innerHTML = tempContent;
  targetBox.style.backgroundColor = tempColor;

  let sourceRect = sourceBox.getBoundingClientRect();
  let targetRect = targetBox.getBoundingClientRect();
  let deltaX = targetRect.left - sourceRect.left;
  let deltaY = targetRect.top - sourceRect.top;
  let animation = sourceBox.animate([
    { transform: `translate(${deltaX}px, ${deltaY}px)` },
    { transform: "none" }
  ], {
    duration: 700,
    easing: "ease-out"
  });

  animation.onfinish = () => {
    sourceBox.style.opacity = "1.0";
  };
}

let boxes = document.querySelectorAll(".box");
for (let i = 0; i < boxes.length; i++) {
  let box = boxes[i];
  box.setAttribute("draggable", true);
  box.addEventListener("dragstart", drag);
  box.addEventListener("dragover", allowDrop);
  box.addEventListener("drop", drop);
}


function undoSwap() {
  if (arr.length>0) {
    let targetBox = arr[arr.length - 1][0];
    let sourceBox = arr[arr.length - 1][1];
    arr.pop();
    sourceBox.style.opacity = "0.4";
    lastSwap = null;
    let tempContent = sourceBox.innerHTML;
    let tempColor = sourceBox.style.backgroundColor;
    sourceBox.innerHTML = targetBox.innerHTML;
    sourceBox.style.backgroundColor = targetBox.style.backgroundColor;
    targetBox.innerHTML = tempContent;
    targetBox.style.backgroundColor = tempColor;

    let sourceRect = sourceBox.getBoundingClientRect();
    let targetRect = targetBox.getBoundingClientRect();
    let deltaX = targetRect.left - sourceRect.left;
    let deltaY = targetRect.top - sourceRect.top;
    let animation = sourceBox.animate([
      { transform: `translate(${deltaX}px, ${deltaY}px)` },
      { transform: "none" }
    ], {
      duration: 700,
      easing: "ease-out"
    });

    animation.onfinish = () => {
      sourceBox.style.opacity = "1.0";
    };
  }
}

