
const symbols = [
  'https://i.imgur.com/C4eGElP.png',
  'https://i.imgur.com/rRxQp4b.png',
  'https://i.imgur.com/pEhILs4.png',
  'https://i.imgur.com/VOPxJqE.png',
  'https://i.imgur.com/WbrmOqA.png',
  'https://i.imgur.com/wlBplKk.png',
  'https://i.imgur.com/bQ3obqZ.png',
  'https://i.imgur.com/1M3gkUN.png'
];

let coins = 1000;
let freeSpins = 0;
const gridEl = document.getElementById("grid");
const coinsEl = document.getElementById("coins");
const freeSpinInfo = document.getElementById("freeSpinInfo");
const multiplierDisplay = document.getElementById("multiplierDisplay");
const winSound = document.getElementById("winSound");
const zapSound = document.getElementById("zapSound");

function updateCoins(amount) {
  coins += amount;
  coinsEl.textContent = coins;
}

function generateGrid() {
  gridEl.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const div = document.createElement("div");
    div.className = "symbol";
    const img = document.createElement("img");
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    img.src = sym;
    div.appendChild(img);
    gridEl.appendChild(div);
  }
}

function spin(isFree) {
  if (!isFree && coins < 100) return alert("Koin tidak cukup");
  if (!isFree) updateCoins(-100);

  generateGrid();

  const win = Math.random() < 0.5;
  if (win) {
    setTimeout(() => {
      zapSound.play();
      winSound.play();
      const multiplier = Math.floor(Math.random() * 15) + 2;
      const winAmount = 100 * multiplier;
      updateCoins(winAmount);
      multiplierDisplay.textContent = `Total Pengali: ${multiplier}x | Menang: Rp ${winAmount}`;

      setTimeout(() => {
        generateGrid();
        winSound.play();
      }, 1000);

    }, 800);
  } else {
    multiplierDisplay.textContent = "";
  }

  if (freeSpins > 0) {
    freeSpins--;
    freeSpinInfo.textContent = `Spin Gratis Tersisa: ${freeSpins}`;
    if (freeSpins > 0) setTimeout(() => spin(true), 1500);
  } else {
    freeSpinInfo.textContent = "";
  }
}

function buyFreeSpin() {
  if (coins < 1000) return alert("Koin tidak cukup untuk beli Free Spin!");
  updateCoins(-1000);
  freeSpins = 10;
  spin(true);
}

generateGrid();
