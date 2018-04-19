document.addEventListener("DOMContentLoaded", () => {
    const words = ["tiger", "lion", "panther", "cheetah"];
    const input = document.querySelector("#input");
    const board = document.querySelector("#wordguess");
    const submit = document.querySelector("#submitguess");

    let answer = "";
    let guessedLetters = [];
    let correctLetters = [];

    let guesses = 3;

    // Grab a random answer.
    answer = randomWord();
    console.log(`Answer: ${answer}`);

    // Store unique letters in "answer".
    correctLetters = [...new Set(answer)];

    // Place the spaces for the board.
    board.innerText = "_ ".repeat(answer.length);

    // Returns a random word from the "words" array.
    function randomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }
    
    // Guess submitted.
    submit.addEventListener("click", () => {
        let guess = input.value;
        checkGuess(guess);
    });

    // Validate Guess and check if game is over.
    function checkGuess(guess) {
        if (guess.length == 0) {
            // Empty guess.
            alert("The guess box cannot be empty. Enter a letter.");
            return;
        } else if (guess.length > 1) {
            // Guess is more than 1 character.
            alert("Please enter only one letter in the guess box.");
            return;
        }

        // Single character submitted, 3 possibilities:
        if (guessedLetters.includes(guess)) {
            // This guess has already been made.
            alert("You've already guessed that letter.");
        } else {
            // This is the first time this letter was guessed.
            guessedLetters.push(guess);

            // Correct guess.
            if (correctLetters.includes(guess)) {
                let boardText = answer;
                boardText = boardText
                    .split("")
                    .map(ch => (guessedLetters.includes(ch) ? ch : "_"))
                    .join(" ");
                board.innerText = boardText;

                // You've won.
                if (!boardText.includes("_")) {
                    alert("You win, congrats!");
                    input.disabled = true;
                    submit.disabled = true;
                    //Start game over when won.
                    window.location.reload();
                }
                

            } else {
                // Incorrect guess.
                alert("Incorrect Guess. Try again.");
                guesses--;

                if (guesses == 0) {
                    alert("You lost, sorry.");
                    input.disabled = true;
                    submit.disabled = true;
                }
            }
        }
    }
    
});