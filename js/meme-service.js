var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = [{ id: 1, url: "img/1.jpg", keywords: ["funny", "cat"] }]

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I sometimes eat Falafel",
      size: 20,
      align: "left",
      color: "red",
      stroke:'black',
      fontSize:'50px'
    },
  ],
}

function setTextLine(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getMeme() {
  return gMeme
}

function getImgs() {
  return gImgs
}

function changeFontSize(diff) {
    const num = +gMeme.lines[gMeme.selectedLineIdx].fontSize.match(/(\d+)/)[0]
    gMeme.lines[gMeme.selectedLineIdx].fontSize = `${num + diff}px`
    console.log(num + diff)
  }