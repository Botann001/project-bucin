// --- BAGIAN TAMBAHAN: Pilih elemen dari HTML ---
const questionContainer = document.getElementById("questionContainer");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const heartLoader = document.getElementById("heartLoader");
const resultContainer = document.getElementById("resultContainer");
const gifResult = document.getElementById("gifResult");
// ----------------------------------------------


// --- KODE ASLI ANDA ---
noBtn.addEventListener("mouseover", () => {
  // Kita kurangi 50px agar tombol tidak keluar sebagian dari kontainer
  const newX = Math.floor(Math.random() * (questionContainer.offsetWidth - 50));
  const newY = Math.floor(Math.random() * (questionContainer.offsetHeight - 50));
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});

yesBtn.addEventListener("click", () => {
  // Sembunyikan kontainer pertanyaan
  questionContainer.style.display = "none";
  // Tampilkan loader
  heartLoader.style.display = "block";

  const timeoutId = setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "block"; // 'block' lebih aman dari 'inherit'
    gifResult.play();
  }, 3000);
});