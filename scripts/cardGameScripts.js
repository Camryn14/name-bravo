export function makeDeckOfCards() {
  const suits = ["🐟", "🐠", "🐡"];
  let deckOfCards = [];

  for (let i = 1; i <= 13; i++) {
    suits.forEach((suit) => {
      deckOfCards.push(suit + i);
    });
  }

  return deckOfCards;
}

// ===== GET 2 RANDOM CARDS =====
export function getTwoRandomCards(deck) {
  let index1 = Math.floor(Math.random() * deck.length);
  let index2 = Math.floor(Math.random() * deck.length);
  while (index2 === index1) {
    index2 = Math.floor(Math.random() * deck.length);
  }
  return [deck[index1], deck[index2]];
}

// ===== STORAGE DISPLAY =====
export function displayStorageData() {
  $('#cookieData').text(document.cookie || 'None');

  const sessionItems = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    sessionItems.push(`${key}: ${sessionStorage.getItem(key)}`);
  }
  $('#sessionData').text(sessionItems.length > 0 ? sessionItems.join(', ') : 'None');

  const localItems = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localItems.push(`${key}: ${localStorage.getItem(key)}`);
  }
  $('#localData').text(localItems.length > 0 ? localItems.join(', ') : 'None');
}

// ===== INIT GAME =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");

  const deck = makeDeckOfCards();
  console.log("Deck:", deck);

  // Display full deck (optional)
  const stackEl = document.getElementById('stackOfCards');
  let deckP = document.createElement('p');
  deckP.classList.add('text-wrap');
  deckP.textContent = deck.join(' ');
  stackEl.appendChild(deckP);

  displayStorageData();
  setInterval(displayStorageData, 2000);

  const button = document.getElementById("drawCardBtn");
  const outputContainer = document.getElementById("cardOutput");

  if (button && outputContainer) {
    button.addEventListener("click", () => {
      outputContainer.innerHTML = ""; // Clear previous cards
      const twoCards = getTwoRandomCards(deck);

      twoCards.forEach((cardText, i) => {
        const card = document.createElement("div");
        card.classList.add("drag");
        card.textContent = cardText;

        // Card styles
        Object.assign(card.style, {
          position: "absolute",
          left: 10 + i * 60 + "px",
          top: "10px",
          fontSize: "20px",
          fontWeight: "bold",
          width: "50px",
          height: "70px",
          textAlign: "center",
          lineHeight: "70px",
          border: "1px solid #333",
          borderRadius: "5px",
          background: "#fff",
          cursor: "grab",
          userSelect: "none",
        });

        // ===== DRAG LOGIC =====
        card.addEventListener("mousedown", (e) => {
          const shiftX = e.clientX - card.getBoundingClientRect().left;
          const shiftY = e.clientY - card.getBoundingClientRect().top;

          function moveAt(pageX, pageY) {
            card.style.left = pageX - shiftX + "px";
            card.style.top = pageY - shiftY + "px";
          }

          function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
          }

          document.addEventListener("mousemove", onMouseMove);

          card.onmouseup = () => {
            document.removeEventListener("mousemove", onMouseMove);
            card.onmouseup = null;
          };
        });

        card.ondragstart = () => false;
        outputContainer.appendChild(card);
      });
    });
  }

  // ===== SETTINGS FORM (example) =====
  const settingsForm = document.getElementById("settingsForm");
  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const playerName = settingsForm.playerName.value;
      const theme = settingsForm.theme.value;

      // Save to localStorage
      localStorage.setItem("playerName", playerName);
      localStorage.setItem("theme", theme);

      // Apply theme
      document.body.className = theme;

      alert("Settings saved!");
    });
  }

  // Easter egg
  console.log("💡 Hint: Click draw twice quickly for a secret!");
});
