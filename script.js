document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // ================= Dark/Light Mode =================
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === "dark-mode" ? "🌙" : "☀️";
  } else {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "light-mode");
    } else {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "dark-mode");
    }
  });

  // ================= Mobile Nav Toggle =================
  navToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // ================= Invite Page Loader =================
  if (window.location.pathname.includes("/invite.html")) {
    document.body.innerHTML = `<div class="wrapper"><div class="loader"></div></div>`;
    setTimeout(() => {
      window.location.href =
        "https://discord.com/oauth2/authorize?client_id=1394521818093846548&permissions=1689934541355088&scope=bot";
    }, 1500);
    return;
  }

  // ================= Commands Page Logic =================
  const categoryButtons = document.getElementById("category-buttons");
  const commandsContainer = document.getElementById("commands-container");
  let commandData = {};

  async function loadCommands() {
    try {
      const res = await fetch("/commands.json");
      commandData = await res.json();
      renderCategories();
      const firstCategory = Object.keys(commandData)[0];
      renderCommands(firstCategory);
    } catch (err) {
      commandsContainer.innerHTML = "<p>⚠️ Failed to load commands.</p>";
    }
  }

  function renderCategories() {
    categoryButtons.innerHTML = "";
    for (const category in commandData) {
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = category;
      btn.onclick = () => renderCommands(category);
      categoryButtons.appendChild(btn);
    }
  }

  function renderCommands(category) {
    commandsContainer.innerHTML = "";
    const commands = commandData[category];
    if (!commands || commands.length === 0) {
      commandsContainer.innerHTML = "<p>No commands in this category.</p>";
      return;
    }

    commands.forEach(cmd => {
      const cmdBox = document.createElement("div");
      cmdBox.className = "command-box";
      cmdBox.innerHTML = `
        <h3>!con ${cmd.name}</h3>
        <p>${cmd.description}</p>
      `;
      commandsContainer.appendChild(cmdBox);
    });
  }

  if (document.getElementById("commands-container")) {
    loadCommands();
  }
});
