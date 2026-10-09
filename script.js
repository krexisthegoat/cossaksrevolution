// ====== CONFIG — change these to customize ======
const BRAND = "NITFLEX";          // your site name (used in the intro + header)
const INTRO_LENGTH_MS = 3600;  // how long the intro plays before the page shows

const ROWS = [
  { title: "Trending Now",        count: 12 },
  { title: "Continue Watching",   count: 8  },
  { title: "Top Picks for You",   count: 12, tall: true },
  { title: "New Releases",        count: 12 },
  { title: "Action & Adventure",  count: 12 },
  { title: "Comedies",            count: 12 },
];
// ================================================

const intro     = document.getElementById("intro");
const introLogo = document.getElementById("introLogo");
const app       = document.getElementById("app");
const topbar    = document.getElementById("topbar");

// --- set brand name everywhere ---
document.title = BRAND;
document.getElementById("brand").textContent = BRAND;
document.getElementById("footerBrand").textContent = BRAND;
document.getElementById("year").textContent = new Date().getFullYear();

// --- build intro letters (each one animates in separately) ---
const letters = [...BRAND];
introLogo.style.setProperty("--n", Math.max(letters.length, 2));
letters.forEach((ch, i) => {
  const span = document.createElement("span");
  span.textContent = ch === " " ? "\u00A0" : ch;
  span.style.setProperty("--i", i);
  introLogo.appendChild(span);
});

// --- intro -> browse page ---
let finished = false;
function endIntro() {
  if (finished) return;
  finished = true;
  intro.classList.add("intro-out");
  app.hidden = false;
  requestAnimationFrame(() => app.classList.add("app-in"));
  setTimeout(() => intro.remove(), 900);
}

const timer = setTimeout(endIntro, INTRO_LENGTH_MS);
document.getElementById("skipIntro").addEventListener("click", () => {
  clearTimeout(timer);
  endIntro();
});

// skip the animation for people who have reduced motion turned on
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  clearTimeout(timer);
  endIntro();
}

// --- build the rows of blank tiles ---
const rowsEl = document.getElementById("rows");

ROWS.forEach(({ title, count, tall }) => {
  const row = document.createElement("section");
  row.className = "row" + (tall ? " tall" : "");
  row.innerHTML = `
    <h2>${title}</h2>
    <div class="row-wrap">
      <button class="arrow left" aria-label="Scroll left">&lsaquo;</button>
      <div class="track"></div>
      <button class="arrow right" aria-label="Scroll right">&rsaquo;</button>
    </div>`;

  const track = row.querySelector(".track");
  for (let i = 0; i < count; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    // later: tile.style.backgroundImage = `url(posters/whatever.jpg)`;
    track.appendChild(tile);
  }

  const step = () => track.clientWidth * 0.9;
  row.querySelector(".arrow.left").addEventListener("click", () =>
    track.scrollBy({ left: -step() }));
  row.querySelector(".arrow.right").addEventListener("click", () =>
    track.scrollBy({ left: step() }));

  rowsEl.appendChild(row);
});

// --- header goes solid once you scroll ---
window.addEventListener("scroll", () => {
  topbar.classList.toggle("solid", window.scrollY > 40);
}, { passive: true });
