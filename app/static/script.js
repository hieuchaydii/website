// theme.js

document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggle-dark-mode");
    const currentTheme = localStorage.getItem("theme") || "light";

    // Áp dụng chế độ hiện tại
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        toggleButton.textContent = "Chế Độ Sáng";
    } else {
        toggleButton.textContent = "Chế Độ Tối";
    }

    // Xử lý sự kiện khi nhấn nút chuyển đổi
    toggleButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
            toggleButton.textContent = "Chế Độ Sáng";
        } else {
            toggleButton.textContent = "Chế Độ Tối";
        }
        localStorage.setItem("theme", theme);
    });
});
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

cards.forEach(card => card.addEventListener('click', flipCard));

document.getElementById('restart-btn').addEventListener('click', () => {
    cards.forEach(card => card.classList.remove('flip'));
    resetBoard();
    shuffle();
});

// Shuffle cards on page load
shuffle();
