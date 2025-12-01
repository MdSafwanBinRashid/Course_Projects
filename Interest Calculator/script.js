// DOM elements
const principalInput = document.getElementById('principal');
const rateInput = document.getElementById('rate');
const rateValue = document.getElementById('rate_val');
const yearsInput = document.getElementById('years');
const resultDiv = document.getElementById('result');
const computeBtn = document.getElementById('computeBtn');
const resetBtn = document.getElementById('resetBtn');
const yearOptions = document.querySelectorAll('.year-option');

// Initialize the calculator
function initCalculator() {
    // Update rate display when slider changes
    rateInput.addEventListener('input', updateRateDisplay);
    
    // Set up year option buttons
    yearOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            yearOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update years input value
            yearsInput.value = this.getAttribute('data-year');
        });
    });
    
    // Compute button
    computeBtn.addEventListener('click', compute);
    
    // Reset button
    resetBtn.addEventListener('click', resetCalculator);
    
    // Trigger computation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            compute();
        }
    });
    
    // Initialize with default values
    updateRateDisplay();
    setDefaultYear();
}

// Update rate display in real-time (fixed the issue)
function updateRateDisplay() {
    rateValue.textContent = rateInput.value;
}

// Set default year selection
function setDefaultYear() {
    // Set default to 1 year
    yearsInput.value = 1;
    
    // Activate the 1-year option
    yearOptions.forEach(option => {
        if (option.getAttribute('data-year') === '1') {
            option.classList.add('active');
        }
    });
}

// Compute interest
function compute() {
    // Get input values
    const principal = parseFloat(principalInput.value);
    const rate = parseFloat(rateInput.value);
    const years = parseFloat(yearsInput.value);
    
    // Validate principal amount
    if (isNaN(principal) || principal <= 0) {
        showError('Please enter a positive number for the amount!');
        principalInput.focus();
        principalInput.style.borderColor = '#e63946';
        return;
    }
    
    // Validate years
    if (isNaN(years) || years <= 0 || years > 10) {
        showError('Please select a valid number of years between 1 and 10!');
        yearsInput.focus();
        yearsInput.style.borderColor = '#e63946';
        return;
    }
    
    // Reset error styles
    principalInput.style.borderColor = '#ddd';
    yearsInput.style.borderColor = '#ddd';
    
    // Calculations
    const interest = principal * years * rate / 100;
    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + parseInt(years);
    const totalAmount = principal + interest;
    
    // Format numbers with commas
    const formattedPrincipal = formatNumber(principal);
    const formattedInterest = formatNumber(interest.toFixed(2));
    const formattedTotal = formatNumber(totalAmount.toFixed(2));
    
    const resultHTML = `
        <div class="result-item">
            <i class="fas fa-money-bill-wave"></i> Principal: <mark>$${formattedPrincipal}</mark>
        </div>
        <div class="result-item">
            <i class="fas fa-percentage"></i> Interest Rate: <mark>${rate}%</mark>
        </div>
        <div class="result-item">
            <i class="fas fa-calendar-alt"></i> Time Period: <mark>${years} ${years === 1 ? 'Year' : 'Years'}</mark>
        </div>
        <div class="result-item">
            <i class="fas fa-coins"></i> Interest Earned: <mark>$${formattedInterest}</mark>
        </div>
        <div class="result-item highlight">
            <i class="fas fa-hand-holding-usd"></i> Total Amount: <mark>$${formattedTotal}</mark>
        </div>
        <div class="result-item">
            <i class="fas fa-calendar-check"></i> In the year: <mark>${futureYear}</mark>
        </div>
    `;
    
    // Display result with animation
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.animation = 'none';
    setTimeout(() => {
        resultDiv.style.animation = 'fadeIn 0.5s ease';
    }, 10);
    
    // Styling to result items
    const style = document.createElement('style');
    style.textContent = `
        .result-item {
            margin-bottom: 8px;
            padding: 5px 0;
            border-bottom: 1px dashed #e0e0e0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .result-item.highlight {
            font-weight: bold;
            color: #16213e;
            border-bottom: 2px solid #4cc9f0;
            padding-top: 10px;
            margin-top: 10px;
        }
        
        .result-item i {
            color: #4361ee;
            width: 20px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    // Remove existing style if any
    const existingStyle = document.getElementById('result-style');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    style.id = 'result-style';
    document.head.appendChild(style);
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Show error message
function showError(message) {
    resultDiv.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i> ${message}
        </div>
    `;
    
    // Style the error message
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            color: #e63946;
            background-color: #ffeaea;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #e63946;
            display: flex;
            align-items: center;
            gap: 10px;
        }
    `;
    
    // Remove existing style if any
    const existingStyle = document.getElementById('error-style');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    style.id = 'error-style';
    document.head.appendChild(style);
}

// Reset calculator
function resetCalculator() {
    principalInput.value = '';
    rateInput.value = '10.25';
    yearsInput.value = '';
    resultDiv.textContent = '-';
    
    // Reset active year option
    yearOptions.forEach(option => option.classList.remove('active'));
    
    // Reset rate display
    updateRateDisplay();
    
    // Reset input borders
    principalInput.style.borderColor = '#ddd';
    yearsInput.style.borderColor = '#ddd';
    
    // Set default year
    setDefaultYear();
    
    // Focus on principal input
    principalInput.focus();
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', initCalculator);