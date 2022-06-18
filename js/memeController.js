"use strict"
var gIsDrag = false

const gTouchEvs = ["touchstart", "touchmove", "touchend"]

// //render meme to canvas
function renderMeme() {
  const meme = getMeme()
  const img = new Image()
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    renderText()
  }

  img.src = meme.url
}

//render text to canvas
function renderText() {
  const meme = getgMeme()
  meme.lines.forEach((line, idx) => {
    gCtx.font = line.size + "px impact"
    gCtx.textAlign = line.align
    gCtx.fillStyle = line.color
    if (idx === 0) {
      //top line
      gCtx.fillText(line.txt, gCanvas.width / 2, 50)
    } else if (idx === gMeme.lines.length - 1) {
      //bottom line
      gCtx.fillText(line.txt, gCanvas.width / 2, gCanvas.height - 50)
    } else {
      //center line
      gCtx.fillText(line.txt, gCanvas.width / 2, gCanvas.height / 2)
    }
    gCtx.strokeStyle = " blue"
  })
}

//text line
function onSetTextLine(txt) {
  clearCanvas()
  setTextLine(txt)
  renderText()
  renderMeme()
}

//change font size text
function onChangeFontSize(diff) {
  changeFontSize(diff)
  renderMeme()
}

//stwich between the lines
function onSwitchLine() {
  switchLine()
  renderMeme()
}

//add new line text
function onAddLine() {
  addLine()
  clearCanvas()
  renderMeme()
}

//delete line text
function onDeleteLine() {
  deleteLine()
  renderMeme()
}

//change text color
function onChangeTextColor(color) {
  setTextColor(color)
  renderMeme()
  gColorTxt = color
}
//change stroke text color
function onChangeStrokeColor(color) {
  setStrokeColor(color)
  renderMeme()
  gColorSt = color
}

function drawSelectedRect(line) {
  var textWidth = getLineWidth()
  var textHeight = line.size

  gCtx.lineWidth = 1
  gCtx.strokeStyle = "#f8f9fa"
  gCtx.strokeRect(
    line.pos.x - 5,
    line.pos.y - textHeight + 5,
    textWidth + 10,
    textHeight + 5
  )
  gCtx.stroke()
}

//clear canvas
function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

//canvas controllers
function addListeners() {
  addMouseListeners()
  addTouchListeners()
}
function addMouseListeners() {
  gCanvas.addEventListener("mousemove", onMove)
  gCanvas.addEventListener("mousedown", onDown)
  gCanvas.addEventListener("mouseup", onUp)
}
function addTouchListeners() {
  gCanvas.addEventListener("touchmove", onMove)
  gCanvas.addEventListener("touchstart", onDown)
  gCanvas.addEventListener("touchend", onUp)
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
