"use strict"
var gIsFlax = false
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["funny", "politition"] },
  { id: 2, url: "img/2.jpg", keywords: ["cute", "dog"] },
  { id: 3, url: "img/3.jpg", keywords: ["baby", "dog", "cute"] },
  { id: 4, url: "img/4.jpg", keywords: ["cumputer", "cat"] },
  { id: 5, url: "img/5.jpg", keywords: ["funny", "baby"] },
  { id: 6, url: "img/6.jpg", keywords: ["man", "tv"] },
  { id: 7, url: "img/7.jpg", keywords: ["funny", "baby"] },
  { id: 8, url: "img/8.jpg", keywords: ["funny", "tv"] },
  { id: 9, url: "img/9.jpg", keywords: ["funny", "baby"] },
  { id: 10, url: "img/10.jpg", keywords: ["funny", "politition"] },
  { id: 11, url: "img/11.jpg", keywords: ["man"] },
  { id: 12, url: "img/12.jpg", keywords: ["funny", "tv"] },
  { id: 13, url: "img/13.jpg", keywords: ["tv"] },
  { id: 14, url: "img/14.jpg", keywords: ["tv", "man"] },
  { id: 15, url: "img/15.jpg", keywords: ["funny", "man"] },
  { id: 16, url: "img/16.jpg", keywords: ["funny", "man", "tv"] },
  { id: 17, url: "img/17.jpg", keywords: ["funny", "politition"] },
  { id: 18, url: "img/18.jpg", keywords: ["funny", "tv"] },
]

var gSearchFilter = ""

//search
function setSearchFilter(value) {
  gSearchFilter = value.toLowerCase()
}

//flexible
function randomMeme() {
  const imgs = getImg()
  const imgId = imgs[getRandIntInc(0, imgs.length - 1)].id
  setImg(imgId)

  const meme = getgMeme()
  meme.lines = []
  const num = getRandIntInc(1, 2)
  for (var i = 0; i < num; i++) {
    // addLine()
    generateRandLine(meme)
  }
}

function generateRandLine(meme) {

  const line = {
    txt :  getRandSentence(),
    size:   getRandIntInc(20, 40),
    font: "ariel",
    align: "center",
    color:  getRandomColor(),
    stroke:  getRandomColor(),
    pos:{x:10,y:100}
  }
  meme.lines.push(line)
}

//saved memes
function renderSavedMemes() {
  const memes = getMemes()

  const strHTMLs = memes.map((meme, idx) => {
    let img = new Image()
    img.src = meme.dataImg

    return `<article class="memes-img" onclick="onMemeSelect(${idx})">
      <img src="${img.src}"  alt="" />
    </article> `
  })

  document.querySelector('.gallery-memes').innerHTML = strHTMLs.join('')
}


function getRandIntInc(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandSentence() {
  const memesSentences = [
    "I never eat falafel",
    "DOMS DOMS EVERYWHERE",
    "Stop Using i in for loops",
    "Armed in knowledge",
    'Js error "Unexpected String"',
    "One does not simply write js",
    "I`m a simple man i see vanilla JS, i click like!",
    "JS, HTML,CSS?? Even my momma can do that",
    "May the force be with you",
    "I know JS",
    "JS Where everything is made up and the rules dont matter",
    "Not sure if im good at programming or good at googling",
    "But if we could",
    "JS what is this?",
    "Write hello world , add to cv 7 years experienced",
  ]

  return memesSentences[getRandIntInc(0, memesSentences.length - 1)]
}

function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}



