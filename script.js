// ==========================================
// ОСНОВНЫЕ ЭЛЕМЕНТЫ
// ==========================================

const body = document.body;

const intro = document.getElementById("intro");

const envelope = document.getElementById("openInvitation");

const petalsContainer = document.getElementById("petals");

// ==========================================
// МУЗЫКА
// ==========================================

const weddingMusic = document.getElementById("weddingMusic");

const musicButton = document.getElementById("musicButton");

const musicIcon = document.getElementById("musicIcon");

let musicPlaying = false;

// Громкость музыки
if (weddingMusic) {
  weddingMusic.volume = 0.45;
}

// ==========================================
// ЗАПУСК МУЗЫКИ
// ==========================================

async function playMusic() {
  if (!weddingMusic) return;

  try {
    await weddingMusic.play();

    musicPlaying = true;

    musicButton?.classList.add("playing");

    if (musicIcon) {
      musicIcon.textContent = "♫";
    }
  } catch (error) {
    console.log("Браузер не разрешил автоматическое воспроизведение.");
  }
}

// ==========================================
// ОСТАНОВКА МУЗЫКИ
// ==========================================

function pauseMusic() {
  if (!weddingMusic) return;

  weddingMusic.pause();

  musicPlaying = false;

  musicButton?.classList.remove("playing");

  if (musicIcon) {
    musicIcon.textContent = "♪";
  }
}

// ==========================================
// КНОПКА МУЗЫКИ
// ==========================================

if (musicButton) {
  musicButton.addEventListener("click", () => {
    if (musicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
}

// ==========================================
// КОНВЕРТ
// ==========================================

body.classList.add("intro-open");

if (envelope && intro) {
  envelope.addEventListener("click", () => {
    if (envelope.classList.contains("open")) {
      return;
    }

    envelope.classList.add("open");

    // Запускаем музыку именно после
    // нажатия пользователя.
    playMusic();

    setTimeout(() => {
      intro.classList.add("closed");

      body.classList.remove("intro-open");

      // Показываем кнопку музыки
      musicButton?.classList.add("visible");
    }, 1200);
  });
}

// ==========================================
// REDUCED MOTION
// ==========================================

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// ==========================================
// ЛЕПЕСТКИ
// ==========================================

if (!reduceMotion && petalsContainer) {
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("span");

    petal.className = "petal";

    petal.style.setProperty("--left", `${Math.random() * 100}%`);

    petal.style.setProperty("--size", `${7 + Math.random() * 10}px`);

    petal.style.setProperty("--duration", `${9 + Math.random() * 12}s`);

    petal.style.setProperty("--delay", `${-Math.random() * 20}s`);

    petal.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);

    petalsContainer.appendChild(petal);
  }
}

// ==========================================
// АНИМАЦИИ ПРИ СКРОЛЛЕ
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// ==========================================
// ТАЙМЕР ҮЙЛӨНҮҮ ҮЛПӨТҮ
// 15 ОКТЯБРЬ 2026, 18:00
// Кыргызстан UTC+6
// ==========================================

const weddingDate = new Date("2026-10-15T18:00:00+06:00");

const daysElement = document.getElementById("days");

const hoursElement = document.getElementById("hours");

const minutesElement = document.getElementById("minutes");

const secondsElement = document.getElementById("seconds");

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();

  let difference = weddingDate.getTime() - now.getTime();

  if (difference <= 0) {
    if (daysElement) {
      daysElement.textContent = "00";
    }

    if (hoursElement) {
      hoursElement.textContent = "00";
    }

    if (minutesElement) {
      minutesElement.textContent = "00";
    }

    if (secondsElement) {
      secondsElement.textContent = "00";
    }

    return;
  }

  const dayMilliseconds = 1000 * 60 * 60 * 24;

  const hourMilliseconds = 1000 * 60 * 60;

  const minuteMilliseconds = 1000 * 60;

  const days = Math.floor(difference / dayMilliseconds);

  difference %= dayMilliseconds;

  const hours = Math.floor(difference / hourMilliseconds);

  difference %= hourMilliseconds;

  const minutes = Math.floor(difference / minuteMilliseconds);

  difference %= minuteMilliseconds;

  const seconds = Math.floor(difference / 1000);

  if (daysElement) {
    daysElement.textContent = formatNumber(days);
  }

  if (hoursElement) {
    hoursElement.textContent = formatNumber(hours);
  }

  if (minutesElement) {
    minutesElement.textContent = formatNumber(minutes);
  }

  if (secondsElement) {
    secondsElement.textContent = formatNumber(seconds);
  }
}

updateCountdown();

setInterval(updateCountdown, 1000);
