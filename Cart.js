document.addEventListener('DOMContentLoaded', () => {
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    // Function to update the row total and subtotal
    function updateCart(button) {
        const row = button.closest('tr');
        const quantityInput = row.querySelector('.quantity-input');
        const unitPrice = parseFloat(row.querySelector('.unit-price').textContent);
        const rowTotal = row.querySelector('.row-total');

        // Update row total
        const quantity = parseInt(quantityInput.value);
        const total = unitPrice * quantity;
        rowTotal.textContent = total.toFixed(2);

        // Update subtotal
        updateSubtotal();
    }

    // Function to calculate subtotal
    function updateSubtotal() {
        const rowTotals = document.querySelectorAll('.row-total');
        let subtotal = 0;

        rowTotals.forEach((rowTotal) => {
            subtotal += parseFloat(rowTotal.textContent);
        });

        // Update subtotal and total
        subtotalElement.textContent = subtotal.toFixed(2);
        totalElement.textContent = subtotal.toFixed(2);
    }

    // Add event listeners to buttons
    quantityButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);

            if (button.classList.contains('increment')) {
                input.value = value + 1;
            } else if (button.classList.contains('decrement') && value > 1) {
                input.value = value - 1;
            }

            updateCart(button);
        });
    });
});
