const CA = "0xtba";
const CHAIN = "solana";
const DEX = `https://dexscreener.com/${CHAIN}/${CA}`;
const EMBED = `${DEX}?embed=1&loadChartSettings=0&trades=0&tabs=0&info=1&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15`;

const dexIframe = document.getElementById("dex-iframe");
const dexOpen = document.getElementById("dex-open");
const dexLink = document.getElementById("dex-link");
const pumpLink = document.getElementById("pump-link");
const buyLink = document.getElementById("buy-link");
const navBuy = document.getElementById("nav-buy");
const xLinks = document.querySelectorAll('a[href*="x.com"], a[href*="twitter.com"]');
const toast = document.getElementById("toast");
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

if (dexIframe) dexIframe.src = EMBED;
if (dexOpen) dexOpen.href = DEX;
if (dexLink) dexLink.href = DEX;
const PUMP = `https://pump.fun/coin/${CA}`;
const X = "https://x.com/DJTCryptoBoss";
if (pumpLink) pumpLink.href = PUMP;
if (buyLink) buyLink.href = PUMP;
if (navBuy) navBuy.href = PUMP;
xLinks.forEach((a) => {
  a.href = X;
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyCa(value) {
  try {
    await navigator.clipboard.writeText(value);
    showToast("Contract copied: " + value);
  } catch {
    showToast("Copy failed — select the CA manually");
  }
}

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", () => copyCa(btn.getAttribute("data-copy") || CA));
});

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}
