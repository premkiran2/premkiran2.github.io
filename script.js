    // Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Project search filter
const input = document.getElementById("search");
const list = document.getElementById("projectList");

function normalize(s) {
  return (s || "").toLowerCase().trim();
}

if (input && list) {
  input.addEventListener("input", () => {
    const q = normalize(input.value);
    const cards = Array.from(list.querySelectorAll(".project"));

    cards.forEach(card => {
      const text = normalize(card.innerText);
      const tags = normalize(card.getAttribute("data-tags"));
      const match = q.length === 0 || text.includes(q) || tags.includes(q);
      card.style.display = match ? "" : "none";
    });
  });
}
