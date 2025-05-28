function generateRandomFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000); //funkce pro generování náhodného 4místného čísla
}

let randomNumber;
let score = 0;
const gameContainer = document.getElementById('game-container');

document.getElementById('start-button').addEventListener('click', function() {
    function myTimer() { 
        time--; 
        document.getElementById("timer").innerHTML = time; //displays time 
    }
     
    var myTimer= setInterval(myTimer, 1000); //starts timer
    var time = 90; //time

    randomNumber = generateRandomFourDigitNumber();
    console.log('Generated Number:', randomNumber);

    document.getElementById('game-container').style.display = 'block';
    this.style.display = 'none';

    const rows = document.querySelectorAll('.number-row');
    rows.forEach((row, index) => {
        if (index === 0) {
            row.classList.remove('disabled');
        } else {
            row.classList.add('disabled');
        }
    }); //pouze první řádek je aktivní

    const inputs = document.querySelectorAll('.number-input');
    inputs.forEach(input => input.value = ''); //vymazání hodnoty inputů
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('guess-button').click();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        this.location.reload();
    }
});

document.getElementById('guess-button').addEventListener('click', function() {
    const rows = document.querySelectorAll('.number-row');
    let activeRowIndex = -1;

    rows.forEach((row, index) => {
        if (!row.classList.contains('disabled')) {
            activeRowIndex = index;
        }
    });

    const inputs = rows[activeRowIndex].querySelectorAll('.number-input');
    let allFilled = true; //kontrola, zda jsou všechny inputy vyplněny
    inputs.forEach(input => {
        if (input.value === '') {
            allFilled = false;
        }
    });

    if (!allFilled) {
        return;
    }

    let userGuess = '';

    inputs.forEach(input => {
        userGuess += input.value;
    });

    if (parseInt(userGuess) === randomNumber) { //výhra
        const randomNumberStr = randomNumber.toString();
        inputs.forEach((input, index) => {
            const guessedDigit = input.value;
            if (guessedDigit === randomNumberStr[index]) {
                input.style.backgroundColor = 'green';
            }
        });

        rows[activeRowIndex].classList.add('disabled');

        document.getElementById('guess-button').style.display = 'block';
        this.style.display = 'none';
        
        function myTimer() { 
            time--; 
            document.getElementById("timer").innerHTML = time; //displays time 
        }
        function stopTimer() { 
            clearInterval(myTimer); //stops timer 
        }

        stopTimer();

        const scoretext = document.createElement('h2');
        scoretext.textContent = 'SKÓRE: ' + score;
        gameContainer.appendChild(scoretext);

        const message = document.createElement('h2');
        message.textContent = 'Fakt masivní guess';
        gameContainer.appendChild(message);

        const restartButton = document.createElement('button');
        restartButton.id = 'restart-button';
        restartButton.textContent = 'Restart';
        gameContainer.appendChild(restartButton);

        restartButton.addEventListener('click', function() {
            location.reload();
        });
        return;
    }

    const randomNumberStr = randomNumber.toString(); //převedení na string
    inputs.forEach((input, index) => {
        const guessedDigit = input.value;

        if (guessedDigit === randomNumberStr[index]) { //obarvení
            input.style.backgroundColor = 'green';
        } else if (randomNumberStr.includes(guessedDigit)) {
            input.style.backgroundColor = 'yellow';
        } else {
            input.style.backgroundColor = 'red';
        }
    });

    if (activeRowIndex + 1 < rows.length) {
        rows[activeRowIndex].classList.add('disabled');
        rows[activeRowIndex + 1].classList.remove('disabled'); //přepnutí na další řádek
    } else { //prohra
        document.getElementById('guess-button').style.display = 'block';
        this.style.display = 'none';
        
        function myTimer() { 
            time--; 
            document.getElementById("timer").innerHTML = time; //displays time 
        }
        function stopTimer() { 
            clearInterval(myTimer); //stops timer 
        }

        stopTimer();

        const scoretext = document.createElement('h2');
        scoretext.textContent = 'SKÓRE: ' + score;
        gameContainer.appendChild(scoretext);

        const failureMessage = document.createElement('h2');
        failureMessage.textContent = 'Tady vidím velký špatný, správné číslo bylo: ' + randomNumber;
        gameContainer.appendChild(failureMessage);

        const restartButton = document.createElement('button');
        restartButton.id = 'restart-button';
        restartButton.textContent = 'Restart';
        gameContainer.appendChild(restartButton);

        restartButton.addEventListener('click', function() {
            location.reload();
        });
    }
});

const numberInputs = document.querySelectorAll('.number-input'); //přepínání mezi inputy
numberInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
        const nextInput = numberInputs[index + 1];
        if (nextInput && !nextInput.parentElement.classList.contains('disabled')) {
            nextInput.focus();
        }
    });
});

numberInputs.forEach((input, index) => { //přepínání mezi inputy (backspace)
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Backspace' && this.value === '') {
            const previousInput = numberInputs[index - 1];
            if (previousInput && !previousInput.parentElement.classList.contains('disabled')) {
                previousInput.focus();
                previousInput.value = '';
            }
        }
    });
});

document.querySelectorAll('.number-input').forEach(input => { // omezení na 1 znak
    input.addEventListener('input', function() {
        if (this.value.length > 1) {
            this.value = this.value.slice(0, 1);
        }
    });
});

const h1 = document.querySelector('h1'); // tooltip
const tooltip = document.getElementById('tooltip');

h1.addEventListener('mouseover', (e) => {
    tooltip.style.display = 'block';
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
});

h1.addEventListener('mousemove', (e) => {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
});

h1.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
});