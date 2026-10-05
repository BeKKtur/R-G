// ==========================================
// БЛОКИ СТРАНИЦЫ
// ==========================================

const body = document.body;

const intro = document.getElementById("intro");

const envelope = document.getElementById("openInvitation");

const petalsContainer = document.getElementById("petals");

// Блокируем скролл, пока конверт закрыт
body.classList.add("intro-open");

// ==========================================
// ОТКРЫТИЕ КОНВЕРТА
// ==========================================

if (envelope && intro) {
  envelope.addEventListener("click", () => {
    // Не даём открыть второй раз
    if (envelope.classList.contains("open")) {
      return;
    }

    envelope.classList.add("open");

    // После анимации убираем заставку
    setTimeout(() => {
      intro.classList.add("closed");

      body.classList.remove("intro-open");
    }, 1200);
  });
}

// ==========================================
// ПРОВЕРКА НА УМЕНЬШЕНИЕ АНИМАЦИЙ
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

    // Случайная позиция
    petal.style.setProperty("--left", `${Math.random() * 100}%`);

    // Случайный размер
    petal.style.setProperty("--size", `${7 + Math.random() * 10}px`);

    // Скорость падения
    petal.style.setProperty("--duration", `${9 + Math.random() * 12}s`);

    // Чтобы лепестки сразу были
    // на разных этапах падения
    petal.style.setProperty("--delay", `${-Math.random() * 20}s`);

    // Движение влево / вправо
    petal.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);

    petalsContainer.appendChild(petal);
  }
}

// ==========================================
// АНИМАЦИЯ ПРИ СКРОЛЛЕ
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
// ДАТА СВАДЬБЫ
//
// В JavaScript:
// январь = 0
// февраль = 1
// ...
// октябрь = 9
//
// Поэтому 15 октября 2026:
// ==========================================

const weddingDate = new Date(2026, 9, 15, 16, 0, 0);

// ==========================================
// ЭЛЕМЕНТЫ ТАЙМЕРА
// ==========================================

const daysElement = document.getElementById("days");

const hoursElement = document.getElementById("hours");

const minutesElement = document.getElementById("minutes");

const secondsElement = document.getElementById("seconds");

// ==========================================
// ФОРМАТ ЧИСЕЛ
// ==========================================

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

// ==========================================
// ОБНОВЛЕНИЕ ТАЙМЕРА
// ==========================================

function updateCountdown() {
  const now = new Date();

  let difference = weddingDate.getTime() - now.getTime();

  // Если свадьба уже наступила
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

  // День = 24 часа
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

  // Выводим значения

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

// Первый запуск сразу
updateCountdown();

// Потом каждую секунду
setInterval(updateCountdown, 1000);
