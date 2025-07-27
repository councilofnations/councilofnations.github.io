document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  // Toggle dark mode
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });

  // Toggle mobile nav
  navToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // Spinner for /invite.html
  if (window.location.pathname === "/invite.html") {
    document.body.innerHTML = `<div class="wrapper"><div class="loader"></div></div>`;
    setTimeout(() => {
      window.location.href = "https://discord.com/oauth2/authorize?client_id=1394521818093846548&permissions=1689934541355088&integration_type=0&scope=bot";
    }, 1500);
  }
});
