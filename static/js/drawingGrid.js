const IMAGE_KEY = "grid-image";

const clearBtn = document.getElementById("clear-btn");
const colorPicker = document.getElementById("color-picker");
const downloadBtn = document.getElementById("download-btn");
const drawingGrid = document.getElementById("drawing-grid");
const eraserBtn = document.getElementById("eraser-btn");
const galleryContainer = document.getElementById("gallery-container");
const gridSizeInput = document.getElementById("grid-size");
const saveBtn = document.getElementById("save-btn");

let baseColor = "#f0f0f0";
let drawingColor = colorPicker.value;
let gridSize = gridSizeInput.value;
let isDrawing = false;
let isErasing = false;

function createGird(size) {
  drawingGrid.innerHTML = "";

  drawingGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  drawingGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");

    cell.addEventListener("mousedown", (event) => {
      isDrawing = true;
      if (isErasing) {
        event.target.style.backgroundColor = baseColor;
      } else {
        event.target.style.backgroundColor = drawingColor;
      }
    });

    cell.addEventListener("mouseover", (event) => {
      if (isDrawing) {
        if (isErasing) {
          event.target.style.backgroundColor = baseColor;
        } else {
          event.target.style.backgroundColor = drawingColor;
        }
      }
    });

    drawingGrid.appendChild(cell);
  }
}

function clearGrid() {
  baseColor = "#f0f0f0";
  colorPicker.value = "#000000";
  drawingColor = colorPicker.value;
  isErasing = false;
  createGird(gridSize);
  displaySavedImages();
}

function setupEventListeners() {
  document.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  eraserBtn.addEventListener("click", () => {
    isErasing = true;
  });

  clearBtn.addEventListener("click", () => {
    clearGrid();
  });

  colorPicker.addEventListener("input", (event) => {
    drawingColor = event.target.value;
    isErasing = false;
  });

  gridSizeInput.addEventListener("input", (event) => {
    gridSize = event.target.value;
    createGird(gridSize);
  });

  downloadBtn.addEventListener("click", () => {
    downloadImage();
  });

  saveBtn.addEventListener("click", () => {
    saveImage();
  });
}

function deleteImage(indexToRemove) {
  const savedImages = JSON.parse(localStorage.getItem(IMAGE_KEY)) || [];
  if (indexToRemove >= 0 && indexToRemove < savedImages.length) {
    savedImages.splice(indexToRemove, 1);
    localStorage.setItem(IMAGE_KEY, JSON.stringify(savedImages));
    displaySavedImages();
  }
}

function downloadImage() {
  html2canvas(drawingGrid).then(function (canvas) {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = dataURL;
    link.download = "my-image.png";
    link.click();
  });
}

function downloadSavedImage(dataURL) {
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "saved-image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function displaySavedImages() {
  let savedImages = [];
  try {
    const storedValue = localStorage.getItem(IMAGE_KEY);
    if (storedValue) {
      savedImages = JSON.parse(storedValue);
    }
  } catch (error) {
    localStorage.removeItem(IMAGE_KEY);
    savedImages = [];
  }

  if (galleryContainer) {
    galleryContainer.innerHTML = "";
    savedImages.forEach((dataURL, index) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("img-container");
      galleryContainer.appendChild(imgContainer);

      const img = document.createElement("img");
      img.src = dataURL;
      img.alt = "Saved drawing";
      img.classList.add("saved-image");
      imgContainer.appendChild(img);

      const imgBtnContainer = document.createElement("div");
      imgBtnContainer.classList.add("img-btn-container");
      imgContainer.appendChild(imgBtnContainer);

      const deleteImgBtn = document.createElement("button");
      deleteImgBtn.textContent = "delete";
      deleteImgBtn.addEventListener("click", () => {
        deleteImage(index);
      });
      imgBtnContainer.appendChild(deleteImgBtn);

      const saveImgBtn = document.createElement("button");
      saveImgBtn.textContent = "save";
      saveImgBtn.addEventListener("click", () => {
        downloadSavedImage(dataURL);
      });
      imgBtnContainer.appendChild(saveImgBtn);
    });
  }
}

function saveImage() {
  if (drawingGrid) {
    html2canvas(drawingGrid).then(function (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const savedImages = JSON.parse(localStorage.getItem(IMAGE_KEY)) || [];

      savedImages.push(dataURL);
      localStorage.setItem(IMAGE_KEY, JSON.stringify(savedImages));

      displaySavedImages();
    });
  }
}

// Init
createGird(gridSize);
setupEventListeners();
displaySavedImages();
