
class Game {
  constructor (data) {
    this.data = data;
    this.answers = {noun: [], adj: [], verb: []};
    this.active = '';
  }

  /**
   * populates the quiz with the data based on @param quiz
   * @param {string} quiz | the name of the quizData property
   */
  genQuiz(quiz) {
    const quizNode = document.querySelector('.quiz');
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

    this.genQuiz(target.innerHTML);
  
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
    console.log(quizNode);
    target.className = 'answer-btn active';
    target.previousElementSibling.className = '';
  }

}