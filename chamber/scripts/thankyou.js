// Read URL parameters
const params = new URLSearchParams(window.location.search);

// Helper function
function displayValue(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value || "Not Provided";
    }
}

// Display submitted values
displayValue("firstName", params.get("firstName"));
displayValue("lastName", params.get("lastName"));
displayValue("email", params.get("email"));
displayValue("phone", params.get("phone"));
displayValue("business", params.get("business"));

// Format timestamp
const timestamp = params.get("timestamp");

if (timestamp) {

    const formattedDate =
        new Date(timestamp).toLocaleString();

    displayValue("timestampDisplay", formattedDate);

} else {

    displayValue("timestampDisplay", "Unavailable");

}