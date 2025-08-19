const IMAGE_KEY = "grid-image";

const clearBtn = document.getElementById("clear-btn");
const colorPicker = document.getElementById("color-picker");
const downloadBtn = document.getElementById("download-btn");
const drawingGrid = document.getElementById("drawing-grid");
const eraserBtn = document.getElementById("eraser-btn");
const galleryContainer = document.getElementById("gallery-container");
const gridSizeInput = document.getElementById("grid-size");
const saveBtn = document.getElementById("save-btn");
const penBtn = document.getElementById("pen-btn");
const BRUSH_MIN = parseInt(gridSizeInput.min || "1", 10);
const BRUSH_MAX = parseInt(gridSizeInput.max || "6", 10);

const GRID_DIM = 24;
let gridSize = GRID_DIM;

let baseColor = "#f0f0f0";
let drawingColor = colorPicker.value;
let brushSize = Math.min(
  BRUSH_MAX,
  Math.max(BRUSH_MIN, parseInt(gridSizeInput.value, 10) || BRUSH_MIN)
);

let isDrawing = false;
let isErasing = false;

let gridColors = initColorMatrix(gridSize, baseColor);

function initColorMatrix(size, fill) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => fill)
  );
}

function indexToRC(idx, size) {
  return [Math.floor(idx / size), idx % size];
}

function rcToIndex(r, c, size) {
  return r * size + c;
}

function getColor(r, c) {
  return gridColors?.[r]?.[c] ?? baseColor;
}

function paintAt(row, col, color) {
  // brushSize is the SIDE LENGTH (1 => 1x1, 3 => 3x3, 5 => 5x5, ...)
  const size = Math.max(1, brushSize);
  const half = Math.floor((size - 1) / 2);
  const top = row - half;
  const left = col - half;

  for (let r = 0; r < size; r++) {
    const rr = top + r;
    if (rr < 0 || rr >= gridSize) continue;

    for (let c = 0; c < size; c++) {
      const cc = left + c;
      if (cc < 0 || cc >= gridSize) continue;

      gridColors[rr][cc] = color;
      const idx = rcToIndex(rr, cc, gridSize);
      const cell = drawingGrid.children[idx];
      if (cell) cell.style.backgroundColor = color;
    }
  }
}

function createGrid(size) {
  drawingGrid.innerHTML = "";

  drawingGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  drawingGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.dataset.index = i;

    const [r, c] = indexToRC(i, size);
    cell.style.backgroundColor = getColor(r, c);

    cell.addEventListener("mousedown", (event) => {
      event.preventDefault();
      isDrawing = true;
      const [row, col] = indexToRC(+event.target.dataset.index, gridSize);
      const color = isErasing ? baseColor : drawingColor;
      paintAt(row, col, color);
    });

    cell.addEventListener("mouseover", (event) => {
      if (!isDrawing) return;
      const [row, col] = indexToRC(+event.target.dataset.index, gridSize);
      const color = isErasing ? baseColor : drawingColor;
      paintAt(row, col, color);
    });

    drawingGrid.appendChild(cell);
  }
}

function clearGrid() {
  baseColor = "#f0f0f0";
  colorPicker.value = "#000000";
  drawingColor = colorPicker.value;
  setTool("pen");
  gridColors = initColorMatrix(gridSize, baseColor);
  createGrid(gridSize);
  displaySavedImages();
}

function setTool(mode) {
  isErasing = mode === "eraser";
  penBtn.classList.toggle("active", !isErasing);
  eraserBtn.classList.toggle("active", isErasing);
}


function setupEventListeners() {
  document.addEventListener("mouseup", () => (isDrawing = false));

  penBtn.addEventListener("click", () => setTool("pen"));
  eraserBtn.addEventListener("click", () => setTool("eraser"));

  clearBtn.addEventListener("click", clearGrid);

  colorPicker.addEventListener("input", (event) => {
    drawingColor = event.target.value;
    setTool("pen");
  });

  gridSizeInput.addEventListener("input", (event) => {
    const raw = parseInt(event.target.value, 10);
    const min = BRUSH_MIN;
    const max = BRUSH_MAX;
    
  // slider is rotated 180°, so invert: small at top, big at bottom
    brushSize = Math.min(max, Math.max(min, max - (raw - min)));
  });

  downloadBtn.addEventListener("click", downloadImage);
  saveBtn.addEventListener("click", saveImage);
}

function deleteImage(indexToRemove) {
  const saved = normalizeSavedImages(JSON.parse(localStorage.getItem(IMAGE_KEY)) || []);
  if (indexToRemove >= 0 && indexToRemove < saved.length) {
    saved.splice(indexToRemove, 1);
    localStorage.setItem(IMAGE_KEY, JSON.stringify(saved));
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

function downloadSavedImage(dataURL, name = "saved-image") {
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `${name}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function normalizeSavedImages(arr) {
  return arr.map((item) =>
    typeof item === "string"
      ? { name: "Untitled", dataURL: item, createdAt: Date.now() }
      : item
  );
}

function displaySavedImages() {
  let savedImages = [];
  try {
    const storedValue = localStorage.getItem(IMAGE_KEY);
    if (storedValue) { savedImages = normalizeSavedImages(JSON.parse(storedValue));
    }
  } catch (e) {
    localStorage.removeItem(IMAGE_KEY);
    savedImages = [];
  }

  if (!galleryContainer) return;

  galleryContainer.innerHTML = "";
  savedImages.forEach(({ dataURL, name}, index ) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    galleryContainer.appendChild(imgContainer);

    const img = document.createElement("img");
    img.src = dataURL;
    img.alt = name || "Saved drawing";
    img.classList.add("saved-image");
    imgContainer.appendChild(img);

    const caption = document.createElement("div");
    caption.className = "img-name";
    caption.textContent = name || "Untitled";
    imgContainer.appendChild(caption);

    const imgBtnContainer = document.createElement("div");
    imgBtnContainer.classList.add("img-btn-container");
    imgContainer.appendChild(imgBtnContainer);

    const deleteImgBtn = document.createElement("button");
    deleteImgBtn.textContent = "delete";
    deleteImgBtn.addEventListener("click", () => deleteImage(index));
    imgBtnContainer.appendChild(deleteImgBtn);

    const saveImgBtn = document.createElement("button");
    saveImgBtn.textContent = "download";
    saveImgBtn.addEventListener("click", () => downloadSavedImage(dataURL, name));
      imgBtnContainer.appendChild(saveImgBtn);
    });
  }

  function saveImage() {
    if (!drawingGrid) return;
    html2canvas(drawingGrid).then(function (canvas) {
      const dataURL = canvas.toDataURL("image/png");

      const defaultName = `Drawing ${new Date().toLocaleString()}`;
      const entered = prompt("Name your drawing:", defaultName);
      const name = (entered || defaultName).trim();

      const savedRaw = JSON.parse(localStorage.getItem(IMAGE_KEY)) || [];
      const saved = normalizeSavedImages(savedRaw);
      saved.push({ name, dataURL, createdAt: Date.now() });

      localStorage.setItem(IMAGE_KEY, JSON.stringify(saved));
      displaySavedImages();
    });
  }


// Init
createGrid(gridSize);
setupEventListeners();
displaySavedImages();
setTool("pen");
