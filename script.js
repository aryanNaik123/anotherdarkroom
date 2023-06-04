// Game state
let fire = false;
let wood = 0;
let gatherCooldown = false;

// Elements
const output = document.getElementById("output");

// Functions
function updateOutput() {
  let outputText = "";

  if (fire) {
    outputText += "The fire is burning 🏕️🔥.<br>";
  } else {
    outputText += "It's cold. You should start a fire.<br>";
  }

  outputText += `Wood: ${wood}<br>`;

  output.innerHTML = outputText;
}

function gatherWood() {
  if (!gatherCooldown) {
    wood += 1;
    updateOutput();
    gatherCooldown = true;

    // Add the 'disabled' class to the button
    const gatherButton = document.getElementById("gatherButton");
    gatherButton.classList.add("disabled");

    setTimeout(function () {
      gatherCooldown = false;

      // Remove the 'disabled' class after the cooldown expires
      gatherButton.classList.remove("disabled");
    }, 2000); // Set the cooldown duration in milliseconds (e.g., 2000 = 2 seconds)
  }
}
const burnRate = 3; // Number of wood burns per second
let fireTimeout;
let fireDuration = 0; // Track the duration of the fire

// Functions
function burnWood() {
  if (wood >= 2) {
    // Check if the player has at least 2 pieces of wood
    wood -= 2; // Burn two pieces of wood
    updateOutput();
    clearTimeout(fireTimeout);
    fire = true; // Set fire to true

    fireTimeout = setTimeout(function () {
      fire = false;
      updateOutput();
    }, 120000); // Fire duration set to 2 minutes (120 seconds)

    updateOutput();
  }
}
// Variables
let inventory = [];
const maxInventorySize = 5;
let inventoryInterval;

// Functions
function dropRandomItem() {
  if (inventory.length < maxInventorySize) {
    // Define your list of possible items
    const items = ["🗡️", "🛡️", "🧪", "📜", "💎"];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    inventory.push(randomItem);
    updateInventory();
  }
}

function updateInventory() {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  for (let i = 0; i < inventory.length; i++) {
    const item = inventory[i];
    const div = document.createElement("div");
    div.classList.add("inventory-item");
    div.innerText = item;
    itemList.appendChild(div);
  }
}

// Start dropping random items every x minutes
inventoryInterval = setInterval(dropRandomItem, 10000);

updateOutput();
