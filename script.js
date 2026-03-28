document.getElementById("year").textContent = new Date().getFullYear();

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

const revealItems = document.querySelectorAll(".card");
if (revealItems.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -80px 0px", threshold: 0.2 }
  );

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("in-view"));
}

const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));

if (sections.length && navLinks.length && "IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.1 }
  );
  sections.forEach(section => navObserver.observe(section));
}
