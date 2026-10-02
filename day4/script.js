const textarea = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearButton = document.querySelector("#clear-btn");
const themeButton = document.querySelector("#theme-toggle");

const DRAFT_STORAGE_KEY = "quicknotes-day4-draft";
const THEME_STORAGE_KEY = "quicknotes-day4-theme";

const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
if (savedDraft !== null) {
  textarea.value = savedDraft;
}

if (localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
  document.body.classList.add("dark");
}

function updateCounts() {
  const text = textarea.value;
  const characterLength = text.length;
  const trimmedText = text.trim();
  const words = trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;

  charCount.textContent = `${characterLength} / 200 characters`;
  wordCount.textContent = `${words} words`;
  charCount.classList.toggle("warning", characterLength > 180);
  charCount.classList.toggle("over", characterLength > 200);
}

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark");
  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-pressed", String(isDark));
}

function clearDraft() {
  textarea.value = "";
  localStorage.removeItem(DRAFT_STORAGE_KEY);
  updateCounts();
}

textarea.addEventListener("input", () => {
  updateCounts();
  localStorage.setItem(DRAFT_STORAGE_KEY, textarea.value);
});

clearButton.addEventListener("click", clearDraft);

textarea.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearDraft();
  }
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateThemeButton();
});

updateThemeButton();
updateCounts();