"use strict"

var gCanvas
var gCtx
var gIsDrag = false
var elText = ""
var gColorSh = document.querySelector("[name=fill-color]").value
var gColorSt = document.querySelector("[name=stroke-color]").value
const gTouchEvs = ["touchstart", "touchmove", "touchend"]

function init() {
  gCanvas = document.querySelector(".my-canvas")
  gCtx = gCanvas.getContext("2d")
  console.log(gCanvas)
  addListeners()
  renderCanvas()

}
function renderCanvas() {
    //Set the backgournd color to grey 
    gCtx.fillStyle = "#c5c3c3"
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)

}
function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function onPickColorsh(color) {
  gColorSh = color
}
function onPickColorst(color) {
  gColorSt = color
}
function drawText(x, y) {
  console.log("elText", elText)
  gCtx.lineWidth = 2
  gCtx.strokeStyle = gColorSt
  gCtx.fillStyle = gColorSh
  gCtx.font = "40px Arial"
  gCtx.fillText(elText, x, y)
  gCtx.strokeText(elText, x, y)
}
function setShape(shape) {
  if (shape === "text") {
    elText = document.querySelector("[name=text]").value
  }
}
function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}
function addMouseListeners() {
  gCanvas.addEventListener("mousemove", onMove)
  gCanvas.addEventListener("mousedown", onDown)
  gCanvas.addEventListener("mouseup", onUp)
}

function addTouchListeners() {
  gCanvas.addEventListener('touchmove', onMove)
  gCanvas.addEventListener('touchstart', onDown)
  gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  gIsDrag = true
  console.log("ev", ev)
  const { offsetX, offsetY } = ev
  gLastPos.x = offsetX
  gLastPos.y = offsetY
  document.body.style.cursor = "grabbing"
}

function onMove(ev) {
  if (!gIsDrag) return
  console.log("ev", ev)
  draw(ev)
  const { offsetX, offsetY } = ev
  gLastPos.x = offsetX
  gLastPos.y = offsetY
  document.body.style.cursor = "grabbing"
}
function onUp() {
  gIsDrag = false
  document.body.style.cursor = "pointer"
}
function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container")
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = elContainer.offsetHeight
}
