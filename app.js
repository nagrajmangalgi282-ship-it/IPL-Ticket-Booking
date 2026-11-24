
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

    window.toastTimer = setTimeout(function() {
        toast.className = "toast";
    }, 3000);
}

// Smooth Scrolling for Book Buttons
document.querySelectorAll(".book-btn").forEach(function(button) {
    button.addEventListener("click", function(event) {
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
        "RCB vs CSK": {General: 800, Premium: 1800, VIP: 3500},
        "MI vs KKR": {General: 700, Premium: 1500, VIP: 3000},
        "SRH vs RR": {General: 600, Premium: 1400, VIP: 2800},
        "DC vs PBKS": {General: 650, Premium: 1300, VIP: 2500},
        "GT vs LSG": {General: 750, Premium: 1600, VIP: 3200}
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

// Event Listeners
match.addEventListener("change", updateSummary);
stand.addEventListener("change", updateSummary);
quantity.addEventListener("change", updateSummary);
quantity.addEventListener("input", updateSummary);
document.getElementById("confirm-booking").addEventListener("click", function () {
    const selectedMatch = match.value;
    const selectedStand = stand.value;
    const tickets = Number(quantity.value);

    if (selectedMatch === "" || selectedStand === "" || tickets < 1 || tickets > 10) {
        showToast("Please complete all booking details!");
        return;
    }

    showToast("Booking Confirmed Successfully!");
});