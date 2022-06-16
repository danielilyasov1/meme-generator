"use strict"
const elImgGallery = document.querySelector('.gallery-container')
const elEditor =  document.querySelector('.editor-container')
var gCanvas
var gCtx

function onSetTextLine(txt) {
  setTextLine(txt)
  renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    // const img = getImg(meme.selectedImgId)
    const img = new Image()
    img.on
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }   
  
    img.src = meme.url
}

function onChangeFontSize(diff) {
  changeFontSize(diff)

  renderMeme()
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

function drawSelectedRect(line) {
  var textWidth = getLineWidth()
  var textHeight = line.fontSize

  gCtx.lineWidth = 1
  gCtx.strokeStyle = '#f8f9fa'
  gCtx.strokeRect(
    line.pos.x - 5,
    line.pos.y - textHeight + 5,
    textWidth + 10,
    textHeight + 5
  )
  gCtx.stroke()
}
