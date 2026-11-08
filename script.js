/* =========================
   CONFIGURATION
========================= */

const CONFIG = {
  weddingDate: "2027-03-14T11:00:00+08:00",

  whatsappNumber: "6281234567890",

  bank: "BCA",
  accountNumber: "1234567890",
  accountOwner: "Bayu"
};


/* =========================
   GUEST PERSONALIZATION
========================= */

const params = new URLSearchParams(window.location.search);

let guest = params.get("to");

if (guest) {
  guest = guest
    .replace(/\+/g, " ")
    .trim();

  document.getElementById("guestName").textContent = guest;
}


/* =========================
   OPEN INVITATION
========================= */

const cover = document.getElementById("cover");
const main = document.getElementById("main");
const music = document.getElementById("music");
const openButton = document.getElementById("openInvitation");

document.body.style.overflow = "hidden";

openButton.addEventListener("click", async () => {

  cover.classList.add("closed");

  main.classList.remove("hidden");

  document.body.style.overflow = "auto";

  try {
    await music.play();
  } catch (error) {
    console.log("Music could not autoplay:", error);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================
   COUNTDOWN
========================= */

const target = new Date(CONFIG.weddingDate).getTime();

function updateCountdown() {

  const distance = target - Date.now();

  if (distance <= 0) {
    setCountdown(0, 0, 0, 0);
    return;
  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (distance / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (distance / 1000) % 60
  );

  setCountdown(
    days,
    hours,
    minutes,
    seconds
  );
}


function setCountdown(days, hours, minutes, seconds) {

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   WHATSAPP
========================= */

const whatsapp =
  `https://wa.me/${CONFIG.whatsappNumber}`;

const name =
  guest || "tamu";

const rsvpMessage =
  `Halo Bayu & Bella, saya ${name} ingin melakukan RSVP untuk acara pernikahan pada 14 Maret 2027.`;

const wishMessage =
  `Halo Bayu & Bella, saya ${name} ingin memberikan ucapan untuk kalian. Semoga pernikahan kalian dipenuhi kebahagiaan dan keberkahan.`;


document.getElementById("rsvpButton").href =
  `${whatsapp}?text=${encodeURIComponent(rsvpMessage)}`;

document.getElementById("wishButton").href =
  `${whatsapp}?text=${encodeURIComponent(wishMessage)}`;


/* =========================
   COPY BANK ACCOUNT
========================= */

const copyButton =
  document.getElementById("copyAccount");

copyButton.addEventListener("click", async () => {

  try {

    await navigator.clipboard.writeText(
      CONFIG.accountNumber
    );

    copyButton.textContent = "Copied";

    setTimeout(() => {
      copyButton.textContent = "Copy Account Number";
    }, 1800);

  } catch {

    alert(CONFIG.accountNumber);

  }

});