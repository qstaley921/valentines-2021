
// =================================
//      GLOBAL VARIABLES 
// =================================
  const bodyNode = document.querySelector('body');
  const svgDivNode = document.querySelector('.svg-box');
  const mainNode = document.querySelector('main');
  const navBtns = document.querySelectorAll('.p-icon');
  const data = [
    {
      noun:[
        {
          img:"/imgs/noun-elephant.png",
          text:"elephant"
        },
        {
          img:"/imgs/noun-dishwasher.png",
          text:"dishwasher"
        },
        {
          img:"/imgs/noun-buttercup.png",
          text:"buttercup"
        },
        {
          img:"/imgs/noun-lysol.png",
          text:"lysol"
        }
      ]
    },
    {
      adj:[
        {
          img:"/imgs/adj-exhausted.png",
          text:"exhausted"
        },
        {
          img:"/imgs/adj-raging.png",
          text:"raging"
        },
        {
          img:"/imgs/adj-thirsty.png",
          text:"thirsty"
        },
        {
          img:"/imgs/adj-frisky.png",
          text:"frisky"
        }
      ]
    },
    {
      verb:[
        {
          img:"/imgs/verb-fly.png",
          text:"fly"
        },
        {
          img:"/imgs/verb-kick.png",
          text:"kick"
        },
        {
          img:"/imgs/verb-paint.png",
          text:"paint"
        },
        {
          img:"/imgs/verb-whistle.png",
          text:"whistle"
        }
      ]
    }
  ];
  const game = new Game(data);
// ========================================================= END GLOBAL VARIABLES

// =================================
//      SVG FUNCTIONS / Positioning
// =================================

  /**
   * @returns {object} | returns an object with the width and height of client window
   */
  const getWindowSize = () => {
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;
    return { width, height };
  }

  /**
   * Generates the SVG background
   * @param {int} width | the width of the client window in pixels
   * @param {int} height | the height of the client window in pixels
   */
  const genSVG = (width, height) => {
    svgDivNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
                              <polygon id="tri-1" points="0,${height/2.5} ${width},${(height/2)+(height/6)} ${width},${height - (height/8)}" />
                              <polygon id="tri-2" points="0,${height/2.5} ${width},${height - (height/8)} ${width},${height - (height/11)}" />
                              <polygon id="tri-3" points="0,${height/2.5} ${width},${height - (height/11)} ${width},${height} ${width - (width/10)},${height}" />
                              <polygon id="tri-4" points="0,${height/2.5} 0,${height/2.48} ${width - (width/8)},${height} ${width - (width/10)},${height}" />
                            </svg>`;
  }

  // creates the initial svg
  genSVG(document.body.clientWidth, document.body.clientHeight);

  /**
   * Updates SVG on page resize
   */
  window.addEventListener('resize', () => {
    genSVG(getWindowSize().width, getWindowSize().height);
    changeMainPosition(getWindowSize().width, getWindowSize().height);
  });
// ========================================================= END SVG

// =================================
//      Style HANDLERS
// =================================

  const changeMainPosition = (width, height) => {
    console.log('i am on');
    const mainHeight = mainNode.offsetHeight;
    const mainWidth = mainNode.offsetWidth;
    const fromLeft = (width - mainWidth) / 2;
    const fromTop = (height - mainHeight) / 2;
    mainNode.style.left = `${fromLeft}px`;
    mainNode.style.top = `${fromTop}px`;
  }
  

// ========================================================= END LOGIC

// =================================
//      EVENT LISTENERS 
// =================================

/**
 * Creates a Game Object on page load
 */
window.addEventListener('DOMContentLoaded', () => {
  changeMainPosition(getWindowSize().width, getWindowSize().height);
  game.genQuiz('noun');

  // Disables buttons from the start
  navBtns.forEach(btn => {
    if (btn.innerHTML === 'noun') {
      btn.disabled = false;
      btn.classList = 'p-icon p-active';
    } else { 
      btn.disabled = true;
    }
  });
});

navBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    game.handleNavClick(event.target, navBtns);
  });
});

window.addEventListener('click', (event) => {
  if (event.target.hasAttribute("data-quiz") && !event.target.classList.contains('inactive')) {
    game.handleAnswerClick(event.target, document.querySelectorAll('figure button'));
    game.handleNavChange(navBtns);
  }
});

// ========================================================= END EVENT LISTENERS