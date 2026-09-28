// --- PILIH ELEMEN DARI HTML ---
const questionContainer = document.getElementById("questionContainer");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const heartLoader = document.getElementById("heartLoader");
const resultContainer = document.getElementById("resultContainer");
const gifResult = document.getElementById("gifResult");

let isFixed = false;
let yesScale = 1;

// --- FUNGSI MENGGERAKKAN TOMBOL "NO" KE SELURUH LAYAR ---
const moveNoButton = (e) => {
  if (e && e.type === "touchstart") {
    e.preventDefault(); // Mencegah tap langsung mengklik pada layar sentuh/HP
  }

  // Ambil ukuran tombol dan posisi saat ini
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  const curRect = noBtn.getBoundingClientRect();

  // Ubah ke position: fixed agar bisa bergerak bebas ke seluruh layar
  if (!isFixed) {
    noBtn.style.position = "fixed";
    noBtn.style.left = `${curRect.left}px`;
    noBtn.style.top = `${curRect.top}px`;
    noBtn.style.zIndex = "9999";
    isFixed = true;
  }

  // Margin dari tepi layar browser
  const margin = 24;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const minX = margin;
  const maxX = Math.max(minX, screenWidth - btnWidth - margin);
  const minY = margin;
  const maxY = Math.max(minY, screenHeight - btnHeight - margin);

  // Ambil posisi tombol Yes agar tombol No tidak menutupi tombol Yes
  const yesRect = yesBtn.getBoundingClientRect();
  const overlapsYes = (x, y) => {
    return (
      x < yesRect.right + 25 &&
      x + btnWidth > yesRect.left - 25 &&
      y < yesRect.bottom + 25 &&
      y + btnHeight > yesRect.top - 25
    );
  };

  let newX = minX;
  let newY = minY;
  let attempts = 0;

  // Cari posisi baru yang jauh dari kursor dan tidak menimpa tombol Yes
  do {
    newX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    newY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    attempts++;
  } while (
    attempts < 25 &&
    (Math.hypot(newX - curRect.left, newY - curRect.top) < 160 || overlapsYes(newX, newY))
  );

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  // Tombol Yes perlahan membesar secara interaktif
  if (yesScale < 1.8) {
    yesScale += 0.08;
    yesBtn.style.transform = `scale(${yesScale})`;
  }
};

// Pasang event listener ke tombol "No" untuk desktop dan mobile
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton, { passive: false });
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton(e);
});

// --- AKSI TOMBOL "YES" ---
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  noBtn.style.display = "none"; // Pastikan tombol No tersembunyi sepenuhnya
  heartLoader.style.display = "flex";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "flex";

    if (gifResult && typeof gifResult.play === "function") {
      gifResult.play();
    }
  }, 2000);
});