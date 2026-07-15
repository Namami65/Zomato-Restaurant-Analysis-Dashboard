// ================================
// CONFIG - change this to your backend URL
// ================================
const API_BASE = "http://localhost:8080/api";

// ================================
// SAMPLE DATA (used if backend is not running)
// ================================
const sampleRestaurants = [
  { name: "Spice Kitchen", cuisine: "North Indian", area: "Koramangala", rating: 4.5, cost: 600, online: true, booking: true, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400" },
  { name: "The Green Bowl", cuisine: "South Indian", area: "Indiranagar", rating: 4.2, cost: 400, online: true, booking: false, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
  { name: "Urban Bistro", cuisine: "Continental", area: "HSR Layout", rating: 4.6, cost: 800, online: false, booking: true, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" },
  { name: "Royal Tandoor", cuisine: "Biryani", area: "Whitefield", rating: 3.9, cost: 500, online: true, booking: false, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
  { name: "Cafe Corner", cuisine: "Cafe", area: "Jayanagar", rating: 4.0, cost: 300, online: true, booking: false, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
  { name: "City Diner", cuisine: "Chinese", area: "BTM Layout", rating: 3.8, cost: 450, online: false, booking: false, image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400" },
  { name: "Namma Kitchen", cuisine: "South Indian", area: "JP Nagar", rating: 4.3, cost: 350, online: true, booking: true, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400" },
  { name: "Grand Table", cuisine: "Italian", area: "MG Road", rating: 4.7, cost: 900, online: false, booking: true, image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400" },
  { name: "House of Spoon", cuisine: "Desserts", area: "Marathahalli", rating: 4.1, cost: 250, online: true, booking: false, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400" }
];

let allRestaurants = [];
let currentFilter = "all";
let currentSearch = "";

// ================================
// FETCH DATA FROM BACKEND (with fallback)
// ================================
async function loadRestaurants() {
  try {
    const response = await fetch(`${API_BASE}/restaurants/top`);
    if (!response.ok) throw new Error("Server error");
    allRestaurants = await response.json();
  } catch (error) {
    console.log("Backend not reachable, using sample data.");
    allRestaurants = sampleRestaurants;
  }
  displayRestaurants();
}

async function loadStats() {
  try {
    const response = await fetch(`${API_BASE}/restaurants/stats`);
    if (!response.ok) throw new Error("Server error");
    const stats = await response.json();

    document.getElementById("statTotal").textContent = stats.totalRestaurants;
    document.getElementById("statRating").textContent = stats.avgRating;
    document.getElementById("statCost").textContent = "₹" + stats.avgCost;
    document.getElementById("statAreas").textContent = stats.totalAreas;
  } catch (error) {
    console.log("Backend not reachable, using default stats.");
    // default values are already set in the HTML
  }
}

// ================================
// DISPLAY / FILTER / SEARCH RESTAURANTS
// ================================
function displayRestaurants() {
  const grid = document.getElementById("restaurantGrid");
  const noResults = document.getElementById("noResults");
  const resultCount = document.getElementById("resultCount");

  let list = allRestaurants;

  // apply search
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.area.toLowerCase().includes(q)
    );
  }

  // apply filter
  if (currentFilter === "online") list = list.filter(r => r.online);
  if (currentFilter === "booking") list = list.filter(r => r.booking);
  if (currentFilter === "top") list = list.filter(r => r.rating >= 4.3);

  resultCount.textContent = `Showing ${list.length} restaurant(s)`;

  if (list.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  grid.innerHTML = list.map(r => `
    <div class="restaurant-card">
      <img src="${r.image}" alt="${r.name}">
      <div class="card-body">
        <h4>${r.name}</h4>
        <p class="card-meta">${r.cuisine} &middot; ${r.area}</p>
        <div class="card-footer">
          <span class="rating-tag">★ ${r.rating}</span>
          <span class="cost-tag">₹${r.cost} for two</span>
        </div>
      </div>
    </div>
  `).join("");
}

// ================================
// EVENT LISTENERS
// ================================
document.getElementById("searchBtn").addEventListener("click", () => {
  currentSearch = document.getElementById("searchInput").value.trim();
  document.getElementById("restaurants").scrollIntoView({ behavior: "smooth" });
  displayRestaurants();
});

document.getElementById("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    displayRestaurants();
  });
});

// ================================
// INITIAL LOAD
// ================================
loadStats();
loadRestaurants();