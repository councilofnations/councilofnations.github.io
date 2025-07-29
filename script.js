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
    return; // Stop executing rest of script
  }

  // ============ Bot Commands Page Logic ============
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

  // Only load commands if we're on the commands page
  if (document.getElementById("commands-container")) {
    loadCommands();
  }
});
