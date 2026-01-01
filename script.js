// MufiZ Documentation Website JavaScript

// Multiple initialization strategies for different environments
function initializeApp() {
  // Theme System
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Get saved theme or use system preference
  function getCurrentTheme() {
    const savedTheme = localStorage.getItem("mufiz-theme");
    if (savedTheme) {
      return savedTheme;
    }
    return prefersDarkScheme.matches ? "dark" : "light";
  }

  // Apply theme to document
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.textContent = "☀️";
      themeToggle.title = "Switch to light mode";
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeIcon.textContent = "🌙";
      themeToggle.title = "Switch to dark mode";
    }
    localStorage.setItem("mufiz-theme", theme);
  }

  // Initialize theme
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.documentElement.hasAttribute("data-theme")
        ? "dark"
        : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);

      // Add a subtle animation
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  }

  // Listen for system theme changes
  prefersDarkScheme.addEventListener("change", function (e) {
    const savedTheme = localStorage.getItem("mufiz-theme");
    if (!savedTheme) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !navToggle.contains(event.target) &&
        !navMenu.contains(event.target)
      ) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  }

  // Module Navigation - Robust for server environments
  function initModuleNavigation() {
    console.log("🔍 Initializing module navigation...");

    const moduleButtons = document.querySelectorAll(".module-btn");
    const moduleContents = document.querySelectorAll(".module-content");

    console.log(
      `Found ${moduleButtons.length} buttons and ${moduleContents.length} contents`,
    );

    if (moduleButtons.length === 0) {
      console.error("❌ No module buttons found!");
      return false;
    }

    // Remove any existing event listeners to prevent duplicates
    moduleButtons.forEach((button) => {
      button.onclick = null;
      button.removeEventListener("click", button._moduleHandler);
    });

    // Add click handlers to each button
    moduleButtons.forEach((button, index) => {
      const targetModule = button.getAttribute("data-module");
      console.log(`➕ Adding handler to button ${index}: ${targetModule}`);

      // Store handler reference for cleanup
      button._moduleHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log(`🖱️ Button clicked: ${targetModule}`);

        // Remove active from all
        document
          .querySelectorAll(".module-btn")
          .forEach((btn) => btn.classList.remove("active"));
        document
          .querySelectorAll(".module-content")
          .forEach((content) => content.classList.remove("active"));

        // Add active to clicked button
        this.classList.add("active");

        // Show target content
        const targetContent = document.getElementById(targetModule);
        if (targetContent) {
          targetContent.classList.add("active");
          console.log(`✅ Activated ${targetModule} content`);
        } else {
          console.error(`❌ No content found for ${targetModule}`);
        }
      };

      button.addEventListener("click", button._moduleHandler);

      // Also add onclick as fallback
      button.onclick = button._moduleHandler;
    });

    // Set core as default active
    const coreBtn = document.querySelector('[data-module="core"]');
    const coreContent = document.getElementById("core");
    if (coreBtn && coreContent) {
      // Clear all active states first
      moduleButtons.forEach((btn) => btn.classList.remove("active"));
      moduleContents.forEach((content) => content.classList.remove("active"));

      coreBtn.classList.add("active");
      coreContent.classList.add("active");
      console.log("✅ Core module set as default");
    }

    console.log("🎉 Module navigation initialized successfully!");
    return true;
  }

  // Initialize with multiple attempts and strategies
  let initAttempts = 0;
  const maxAttempts = 10;

  function tryInitModules() {
    initAttempts++;
    console.log(`🔄 Module init attempt ${initAttempts}`);

    if (initModuleNavigation()) {
      console.log("✅ Module navigation successful!");
      return;
    }

    if (initAttempts < maxAttempts) {
      setTimeout(tryInitModules, 200 * initAttempts);
    } else {
      console.error(
        "❌ Failed to initialize module navigation after all attempts",
      );
    }
  }

  tryInitModules();

  // Smooth Scrolling for Navigation Links
  const navbarLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  navbarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Highlight Active Navigation Link on Scroll
  const sections = document.querySelectorAll(".section[id]");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  function highlightActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightActiveNavLink);

  // Add copy functionality to code blocks
  const codeBlocks = document.querySelectorAll(".code-block");
  codeBlocks.forEach((block) => {
    // Create copy button
    const copyButton = document.createElement("button");
    copyButton.innerHTML = "📋 Copy";
    copyButton.className = "copy-button";
    copyButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 1px solid var(--border-light);
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s ease;
            opacity: 0;
        `;

    // Make code block container relative
    block.style.position = "relative";

    // Show copy button on hover
    block.addEventListener("mouseenter", () => {
      copyButton.style.opacity = "1";
    });

    block.addEventListener("mouseleave", () => {
      copyButton.style.opacity = "0";
    });

    // Copy functionality
    copyButton.addEventListener("click", async () => {
      const code = block.querySelector("code") || block.querySelector("pre");
      if (code) {
        try {
          await navigator.clipboard.writeText(code.textContent);
          copyButton.innerHTML = "✅ Copied!";
          copyButton.style.background = "var(--success-color)";
          copyButton.style.color = "var(--text-white)";

          setTimeout(() => {
            copyButton.innerHTML = "📋 Copy";
            copyButton.style.background = "var(--bg-tertiary)";
            copyButton.style.color = "var(--text-primary)";
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code:", err);
          copyButton.innerHTML = "❌ Failed";
          setTimeout(() => {
            copyButton.innerHTML = "📋 Copy";
          }, 2000);
        }
      }
    });

    block.appendChild(copyButton);
  });

  // Animate elements on scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe feature cards, example cards, and function items
  const animateElements = document.querySelectorAll(
    ".feature-card, .example-card, .function-item",
  );
  animateElements.forEach((el) => {
    // Only apply animation if user hasn't disabled motion
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      observer.observe(el);
    }
  });

  // Search functionality for functions
  function createSearchBox() {
    console.log("🔍 Creating search box...");
    const functionsSection = document.getElementById("standard-library");

    if (!functionsSection) {
      console.error("❌ Could not find standard-library section");
      return;
    }

    console.log("✅ Found standard-library section");

    // Check if search box already exists
    if (functionsSection.querySelector(".search-container")) {
      console.log("⚠️ Search box already exists");
      return;
    }

    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.style.cssText = `
            margin-bottom: 2rem;
            position: relative;
        `;

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search functions... (Press Ctrl+K)";
    searchInput.className = "search-input";
    searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: 0.75rem 1rem;
            border: 1px solid var(--border-light);
            border-radius: 0.5rem;
            font-size: 1rem;
            background: var(--bg-primary);
            color: var(--text-primary);
            box-shadow: var(--shadow-sm);
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
        `;

    // Add focus styles
    searchInput.addEventListener("focus", () => {
      searchInput.style.borderColor = "var(--primary-color)";
      searchInput.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
    });

    searchInput.addEventListener("blur", () => {
      searchInput.style.borderColor = "var(--border-light)";
      searchInput.style.boxShadow = "var(--shadow-sm)";
    });

    searchContainer.appendChild(searchInput);

    // Insert search box after the intro paragraph
    const introP = functionsSection.querySelector("p");
    if (introP) {
      introP.parentNode.insertBefore(searchContainer, introP.nextSibling);
      console.log("✅ Search box inserted successfully");
    } else {
      // Fallback: insert after h2
      const h2 = functionsSection.querySelector("h2");
      if (h2) {
        h2.parentNode.insertBefore(searchContainer, h2.nextSibling);
        console.log("✅ Search box inserted after h2");
      }
    }

    // Search functionality
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      console.log("🔍 Searching for:", searchTerm);

      const functionItems = document.querySelectorAll(".function-item");
      console.log("📝 Found function items:", functionItems.length);

      functionItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const shouldShow = searchTerm === "" || text.includes(searchTerm);
        item.style.display = shouldShow ? "block" : "none";
      });

      // Update module buttons based on visible content
      const moduleContents = document.querySelectorAll(".module-content");
      moduleContents.forEach((content) => {
        const visibleItems = content.querySelectorAll(
          '.function-item:not([style*="none"])',
        );
        const moduleButton = document.querySelector(
          `[data-module="${content.id}"]`,
        );

        if (moduleButton) {
          if (visibleItems.length === 0 && searchTerm) {
            moduleButton.style.opacity = "0.5";
          } else {
            moduleButton.style.opacity = "1";
          }
        }
      });
    });
  }

  // Initialize search with multiple attempts
  let searchAttempts = 0;
  function tryCreateSearchBox() {
    searchAttempts++;
    console.log(`🔄 Search box attempt ${searchAttempts}`);

    if (document.getElementById("standard-library")) {
      createSearchBox();
      console.log("✅ Search box initialized!");
    } else if (searchAttempts < 5) {
      setTimeout(tryCreateSearchBox, 200 * searchAttempts);
    }
  }

  tryCreateSearchBox();

  // Keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      const searchInput = document.querySelector(".search-input");
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }

    // Escape to clear search
    if (e.key === "Escape") {
      const searchInput = document.querySelector(".search-input");
      if (searchInput && searchInput === document.activeElement) {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));
        searchInput.blur();
      }
    }
  });

  // Add keyboard shortcut hint
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    const shortcutHint = document.createElement("span");
    shortcutHint.textContent = "Ctrl+K";
    shortcutHint.style.cssText = `
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.75rem;
        color: var(--text-light);
        pointer-events: none;
        background: var(--bg-tertiary);
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid var(--border-light);
    `;

    searchInput.parentNode.appendChild(shortcutHint);

    // Hide shortcut hint when input is focused
    searchInput.addEventListener("focus", () => {
      shortcutHint.style.display = "none";
    });

    searchInput.addEventListener("blur", () => {
      if (!searchInput.value) {
        shortcutHint.style.display = "block";
      }
    });
  }

  // Table of contents for long sections
  function createTableOfContents() {
    const syntaxSection = document.getElementById("syntax");
    if (!syntaxSection) return;

    const headings = syntaxSection.querySelectorAll("h3");
    if (headings.length < 3) return;

    const tocContainer = document.createElement("div");
    tocContainer.className = "table-of-contents";
    tocContainer.style.cssText = `
            background: var(--bg-tertiary);
            border: 1px solid var(--border-light);
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
        `;

    const tocTitle = document.createElement("h4");
    tocTitle.textContent = "In this section:";
    tocTitle.style.cssText = `
            margin: 0 0 1rem 0;
            color: var(--text-primary);
            font-size: 1.125rem;
        `;

    const tocList = document.createElement("ul");
    tocList.style.cssText = `
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
        `;

    headings.forEach((heading) => {
      const id = heading.textContent
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      heading.id = id;

      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${id}`;
      link.textContent = heading.textContent;
      link.style.cssText = `
                color: var(--primary-color);
                text-decoration: none;
                font-weight: 500;
                transition: color 0.15s ease;
                display: block;
                padding: 0.25rem 0;
            `;

      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
          const navbarHeight = document.querySelector(".navbar").offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });

      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocTitle);
    tocContainer.appendChild(tocList);

    const firstH3 = syntaxSection.querySelector("h3");
    if (firstH3) {
      firstH3.parentNode.insertBefore(tocContainer, firstH3);
    }
  }

  createTableOfContents();

  // Add loading state for external links
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      this.style.opacity = "0.7";
      setTimeout(() => {
        this.style.opacity = "1";
      }, 1000);
    });
  });

  // Add debug info for troubleshooting
  setTimeout(function () {
    const debugInfo = document.createElement("div");
    debugInfo.id = "debug-info";
    debugInfo.style.cssText = `
      position: fixed;
      bottom: 10px;
      left: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 1000;
      max-width: 300px;
    `;

    const buttons = document.querySelectorAll(".module-btn");
    const contents = document.querySelectorAll(".module-content");
    const searchBox = document.querySelector(".search-input");

    debugInfo.innerHTML = `
      <strong>🔍 Debug Info:</strong><br>
      Module Buttons: ${buttons.length}<br>
      Module Contents: ${contents.length}<br>
      Search Box: ${searchBox ? "✅" : "❌"}<br>
      Ready State: ${document.readyState}<br>
      <button onclick="this.parentElement.remove()" style="margin-top:5px;">Close</button>
    `;

    document.body.appendChild(debugInfo);
  }, 1000);

  console.log("MufiZ Documentation loaded successfully! 🚀");
}

// Multiple initialization strategies for different environments
document.addEventListener("DOMContentLoaded", initializeApp);

// Fallback for environments where DOMContentLoaded might not fire properly
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  // DOM already loaded
  initializeApp();
}

// Additional fallback with window.onload
window.addEventListener("load", function () {
  console.log("🔄 Window load event - reinitializing if needed");

  // Only reinitialize if module buttons don't have handlers
  const buttons = document.querySelectorAll(".module-btn");
  if (buttons.length > 0 && !buttons[0]._moduleHandler) {
    console.log("🔄 Reinitializing module navigation from window.load");
    setTimeout(initializeApp, 100);
  }
});

// Force initialization after a delay as final fallback
setTimeout(function () {
  const buttons = document.querySelectorAll(".module-btn");
  if (buttons.length > 0 && !buttons[0]._moduleHandler) {
    console.log("🔄 Final fallback initialization");
    initializeApp();
  }
}, 2000);
