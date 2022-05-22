// Setup global state
const player = {
    name: "Player",
    chips: 150
}
let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0
let isAlive = false

// Grab references to HTML tags
const messageEl = document.getElementById("message-el")
const playerSumEl = document.getElementById("sum-el")
const playerCardsEl = document.getElementById("cards-el")
const playerEl = document.getElementById("player-el")
const dealerCardsEl = document.getElementById("dealer-el")
const dealerSumEl = document.getElementById("dealerSum-el")
const resultEl = document.getElementById("result-el")

function renderChips() {
    playerEl.textContent = player.name + ": $" + player.chips
}

renderChips()

// cardPool is the set of cards already drawn by either the player or the dealer
function getRandomCard(cardPool) {
    // randomNumber is between 1 and 13 because while you can normaly have a value between 1 and 14 (cars above 10: A,J,Q,K)
    // the game is simplified so that Ace (A) has value 11 the first time you get it and then it has value 1 
    const randomNumber = Math.floor(Math.random() * 12) + 1

    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1 && !cardPool.includes(11)) {
        return 11
    }
    return randomNumber
}

// run when Start Game button is clicked
function startGame() {
    if (isAlive){
        return
    }
    isAlive = true
    cards = []
    // player always starts with 2 cards
    cards.push(getRandomCard(cards))
    cards.push(getRandomCard(cards))
    sum = cards[0] + cards[1]
    dealerCards = [getRandomCard(dealerCards)]
    dealerSum = dealerCards[0]
    renderGame()
}

// draw the current state of the game on screen
function renderGame() {
    playerCardsEl.textContent = "Your cards: "
    dealerCardsEl.textContent = "Dealer's cards: " + dealerCards[0]
    dealerSumEl.textContent = "Dealer's sum: " + dealerSum
    playerSumEl.textContent = "Sum: " + sum

    for (let i = 0; i < cards.length; i++) {
        playerCardsEl.textContent += cards[i] + " "
    }

    let message = "Do you want another card ?"
    
    if (sum === 21) {
        message = "BJ !"
        resultEl.textContent = player.name + " wins !"
        player.chips += 10
        isAlive = false
    } else if (sum > 21) {
        message = sum + "Bust !"
        resultEl.textContent = "Dealer wins !"
        player.chips -= 10
        isAlive = false
    }
    renderChips()
    messageEl.textContent = message
}

// run when New Card button is clicked
function newCard() {
    if (isAlive) {
        let card = getRandomCard(cards)
        sum += card
        cards.push(card)
        renderGame()
    }
}

// run when Stand button is clicked
function stand() {
    if (!isAlive) {
        return
    }
    isAlive = false
    while (dealerSum < 16) {
        let card = getRandomCard(dealerCards)
        dealerSum += card
        dealerCards.push(card)
    }

    for (let x = 1; x < dealerCards.length; x++) {
        dealerCardsEl.textContent += " " + dealerCards[x]
    }

    dealerSumEl.textContent = "Dealer's sum: " + dealerSum

    messageEl.textContent = player.name + " stands"
    if (dealerSum < sum || dealerSum > 21) {
        resultEl.textContent = player.name + " wins"
        player.chips += 10
    } else if (dealerSum === sum) {
        resultEl.textContent = "Money back"
    } else {
        resultEl.textContent = "Dealer wins"
        player.chips -= 10
    }

    renderChips()
}

