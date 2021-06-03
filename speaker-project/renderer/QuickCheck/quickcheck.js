let selectSize = document.getElementById('size-option'),
    quizInfo = document.getElementById('quiz-info')

let quizView = document.getElementById('quiz-view')

let startButton = document.getElementById('start')


startButton.addEventListener('click',e=>{
    startButton.style.display = 'none';
    quizView.style.display = 'flex';
    quizInfo.style.display = 'none';
})