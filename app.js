
const bodyNode = document.querySelector('body');
const svgDivNode = document.querySelector('.svg-box');
const mainNode = document.querySelector('main');
const questions = [
  {
    "name":"noun",
    "answers":[
      {
        "img":"/imgs/noun-elephant.png",
        "text":"elephant"
      },
      {
        "img":"/imgs/noun-dishwasher.png",
        "text":"dishwasher"
      },
      {
        "img":"/imgs/noun-buttercup.png",
        "text":"buttercup"
      },
      {
        "img":"/imgs/noun-lysol.png",
        "text":"lysol"
      }
    ]
  },
  {
    "name":"adj",
    "answers":[
      {
        "img":"/imgs/adj-exhausted.png",
        "text":"exhausted"
      },
      {
        "img":"/imgs/adj-raging.png",
        "text":"raging"
      },
      {
        "img":"/imgs/adj-thirsty.png",
        "text":"thirsty"
      },
      {
        "img":"/imgs/adj-frisky.png",
        "text":"frisky"
      }
    ]
  },
  {
    "name":"verb",
    "answers":[
      {
        "img":"/imgs/verb-fly.png",
        "text":"fly"
      },
      {
        "img":"/imgs/verb-kick.png",
        "text":"kick"
      },
      {
        "img":"/imgs/verb-paint.png",
        "text":"paint"
      },
      {
        "img":"/imgs/verb-whistle.png",
        "text":"whistle"
      }
    ]
  }
];


const onResize = () => {
  let width = document.body.clientWidth;
  let height = document.body.clientHeight;
  return { width, height };
}

const genSVG = (width, height) => {
  svgDivNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
                            <polygon id="tri-1" points="0,${height/2.5} ${width},${(height/2)+(height/6)} ${width},${height - (height/8)}" />
                            <polygon id="tri-2" points="0,${height/2.5} ${width},${height - (height/8)} ${width},${height - (height/11)}" />
                            <polygon id="tri-3" points="0,${height/2.5} ${width},${height - (height/11)} ${width},${height} ${width - (width/10)},${height}" />
                            <polygon id="tri-4" points="0,${height/2.5} 0,${height/2.48} ${width - (width/8)},${height} ${width - (width/10)},${height}" />
                          </svg>`;
}

genSVG(document.body.clientWidth, document.body.clientHeight);

window.addEventListener('resize', () => {
  genSVG(onResize().width, onResize().height);
});