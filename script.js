document.body.classList.add("intro-open");

const intro = document.getElementById("intro");
const envelope = document.getElementById("openInvitation");
const petalsContainer = document.getElementById("petals");

// Открытие свадебного приглашения
envelope.addEventListener("click", () => {
  if (envelope.classList.contains("open")) return;

  envelope.classList.add("open");

  setTimeout(() => {
    intro.classList.add("closed");
    document.body.classList.remove("intro-open");
  }, 1200);
});

// Создание падающих лепестков
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!reduceMotion) {
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

// Появление элементов при скролле
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
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Таймер до свадьбы
// Формат: год, месяц (0 = январь), день, час, минута
const weddingDate = new Date(2027, 5, 20, 16, 0, 0);

const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function updateCountdown() {
  const difference = weddingDate.getTime() - Date.now();

  if (difference <= 0) {
    Object.values(countdownElements).forEach((element) => {
      element.textContent = "00";
    });
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  countdownElements.days.textContent = String(days).padStart(3, "0");
  countdownElements.hours.textContent = String(hours).padStart(2, "0");
  countdownElements.minutes.textContent = String(minutes).padStart(2, "0");
  countdownElements.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Подтверждение присутствия через WhatsApp
const rsvpForm = document.getElementById("rsvpForm");
const formNote = document.getElementById("formNote");

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);
  const name = String(formData.get("name")).trim();
  const attendance = String(formData.get("attendance"));

  if (!name) return;

  // ЗАМЕНИ на номер организатора в международном формате,
  // только цифры, без +, пробелов и скобок.
  const phone = "996700123456";

  const message =
    `Здравствуйте! Я ${name}.\n` +
    `Ответ на приглашение Амины и Тимура: ${attendance}`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  formNote.textContent = "Открываем WhatsApp для отправки ответа...";

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
