"use strict"
var gIsDrag = false
var gLastPos
var gStartPos

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
    gCtx.strokeStyle = line.stroke
    gCtx.textAlign = line.align
    gCtx.fillStyle = line.color

    line.pos.x = gCanvas.width / 2

    if (idx === 0) {
      //top line
      gCtx.fillText(line.txt, gCanvas.width / 2, 50)
      gCtx.strokeText(line.txt, gCanvas.width / 2, 50)
      line.pos.y = 50
    } else if (idx === 1) {
      //bottom line
      gCtx.fillText(line.txt, gCanvas.width / 2, gCanvas.height - 50)
      gCtx.strokeText(line.txt, gCanvas.width / 2, gCanvas.height - 50)
      line.pos.y = gCanvas.height - 50
    } else {
      //center line
      gCtx.fillText(line.txt, gCanvas.width / 2, gCanvas.height / 2)
      gCtx.strokeText(line.txt, gCanvas.width / 2, gCanvas.height / 2)
      line.pos.y = gCanvas.height / 2
    }
  })
  draw(gMeme.selectedLineIdx)
}

//add border to text line
function draw(idx) {
  const line = gMeme.lines[idx]
  gCtx.save()
  var widthRect = gCtx.measureText(line.txt).width
  gCtx.strokeRect(
    line.pos.x - widthRect / 2 - 5,
    line.pos.y - line.size,
    widthRect + 10,
    line.size + 10
  )
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

//change align
function onAlignChange(alignment) {
  setLineAlign(alignment)
  renderMeme()
}

//change text color
function onChangeTextColor(color) {
  setTextColor(color)
  gColorTxt = color
  renderMeme()
}
//change stroke text color
function onChangeStrokeColor(color) {
  setStrokeColor(color)
  gColorSt = color
  renderMeme()
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
  const pos = getEvPos(ev)
  if (!isInLine(pos, true)) return
  renderText()
  gStartPos = pos
  document.body.style.cursor = "grabbing"
  renderMeme()
}
function onMove(ev) {
  const pos = getEvPos(ev)
  if (gIsDrag) {
    ev.preventDefault()
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
  } else {
    if (isInLine(pos, false)) document.body.style.cursor = "grab"
    else document.body.style.cursor = "default"
  }
}
function onUp(ev) {
  gIsDrag = false
  const pos = getEvPos(ev)
  // document.body.style.cursor = "pointer"
  if (isInLine(pos, false)) document.body.style.cursor = "grab"
}

function getEvPos(ev) {
  const touchEvs = ["touchstart", "touchmove", "touchend"]
  //Gets the offset pos , the default pos
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (touchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y:
        ev.pageY -
        ev.target.offsetTop -
        ev.target.clientTop -
        ev.target.offsetParent.offsetTop,
    }
  }
  return pos
}

function onSaveMeme() {
  saveMeme()

  console.log("meme saved")
}
