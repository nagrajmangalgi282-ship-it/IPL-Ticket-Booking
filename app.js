
// Toast Notification Function
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = "toast show";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.className = "toast";
    }, 3000);
}


// Smooth Scrolling for Book Buttons
document.querySelectorAll(".book-btn").forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        document.getElementById("booking").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        showToast("Redirecting to booking form!");
    });
});


// Activity 7: Booking Summary
let match = document.getElementById("match");
let stand = document.getElementById("stand");
let quantity = document.getElementById("quantity");

function updateSummary() {

    let selectedMatch = match.value;
    let selectedStand = stand.value;
    let tickets = Number(quantity.value);

    let prices = {
        "RCB vs CSK": { General: 800, Premium: 1800, VIP: 3500 },
        "MI vs KKR": { General: 700, Premium: 1500, VIP: 3000 },
        "SRH vs RR": { General: 600, Premium: 1400, VIP: 2800 },
        "DC vs PBKS": { General: 650, Premium: 1300, VIP: 2500 },
        "GT vs LSG": { General: 750, Premium: 1600, VIP: 3200 }
    };

    if (tickets < 1 || tickets > 10 || !Number.isInteger(tickets)) {
        tickets = 1;
        quantity.value = 1;
    }

    let price = 0;

    if (selectedMatch && selectedStand) {
        price = prices[selectedMatch][selectedStand];
    }

    let total = price * tickets;

    document.getElementById("summary-match").textContent =
        selectedMatch || "Not Selected";

    document.getElementById("summary-stand").textContent =
        selectedStand || "Not Selected";

    document.getElementById("summary-price").textContent = price;

    document.getElementById("summary-quantity").textContent =
        selectedMatch && selectedStand ? tickets : 0;

    document.getElementById("summary-total").textContent = total;

    if (selectedMatch && selectedStand) {
        showToast("Booking Summary Updated!");
    }
}


// Activity 7: Event Listeners
match.addEventListener("change", updateSummary);
stand.addEventListener("change", updateSummary);
quantity.addEventListener("change", updateSummary);
quantity.addEventListener("input", updateSummary);


// Activity 7: Confirm Booking
document.getElementById("confirm-booking").addEventListener("click", function () {

    const selectedMatch = match.value;
    const selectedStand = stand.value;
    const tickets = Number(quantity.value);

    if (selectedMatch === "" || selectedStand === "" ||
        tickets < 1 || tickets > 10) {

        showToast("Please complete all booking details!");
        return;
    }

    showToast("Booking Confirmed Successfully!");
});


// ======================================
// ACTIVITY 8: RESPONSIVE LAYOUT
// ======================================


// 1. Hamburger Menu
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("active");
});


// Close menu after clicking navigation links
document.querySelectorAll("#navbar a").forEach(function (link) {

    link.addEventListener("click", function () {
        navbar.classList.remove("active");
    });

});


// 2. Filter Match Cards by Team
const teamFilter = document.getElementById("team");
const matchCards = document.querySelectorAll(".match-card");

teamFilter.addEventListener("change", function () {

    const selectedTeam = teamFilter.value;

    matchCards.forEach(function (card) {

        const teams = card.dataset.teams.split(" ");

        if (selectedTeam === "all" || teams.includes(selectedTeam)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});


// 3. Grid View
const gridView = document.getElementById("grid-view");
const listView = document.getElementById("list-view");
const matchContainer = document.getElementById("match-container");

gridView.addEventListener("click", function () {

    matchContainer.classList.remove("list-view");

    showToast("Grid View Enabled!");

});


// 4. List View
listView.addEventListener("click", function () {

    matchContainer.classList.add("list-view");

    showToast("List View Enabled!");

});
