let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(searchTerm));
}

function longestNote() {
  if (notes.length === 0) return null;

  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

function countByCategory() {
  const counts = { personal: 0, work: 0, study: 0 };
  for (const note of notes) {
    counts[note.category] += 1;
  }
  return counts;
}

function getSummary() {
  const counts = countByCategory();
  const noteWord = notes.length === 1 ? "note" : "notes";
  return `${notes.length} ${noteWord}: ${counts.personal} personal, ${counts.work} work, ${counts.study} study.`;
}

function isDuplicate(text) {
  const normalizedText = text.trim().replace(/\s+/g, " ").toLowerCase();
  return notes.some((note) => {
    const existingText = note.text.trim().replace(/\s+/g, " ").toLowerCase();
    return existingText === normalizedText;
  });
}

function addNote(text, category) {
  const cleanedText = text.trim();
  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("Note rejected: text must be 1-200 characters.");
    return false;
  }
  if (!["personal", "work", "study"].includes(category)) {
    console.log("Note rejected: category must be personal, work, or study.");
    return false;
  }
  if (isDuplicate(cleanedText)) {
    console.log("Note rejected: a note with this text already exists.");
    return false;
  }

  notes.push({ id: Date.now(), text: cleanedText, category });
  return true;
}

console.log(searchNotes("DAY 3")); // [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]
console.log(searchNotes("astronomy")); // []
console.log(longestNote()); // { id: 3, text: "Email the project report to Grace", category: "work" }

const startingNotes = notes;
notes = [];
console.log(longestNote()); // null
console.log(countByCategory()); // { personal: 0, work: 0, study: 0 }
console.log(getSummary()); // "0 notes: 0 personal, 0 work, 0 study."
console.log(isDuplicate("Buy milk and bread")); // false
notes = startingNotes;

console.log(countByCategory()); // { personal: 2, work: 1, study: 2 }
console.log(getSummary()); // "5 notes: 2 personal, 1 work, 2 study."
notes = [startingNotes[0]];
console.log(getSummary()); // "1 note: 1 personal, 0 work, 0 study."
notes = startingNotes;

console.log(isDuplicate("  BUY   MILK AND BREAD  ")); // true
console.log(isDuplicate("Buy more milk")); // false
console.log(addNote("Plan weekend walk", "personal")); // true
console.log(addNote("  plan weekend walk  ", "work")); // false; logs the duplicate reason
console.log(addNote("   ", "study")); // false; logs the invalid length reason
console.log(addNote("Join the family category", "family")); // false; logs the invalid category reason
console.log(addNote("x".repeat(201), "study")); // false; logs the invalid length reason

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");

console.log(noteForm, noteInput, notesList, noteCount);