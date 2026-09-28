// --- PILIH ELEMEN DARI HTML ---
const questionContainer = document.getElementById("questionContainer");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const heartLoader = document.getElementById("heartLoader");
const resultContainer = document.getElementById("resultContainer");
const gifResult = document.getElementById("gifResult");

let isAbsolute = false;
let yesScale = 1;

// --- FUNGSI MENGGERAKKAN TOMBOL "NO" ---
const moveNoButton = (e) => {
  if (e && e.type === "touchstart") {
    e.preventDefault(); // Mencegah tap langsung mengklik pada layar sentuh/HP
  }

  // Aktifkan absolute positioning saat pertama kali didekati/disentuh
  if (!isAbsolute) {
    noBtn.style.position = "absolute";
    noBtn.style.zIndex = "10";
    isAbsolute = true;
  }

  // Ambil ukuran kontainer dan tombol
  const containerWidth = questionContainer.clientWidth;
  const containerHeight = questionContainer.clientHeight;
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  // Batas margin agar tombol tidak keluar dari kontainer kartu
  const padding = 16;
  const minX = padding;
  const maxX = Math.max(minX, containerWidth - btnWidth - padding);
  const minY = padding;
  const maxY = Math.max(minY, containerHeight - btnHeight - padding);

  const curX = noBtn.offsetLeft;
  const curY = noBtn.offsetTop;

  let newX = minX;
  let newY = minY;
  let attempts = 0;

  // Cari posisi baru yang tidak terlalu dekat dengan kursor/posisi sebelumnya
  do {
    newX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    newY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    attempts++;
  } while (
    attempts < 15 &&
    Math.hypot(newX - curX, newY - curY) < 70
  );

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  // Tombol Yes perlahan membesar secara interaktif
  if (yesScale < 1.6) {
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
  heartLoader.style.display = "flex";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "flex";

    if (gifResult && typeof gifResult.play === "function") {
      gifResult.play();
    }
  }, 2000);
});