let player = {
    name: "Bryan",
    chips: 100
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*10 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if(player.chips <= 0) {
        player.chips = 100
        playerEl.textContent = player.name + ": $" + player.chips
    }
    sum = 0
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {

    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        player.chips +=100
        playerEl.textContent = player.name + ": $" + player.chips
        hasBlackJack = true
    } else {
        let ace = false
        for (let i = 0; i < cards.length; i++) {
            if(cards[i] === 11) {
                cards[i] = 1
                sum -= 10
                ace = true
                break
            }
        }
        if (!ace){
            message = "You're out of the game!"
            player.chips -=100
            playerEl.textContent = player.name + ": $" + player.chips
            isAlive = false
        }
    }
    
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}
