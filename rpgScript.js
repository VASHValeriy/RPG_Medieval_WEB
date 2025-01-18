let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// Request buttons - запрос кнопок
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');

// Parameters
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');



// Назначаем обработчики на кнопки
button1.addEventListener("click", () => changeBackground(location));
button2.addEventListener("click", () => changeBackground(location));
button3.addEventListener("click", () => changeBackground(location));

// initialize buttons.
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon ;

const volumeControl = document.getElementById('volume')
volumeControl.addEventListener('input', (event) => {
  if (currentAudio) {
      currentAudio.volume = parseFloat(event.target.value)
  }
})

function playRandomTrack () {
  const audioTracks = [
      './music/fight1.mp3',
      './music/fight2.mp3',
      './music/fight3.mp3',
      './music/medieval-bg-music1.mp3',
      './music/medieval-bg-music2.mp3',
      './music/medieval-bg-music3.mp3',
  ]
  const randomIndex = Math.floor(Math.random() * audioTracks.length);


  currentAudio = new Audio(audioTracks[randomIndex]);

  currentAudio.volume = parseFloat(volumeControl.value)

  currentAudio.play();
}

// Функции для смены фона
function changeBackground(location, currentMonster) {
  if (location.name === "town square") {
      document.documentElement.style.backgroundImage = "url('images/medieval-city-of-magic-and-knights--add-subtle-acc.png')";
  } else if (location.name === "store") {
      document.documentElement.style.backgroundImage = "url('images/store_women_redhair.jpg')";
  } else if (location.name === "cave") {
      document.documentElement.style.backgroundImage = "url('images/a-dark--sinister-medieval-cave-interior-with-an-op.png')";
  } else if (location.name === "fight") {
      console.log('Должны быть монстры')
    // Проверка на тип монстра
    if (currentMonster && currentMonster.name === "slime") {
      document.documentElement.style.backgroundImage = "url('images/fight-slime.jpg')";
    } else if (currentMonster && currentMonster.name === "fanged beast") {
      document.documentElement.style.backgroundImage = "url('images/a-tense-medieval-fantasy-scene-set-in-a-dark-and-o.png')";
    } else if (currentMonster && currentMonster.name === "dragon") {
      document.documentElement.style.backgroundImage = "url('images/knight-fighting-a-huge-green-dragon.png')";
    } 
  } else {
      document.documentElement.style.backgroundImage = "url('images/medieval-city-of-magic-and-knights--add-subtle-acc.png')";
  }
}

function update(location) {
    monsterStats.style.display = 'none';
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;

    changeBackground(location);
  }

  

const locations = [
    {
      // локация0
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Fight dragon"],
      "button functions": [goStore, goCave, fightDragon],
      text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
      // локация1
      name: "store",
      "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the store."
    },
    {
      // локация2
      name: "cave",
      "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
      "button functions": [fightSlime, fightBeast, goTown],
      text: "You enter the cave. You see some monsters."
    },
    {
      // локация3
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a monster."
    },
    {
      // локация4
      name: "kill monster",
      "button text": ["Go to town square","Go to town square","Go to town square"],
      "button functions": [goTown,easterEgg ,goTown],
      text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
      // локация5
      name: "easter egg",
      "button text": ["2" ,"8" ,"Go to town square?"],
      "button functions": [pickTwo ,pickEight ,goTown ],
      text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    },
    {
      // локация6
      name: "lose",
      "button text": ["REPLAY?","REPLAY?","REPLAY?"],
      "button functions": [restart ,restart ,restart ],
      text: "LOL! YOU DIED 🤡"
    },
    {
      // локация7
      name: "win",
      "button text": ["REPLAY?","REPLAY?","REPLAY?"],
      "button functions": [restart ,restart ,restart ],
      text: "You defeat the dragon! YOU WIN THE GAME! 🎉;"
    },
    
];

const weapons = [
    {
      name: 'stick',
      power: 5,
    },
    {
      name: 'dagger',
      power: 30,
    },
    {
      name: 'claw hammer',
      power: 50,
    },
    {
      name: 'sword',
      power: 100,
    },
  ];

const monsters = [
    {
      name: 'slime',
      level: 2,
      health: 15,
    },
    {
      name: 'fanged beast',
      level: 8,
      health: 60,
    },
    {
      name: 'dragon',
      level: 20,
      health: 300,
    },
];


// Go to
function goTown() {
  if (fighting !== null && fighting === 2 && monsterHealth <= 0) {
    winGame(); // Если игрок победил дракона и пытается вернуться в город, показываем победу
  } else {
    fighting = null;
    update(locations[0]); // Обычный переход в город
  }
}

function goStore() {
    update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function goFight() {
  if (fighting === null || fighting === undefined) {
    goTown();
    return;
  }
    update(locations[3]);
    const currentMonster = monsters[fighting];
    changeBackground(locations[3], currentMonster); 
    console.log(currentMonster)
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText  = monsterHealth;
}

function buyHealth() {
    if (gold >= 10) {
        goldText.innerText = gold -= 10;
        healthText.innerText = health += 10;
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (currentWeaponIndex < weapons.length - 1) {
        if (gold >= 30) {
            goldText.innerText = gold -= 30;
            currentWeaponIndex++;
            let newWeapon = weapons[currentWeaponIndex].name;
            text.innerText = "You now have a " + newWeapon + '.';
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
      }
}

function sellWeapon() {
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

// Fights
function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon () {
    fighting = 2;
    goFight();
}

// Controls
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  }else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  }  else if (monsterHealth <= 0) {
    defeatMonster();
  }

  if (Math.random() <= .1 && inventory.length !== 1){
    text.innerText += " Your " + inventory.pop() + " breaks."
    currentWeaponIndex--
  };
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
} 

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  
  if (fighting === 2) {
    winGame();
  } else {
    fighting = null; // Убедимся, что состояние боя сбрасывается
    monsterHealth = 0; 
    update(locations[4]); // Иначе показываем стандартный экран после победы над монстром
  }

  fighting = null;
  monsterHealth = 0;
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ['stick']

  goldText.innerText = gold;
  healthText.innerText = health;
  xpText .innerText = xp;

  goTown();
}

function easterEgg() {
  if (health <= 0) {
    lose();
   } else {
    update(locations[5]);
  }
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess) && health > 0) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
    goTown();
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    goTown();
    if(health <= 0) {
      lose();
    }
  }
}

function pickTwo() {
  pick(2)
}

function pickEight() {
  pick(8)
}

function lose() {
  update(locations[6]);
}

function winGame() {
  update(locations[7]);
}
playRandomTrack ();