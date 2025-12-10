// ===== Animasi saat scroll =====
const elements = document.querySelectorAll(".animate");
function showOnScroll() {
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);

// ===== Navbar aktif sesuai section =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

function updateNavbar() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // offset navbar
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateNavbar);
window.addEventListener("load", updateNavbar);

// ===== Smooth scroll behavior =====
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 70, // tinggi navbar
      behavior: "smooth",
    });
  });
});

const sendBtn = document.getElementById("sendBtn");
const messageResult = document.getElementById("messageResult");

sendBtn.addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    messageResult.innerHTML =
      "<p style='color:red;'>Tolong isi semua kolom!</p>";
    messageResult.classList.add("show"); // pastikan tampil
    return;
  }

  // Tampilkan hasil pesan
  messageResult.innerHTML = `
    <h3>Pesan Anda:</h3>
    <p><strong>Nama:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Pesan:</strong> ${message}</p>
    <p style="color:green;">Pesan berhasil dikirim (simulasi)!</p>
  `;
  messageResult.classList.add("show"); // pastikan tampil

  // Kosongkan form
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const messageResult = document.getElementById("messageResult");

  sendBtn.addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      messageResult.innerHTML =
        "<p style='color:red;'>Tolong isi semua kolom!</p>";
      return;
    }

    messageResult.innerHTML = `
      <h3>Pesan Anda:</h3>
      <p><strong>Nama:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Pesan:</strong> ${message}</p>
      <p style="color:green;">Pesan berhasil dikirim (simulasi)!</p>
    `;

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  });
});
