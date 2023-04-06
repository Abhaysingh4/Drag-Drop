let sourceBox;
let lastSwap;
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  sourceBox = ev.target;
  console.log(ev);
  ev.dataTransfer.setData("text", ev.target.id);
  ev.target.style.opacity = "0.4";
}

function drop(ev) {
  ev.preventDefault();
  let targetBox = ev.target;
  lastSwap = [sourceBox, targetBox];
  
  let tempContent = sourceBox.innerHTML;
  let tempColor = sourceBox.style.backgroundColor;
  sourceBox.innerHTML = targetBox.innerHTML;
  sourceBox.style.backgroundColor = targetBox.style.backgroundColor;
  targetBox.innerHTML = tempContent;
  targetBox.style.backgroundColor = tempColor;
  sourceBox.style.opacity = "1.0";
}

let boxes = document.querySelectorAll(".box");
for (let i = 0; i < boxes.length; i++) {
  let box = boxes[i];
  box.setAttribute("draggable", true);
  box.addEventListener("dragstart", drag);
  box.addEventListener("dragover", allowDrop);
  box.addEventListener("drop", drop);
}
let undoButton = document.createElement("button");
undoButton.textContent = "Undo last swap";
undoButton.addEventListener("click", undoSwap);
document.body.appendChild(undoButton);

function undoSwap() {
    if(lastSwap) {
      let targetBox = lastSwap[0];
      let sourceBox = lastSwap[1];
      lastSwap = null;
      let tempContent = sourceBox.innerHTML;
    let tempColor = sourceBox.style.backgroundColor;
    sourceBox.innerHTML = targetBox.innerHTML;
    sourceBox.style.backgroundColor = targetBox.style.backgroundColor;
    targetBox.innerHTML = tempContent;
    targetBox.style.backgroundColor = tempColor;
    }
  }
  
