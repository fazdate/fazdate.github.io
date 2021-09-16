const game = () => {
    let pScore = 0
    let cScore = 0

    const startGame = () => {
        const playBtn = document.querySelector('.intro button')
        const introScreen = document.querySelector('.intro')
        const match = document.querySelector('.meccs')

        // A gombra klikkelve elindul az intro fadeout animációja és a meccs fadein animációja
        playBtn.addEventListener('click', () => {
            introScreen.classList.add("fadeOut")
            match.classList.add("fadeIn")
        })
    }

    const playMatch = () => {
        const options = document.querySelectorAll('.lehetosegek button')
        const playerHand = document.querySelector('.jatekos-kez')
        const computerHand = document.querySelector('.ai-kez')
        const hands = document.querySelectorAll('.kezek img')

        hands.forEach(hand => {
            hand.addEventListener("animationend", function() {
              this.style.animation = "";
            })
        })
        
        const computerOptions = ['ko', 'papir', 'ollo']
        // A lehetőségekre kattintva lefut 
        options.forEach(option => {
            option.addEventListener('click', function() {
                const number = Math.floor(Math.random() * 3)
                const computerChoice = computerOptions[number]
                
                setTimeout(() => {
                    compareHands(this.textContent, computerChoice);
                    playerHand.src = `./kepek/${this.textContent}.png`;
                    computerHand.src = `./kepek/${computerChoice}.png`;
                  }, 2000);

                playerHand.style.animation = "shakePlayer 2s ease"
                computerHand.style.animation = "shakeComputer 2s ease"
            })
        })
    }

    const updateScore = () => {
        const playerScore = document.querySelector('.jatekos-allas p')
        const computerScore = document.querySelector('.ai-allas p')
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }

    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.gyoztes')
        if (playerChoice == computerChoice) {
            winner.textContent = 'Döntetlen'
            return
        }

        if (playerChoice === 'ko') {
            if (computerChoice === 'ollo') {
                winner.textContent = 'Te nyertél'
                pScore++;
                updateScore();
                return
            } else {
                winner.textContent = 'Az AI nyert'
                cScore++;
                updateScore();
                return
            }
        }

        if (playerChoice === 'papir') {
            if (computerChoice === 'ko') {
                winner.textContent = 'Te nyertél'
                pScore++;
                updateScore();
                return
            } else {
                winner.textContent = 'Az AI nyert'
                cScore++;
                updateScore();
                return
            }
        }

        if (playerChoice === 'ollo') {
            if (computerChoice === 'papir') {
                winner.textContent = 'Te nyertél'
                pScore++;
                updateScore();
                return
            } else {
                winner.textContent = 'Az AI nyert'
                cScore++;
                updateScore();
                return
            }
        }
    }
    
    startGame()
    playMatch()
}

game()