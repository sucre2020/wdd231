// =============================
// Timestamp
// =============================

const timestampField = document.getElementById("timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}


// =============================
// Membership Dialogs
// =============================

const modalLinks = document.querySelectorAll(".modal-link");
const closeButtons = document.querySelectorAll(".close-modal");

modalLinks.forEach(link => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const modalId = link.dataset.modal;

        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }

    });

});


closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.closest("dialog").close();

    });

});


// Optional: Close dialog when clicking outside it
document.querySelectorAll("dialog").forEach(dialog => {

    dialog.addEventListener("click", (event) => {

        const rect = dialog.getBoundingClientRect();

        const clickedInside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!clickedInside) {
            dialog.close();
        }

    });

});