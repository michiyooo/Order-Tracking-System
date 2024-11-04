// Initialize storage for customer information and orders
let customerInfo = {};
let customerOrders = [];

// Function to display orders in the order summary
function displayOrders() {
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = ""; // Clear existing orders in the summary

    customerOrders.forEach((order) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${order.quantity} x ${order.delicacy} ${order.specialRequest ? '(Special Request: ' + order.specialRequest + ')' : ''}`;
        orderList.appendChild(listItem);
    });
}

// Function to add a new order to the customer's order list
function addOrder(event) {
    event.preventDefault(); // Prevent form submission

    const delicacy = document.getElementById("delicacy").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const specialRequest = document.getElementById("specialRequest").value;

    // Validate required fields
    if (!delicacy || !quantity || quantity <= 0) {
        alert("Please fill out all order details and ensure quantity is greater than zero.");
        return;
    }

    const newOrder = {
        delicacy,
        quantity,
        totalPrice: calculateTotalPrice(quantity),
        specialRequest,
        status: "Pending"
    };

    customerOrders.push(newOrder);
    displayOrders(); // Update the order summary
    document.getElementById("orderForm").reset(); // Clear order form inputs
}

// Function to calculate total price of an order
function calculateTotalPrice(quantity) {
    const pricePerItem = 50; // Example price per item
    return quantity * pricePerItem;
}

function submitAllOrders() {
    customerInfo = {
        name: document.getElementById("customerName").value,
        contactNumber: document.getElementById("contactNumber").value,
        address: document.getElementById("address").value
    };

    // Ensure customer info is complete
    if (!customerInfo.name || !customerInfo.contactNumber || !customerInfo.address) {
        alert("Please fill out all customer information.");
        return;
    }

    // Ensure there is at least one order
    if (customerOrders.length === 0) {
        alert("Please add at least one order.");
        return;
    }

    const customerData = {
        customerInfo,
        orders: customerOrders
    };

    // Retrieve existing orders from Local Storage
    let allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];

    // Add new orders to existing orders
    allOrders.push(customerData);

    // Store updated orders back in Local Storage
    localStorage.setItem('allOrders', JSON.stringify(allOrders));

    console.log("Submitting customer data:", customerData);

    // Clear forms and order list for a new customer
    document.getElementById("customerForm").reset();
    customerOrders = []; // Reset orders array
    displayOrders(); // Refresh displayed orders
    alert("Orders submitted successfully!");
}


// Event Listeners
document.getElementById("orderForm").addEventListener("submit", addOrder);
document.getElementById("customerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    submitAllOrders();
});

// Initial display
displayOrders();
