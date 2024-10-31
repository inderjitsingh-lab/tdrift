document.addEventListener('DOMContentLoaded', () => {
    const planCards = document.querySelectorAll('.plan-card');
    const selectedPlanInput = document.getElementById('selected-plan');
    const totalAmountInput = document.getElementById('total-amount');
    const paymentFormSection = document.getElementById('payment-form-section');

    planCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove 'selected' class from all cards
            planCards.forEach(card => card.classList.remove('selected'));
            
            // Add 'selected' class to the clicked card
            card.classList.add('selected');

            // Update hidden input with selected plan and amount
            const planName = card.querySelector('h3').innerText;
            const planPrice = card.getAttribute('data-price');
            
            selectedPlanInput.value = planName;
            totalAmountInput.value = `$${planPrice}/month`;

            // Scroll smoothly to payment form
            paymentFormSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle form submission
    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`Payment processed for ${selectedPlanInput.value}`);
    });
});




// Plan selection logic
const planCards = document.querySelectorAll('.plan-card');
const selectedPlanInput = document.getElementById('selected-plan');
const totalAmountInput = document.getElementById('total-amount');
const paymentFormSection = document.getElementById('payment-form-section');

planCards.forEach(card => {
    card.addEventListener('click', () => {
        // Highlight selected plan
        planCards.forEach(card => card.classList.remove('selected'));
        card.classList.add('selected');

        // Update selected plan and total amount
        const planName = card.querySelector('h3').innerText;
        const planPrice = card.getAttribute('data-price');

        selectedPlanInput.value = planName;
        totalAmountInput.value = `$${planPrice}/month`;

        // Scroll to payment form
        paymentFormSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Payment processed for ' + selectedPlanInput.value);
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');
    const cardNumberInput = document.getElementById('card-number');
    const expirationDateInput = document.getElementById('expiration-date');
    const cvvInput = document.getElementById('cvv');
    const zipCodeInput = document.getElementById('zip-code');
    
    // Format card number with spaces
    cardNumberInput.addEventListener('input', () => {
        let value = cardNumberInput.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const parts = [];
        for (let i = 0; i < value.length; i += 4) {
            parts.push(value.substring(i, i + 4));
        }
        cardNumberInput.value = parts.join(' ');
    });

    // Format expiration date
    expirationDateInput.addEventListener('input', () => {
        let value = expirationDateInput.value.replace(/[^0-9]/g, '');
        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
        }
        expirationDateInput.value = value;
    });

    // Limit CVV to 3 digits
    cvvInput.addEventListener('input', () => {
        cvvInput.value = cvvInput.value.replace(/[^0-9]/g, '').slice(0, 3);
    });

    // Limit ZIP code to 6 digits
    zipCodeInput.addEventListener('input', () => {
        zipCodeInput.value = zipCodeInput.value.replace(/[^0-9]/g, '').slice(0, 6);
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Payment processed successfully!');
    });
});






const stripe = Stripe('pk_test_51Q6iP5Roy5DazS2pJ1K9RWX5t7Cimz0wePTDxk7oYZppBJ3qf55fsWeXCQplmqLV1yLL3mw8hvlZgqdHRUAtGNqR002MnUj0qt'); // Replace with your actual publishable key
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-number');  // Adjust the selector if necessary




document.querySelectorAll('.select-plan-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const planCard = event.target.closest('.plan-card');
        const planName = planCard.querySelector('h3').textContent;
        const planPrice = planCard.querySelector('.price').textContent;

        document.getElementById('selected-plan').value = planName;
        document.getElementById('total-amount').value = planPrice;
    });
});






document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Create a payment method
    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        console.error(error);
    } else {
        const plan = document.getElementById('selected-plan').value;
        const price = document.getElementById('total-amount').value;

        // Send payment method ID to the backend
        fetch('/create-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                paymentMethodId: paymentMethod.id,
                planName: plan,
                priceId: 'price_xxxxxxx' // Replace with actual Stripe Price ID
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                document.getElementById('confirmation-overlay').style.display = 'flex';
            }
        });
    }
});
