let stage = 1;
let score = 0;
let timer = 0;
let timerInterval;
let balloonPairs = [];
const colors = ["#FFD700", "#40E0D0", "#FF69B4", "#32CD32", "#FF1493"];

function startGame() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('game-stage').style.display = 'block';
    document.getElementById('sound').play();
    startTimer();
    loadStage();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').innerText = timer;
    }, 1000);
}

function loadStage() {
    document.getElementById('balloon-container').innerHTML = '';
    document.getElementById('next-stage').style.display = 'none';
    balloonPairs = generatePairs();
    shuffleArray(balloonPairs);
    createBalloons(balloonPairs);

    if (stage === 1) {
        document.getElementById('stage-instructions').innerText = 'Find pairs of balloons whose sum is 10';
    } else if (stage === 2) {
        document.getElementById('stage-instructions').innerText = 'Find pairs of balloons whose sum is 30';
    } else if (stage === 3) {
        document.getElementById('stage-instructions').innerText = 'Find pairs of balloons whose sum is 100';
    }
}

function generatePairs() {
    let pairs = [];
    if (stage === 1) {
        pairs = [[3, 7], [4, 6], [2, 8], [5, 5], [1, 9], [10, 0]];
    } else if (stage === 2) {
        pairs = [[15, 15], [10, 20], [25, 5], [12, 18], [7, 23], [14, 16], [13, 17], [11, 19], [9, 21], [6, 24]];
    } else if (stage === 3) {
        pairs = [[50, 50], [40, 60], [70, 30], [80, 20], [90, 10], [45, 55], [25, 75], [65, 35], [85, 15], [95, 5], [60, 40], [55, 45]];
    }
    return pairs.flat();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBalloons(numbers) {
    numbers.forEach((num, index) => {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = colors[index % colors.length];
        balloon.innerText = num;
        balloon.onclick = () => balloonClicked(balloon, num);
        document.getElementById('balloon-container').appendChild(balloon);
    });
}

let selectedBalloon = null;

function balloonClicked(balloon, num) {
    if (selectedBalloon === null) {
        selectedBalloon = { element: balloon, value: num };
        balloon.style.border = '2px solid #000';
    } else {
        const sum = selectedBalloon.value + num;
        const targetSum = stage === 1 ? 10 : stage === 2 ? 30 : 100;
        if (sum === targetSum) {
            score++;
            document.getElementById('score').innerText = score;
            balloon.style.visibility = 'hidden';
            selectedBalloon.element.style.visibility = 'hidden';
            document.getElementById('next-stage').style.display = 'block';
        }
        selectedBalloon.element.style.border = 'none';
        selectedBalloon = null;
    }
}

function nextStage() {
    if (stage < 3) {
        stage++;
        loadStage();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('game-stage').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('final-score').innerText = score;
}

function restartGame() {
    stage = 1;
    score = 0;
    timer = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timer;
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
}
