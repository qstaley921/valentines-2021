
class Game {
  constructor (data) {
    this.data = data;
    this.answers = {noun: [], adj: [], verb: []};
    this.active = '';
    this.noun = '';
    this.verb = '';
    this.adj = '';
  }

  /**
   * populates the quiz with the data based on @param quiz
   * @param {string} quiz | the name of the quizData property
   */
  genQuiz(quiz) {
    const quizNode = document.querySelector('.quiz');
    quizNode.className = 'quiz';
    const quizData = this.data.filter(index => index.hasOwnProperty(quiz));
    const quizObj = quizData[0][quiz];
    let quizHTML = '';

    if (this.answers[`${quiz}`].length === 0) {
      quizObj.forEach(element => {
        quizHTML += `
          <figure>
            <img src="${element.img}" alt="${element.text} img">
            <button class="answer-btn" data-quiz="${quiz}" data-answer="false">${element.text}</button>
          </figure>
        `;
      });
      quizNode.innerHTML = quizHTML;
    } else {
      const nodeArray = this.answers[`${quiz}`];
      quizNode.innerHTML = '';
      nodeArray.forEach(node => quizNode.appendChild(node));
    }
  }

  genPoem() {
    const quizNode = document.querySelector('.quiz');
    this.getAnswer('noun');
    this.getAnswer('adj');
    this.getAnswer('verb');
    quizNode.className = 'quiz poem-box';
    quizNode.innerHTML = `
      <span class="hr"></span>
      <p class="poem"><span class="title-text">Vrinda,</span><br> admittedly, I was a wee worried you'd pick the ${this.adj} ${this.noun}&mdash;especially since you think they can ${this.verb}. And now ... here we are; my worries came true! The ${this.noun} cannot ${this.verb}, and yet, you have selected this ${this.adj} absurdity, all-the-same&mdash;a true testament to our chaotic world. Speaking of chaos, this ${this.adj} little valentine is completely coded from scratch, for you, for this 2021 Valentine's day. May all this inspire you to ${this.verb}, ${this.verb} away. From your ${this.adj} ${this.noun} of a friend, <br><span class="title-text sig">Quentin.</span> </p>

    `;
  }

  getAnswer(property) {
    this.answers[`${property}`].forEach(figure => {
      if (figure.childNodes[3].classList.contains('active')) {
        const text = figure.childNodes[3].innerHTML;
        this[`${property}`] = text;
      }
    });
  }

  /**
   * - Styles navBtn based on target
   * - Generates a Quiz based on target
   * @param {object} target | HTML node object
   * @param {array} btns | array of btn nodes
   */
  handleNavClick(target, btns) {
    for(let i = 0; i < btns.length; i++) {
      if (btns[i].getAttribute('data-complete') === 'false') {
        btns[i].className = 'p-icon';
      } 

      if (btns[i].getAttribute('data-complete') === 'true') {
        btns[i].className = 'p-icon p-visited';
      } 
      
      if (i > 0) {
        if (btns[i-1].getAttribute('data-complete') === 'true' && btns[i].getAttribute('data-complete') === 'false') {
          btns[i].classList.add('p-open');
        }
      }
      
    };

    if (target.getAttribute('data-complete') === 'false') {
      target.className = 'p-icon p-active';
    }
  
    if (target.innerHTML === 'poem') {
      this.genPoem();
    } else {
      this.genQuiz(target.innerHTML);
    }
  }

  handleNavChange(btns) {
    for (const prop in this.answers) {
      if (this.answers[`${prop}`].length > 0) { // if it has an answer
        for(let i = 0; i < btns.length; i++) {
          if (btns[i].innerHTML === this.active) { // if current button
            btns[i].setAttribute('data-complete', 'true');
            btns[i].className = 'p-icon p-active';
            btns[i+1].disabled = false;

            if (btns[i+1].getAttribute('data-complete') === 'false') {
              btns[i+1].className = 'p-icon p-open';
            } 
          }
        };
      }
    }
  }

  handleAnswerClick(target, btns) {
    btns.forEach(btn => {
      btn.previousElementSibling.className = 'grayscale';
      btn.className = 'answer-btn inactive';
      btn.disabled = true;
    });
    const answerProp = target.getAttribute('data-quiz');
    const quizNode = document.querySelectorAll('figure');
    this.answers[`${answerProp}`] = quizNode;
    this.active = answerProp;
    target.className = 'answer-btn active';
    target.previousElementSibling.className = '';
  }

}