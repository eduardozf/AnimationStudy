// Get screen center
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

// Recalculate window center after screen resize
window.addEventListener(
  "resize",
  () => {
    console.log("Resized");
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
  },
  true
);

function random(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function wordsToBlackHole(words) {
  // Create a container for the animation
  const containerElement = document.createElement("div");
  containerElement.style.position = "absolute";
  containerElement.style.top = "0";
  containerElement.style.left = "0";
  containerElement.style.width = "100%";
  containerElement.style.height = "100%";
  containerElement.style.overflow = "hidden";
  document.body.appendChild(containerElement);

  // Loops on each word
  words.forEach((word, index) => {
    // Delay between each word
    const delay = (index + 1) * 1000;

    // Space between each letter
    const letterSpacing = 25;

    const rightSide = index % 2 === 0;

    const startX = rightSide ? -50 : window.innerWidth + 50;
    const startY = rightSide
      ? random(100, window.innerHeight - 100) / 2
      : random(100, window.innerHeight - 100);

    // If starts from left side, rip apart word from the end to beginning
    if (startX < centerX) word = word.split("").reverse().join("");

    // Split word by letters
    [...word].forEach((letter, i) => {
      const letterSpan = document.createElement("span");
      letterSpan.className = "movingLetter";
      letterSpan.textContent = letter;
      letterSpan.style.position = "absolute";
      letterSpan.style.fontWeight = "bold"; // negrito

      letterSpan.style.left = `${
        rightSide ? startX + i * letterSpacing * -1 : startX + i * letterSpacing
      }px`;
      letterSpan.style.top = `${startY}px`;

      containerElement.appendChild(letterSpan);

      animateLetterToPoint(letterSpan, centerX, centerY, delay + i, i);
    });
  });
}

const animateLetterToPoint = (element, centerX, centerY, delay, index) => {
  // Animation duration
  const duration = index * 100 + 6_000;

  // Animation keyframes
  const animation = element.animate(
    [
      {
        fontSize: "48px",
        left: `${element.offsetLeft}px`,
        top: `${element.offsetTop}px`,
        opacity: 1,
      },
      {
        fontSize: "12px",
        left: `${centerX}px`,
        top: `${centerY}px`,
        opacity: 0,
      },
    ],
    {
      delay,
      duration,
      easing: "ease-in-out",
    }
  );

  // Remove element on finish
  animation.onfinish = () => element.parentNode.removeChild(element);
};

function particlesToBlackHole(numOfParticles) {
  const containerElement = document.createElement("div");
  containerElement.style.position = "absolute";
  containerElement.style.top = "0";
  containerElement.style.left = "0";
  containerElement.style.width = "100%";
  containerElement.style.height = "100%";
  containerElement.style.overflow = "hidden";
  document.body.appendChild(containerElement);

  const arrayOfParticles = [...new Array(numOfParticles)];

  arrayOfParticles.forEach(() => {
    const particle = document.createElement("span");
    particle.textContent = ".";
    particle.style.position = "absolute";
    particle.style.color = "#fff";
    particle.style.fontSize = `${random(12, 24)}px`;

    const startX = random(0, window.innerWidth);
    const startY = random(0, window.innerHeight);

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    containerElement.appendChild(particle);

    animateParticle(particle, centerX, centerY);
  });
}

function animateParticle(particle, centerX, centerY) {
  // Set a random duration
  const duration = random(5000, 10000);

  // Animate element
  const animation = particle.animate(
    [
      {
        transform: `translate(0, 0)`,
        opacity: 0,
      },
      {
        transform: `translate(0, 0)`,
        opacity: 1,
      },
      {
        transform: `translate(${centerX - parseFloat(particle.style.left)}px, ${
          centerY - parseFloat(particle.style.top)
        }px)`,
        opacity: 0,
      },
    ],
    {
      duration,
      easing: "ease-in-out",
    }
  );

  // Remove element on finish
  animation.onfinish = () => particle.parentNode.removeChild(particle);
}

// Verify if coord is near center area
function isNearCenter(x, y, area = 150) {
  const xBox = [centerX - area, centerX + area];
  const yBox = [centerY - area, centerY + area];

  if (x >= xBox[0] && x <= xBox[1] && y >= yBox[0] && y <= yBox[1]) return true;

  return false;
}

function createStars() {
  const starContainer = document.getElementById("starContainer");
  const star = document.createElement("span");
  star.classList.add("star");
  star.textContent = "●";

  const startX = random(0, window.innerWidth);
  const startY = random(0, window.innerHeight);

  const starSize = random(2, 6);
  star.style.fontSize = `${starSize}px`;
  star.style.opacity = random(0.1, 0.4);

  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  if (isNearCenter(startX, startY)) return createStars();

  starContainer.appendChild(star);

  // Each start has a animation delay different from each other
  const pulsateDelay = random(1000, 10000);
  setTimeout(() => {
    star.style.animationDuration = `${random(1500, 3000)}ms`;
  }, pulsateDelay);
}

function createStaticStars(numOfStarts) {
  const starsArr = [...new Array(numOfStarts)];
  starsArr.forEach(() => createStars());
}

function execute() {
  const words = ["A", "UNIVERSE", "OF", "ENDLESS", "POSSIBILITIES"];
  const numOfParticles = 20;

  // Execute animation immediately
  wordsToBlackHole(words);
  particlesToBlackHole(numOfParticles);
  createStaticStars(250);

  // Set animations loop time
  setInterval(() => wordsToBlackHole(words), 8_000);
  setInterval(() => particlesToBlackHole(numOfParticles), 5000);
}
