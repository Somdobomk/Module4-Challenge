var timerElement = document.getElementById('timeLeft');
var startButton = document.getElementById('start');
var questionElement = document.getElementById('main');
var scoreElement = document.getElementById('main');
var initial = null;
console.log(startButton);

var timeLeft = 55;

// Question array and index
var questions = [
	{
		question:
			'What is the language used to describe the presentation of a document?',
		a: 'HTML',
		b: 'JavaScript',
		c: 'CSS',
		d: 'C+',
		answer: 'CSS',
	},
	{
		question: 'Which one of these headings has a bigger font size?',
		a: 'h1',
		b: 'h2',
		c: 'h3',
		d: 'h4',
		answer: 'h1',
	},
	{
		question: 'Which of these elements can create a section in an HTML?',
		a: 'section',
		b: 'article',
		c: 'div',
		d: 'All of the Above',
		answer: 'All of the Above',
	},
	{
		question: 'What style creates space around an element?',
		a: 'Margin',
		b: 'Padding',
		c: 'Border',
		d: 'Position',
		answer: 'Margin',
	},
	{
		question: 'What does console.log do?',
		a: 'Creates functions in the console',
		b: 'Outputs messages to the console',
		c: 'Displays the HTML in the console',
		d: 'Creates log-in information',
		answer: 'Outputs messages to the console',
	},
];

questionindex = 0;

// starts the quiz
function startQuiz() {
	countdown();
	displayquestion();
}

//timer function
function countdown() {
	var interval = setInterval(function () {
		if (questionindex < 5 && timeLeft > 0) {
			timerElement.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else if (timeLeft === 1) {
			timerElement.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else {
			timerElement.textContent = 'Time: ' + timeLeft;
			clearInterval(interval);
			score();
		}
	}, 1000);
}

// displays question function
function displayquestion() {
	if (questionindex < 5) {
		document.getElementById('main').innerHTML = '';

		var current = questions[questionindex];

		var question = document.createElement('h2');
		question.textContent = current.question;
		questionElement.appendChild(question);

		var a = document.createElement('p');
		a.textContent = current.a;
		questionElement.appendChild(a);

		var b = document.createElement('p');
		b.textContent = current.b;
		questionElement.appendChild(b);

		var c = document.createElement('p');
		c.textContent = current.c;
		questionElement.appendChild(c);

		var d = document.createElement('p');
		d.textContent = current.d;
		questionElement.appendChild(d);

		a.addEventListener('click', anwserCheck);
		b.addEventListener('click', anwserCheck);
		c.addEventListener('click', anwserCheck);
		d.addEventListener('click', anwserCheck);
	} else {
		score();
	}
}

// Display Highscores
function displayHighScores() {}

// answer check function
function anwserCheck() {
	console.log(this);
	if (questions[questionindex].answer === this.textContent) {
		console.log('correct');
		questionindex++;
		console.log(questionindex);
		displayquestion();
	} else {
		console.log('incorrect');
		questionindex++;
		console.log(questionindex);
		timeLeft -= 10;
		displayquestion();
	}
}

// Score Page
function score() {
	document.getElementById('main').innerHTML = '';

	var scoreText = document.createElement('h3');
	scoreText.innerHTML = 'Score: ' + timeLeft;
	scoreElement.appendChild(scoreText);
	if (timeLeft < 0) {
		scoreText.innerHTML = 'Score: 0';
		timeLeft = 0;
	}

	initial = document.createElement('input');
	scoreElement.appendChild(initial);

	var submit = document.createElement('button');
	submit.innerHTML = 'Submit';
	scoreElement.appendChild(submit);

	submit.onclick = saveScore;
}

// Save Score and Name
function saveScore() {
	var userscore = {
		name: initial.value,
		fs: timeLeft,
	};
	highscores.push(userscore);
	window.localStorage.setItem('highscores', JSON.stringify(highscores));
	console.log('This is saved!');
	console.log(initial, timeLeft);
	document.getElementById('main').innerHTML = '';
	timeLeft = 55;
	questionindex = 0;
}

// Load Score and Name
var viewscore = document.querySelector('.highScore');
viewscore.addEventListener('click', loadScore);
function loadScore() {
	for (var i = 0; i < highscores.length; i++) {
		var n = document.createElement('h4');

		var currentHighscore = highscores[i];

		n.textContent = currentHighscore.name + ' - ' + currentHighscore.fs;

		scoreElement.appendChild(n);
	}
}

// Highscores
var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

// Start Button
startButton.onclick = startQuiz;
