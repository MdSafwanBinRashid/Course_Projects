function addRecommendation() {
    // Get the message of the new recommendation
    let recommendation = document.getElementById("new_recommendation");
    
    // If the user has left a recommendation, display a pop-up
    if (recommendation.value != null && recommendation.value.trim() != "") {
        console.log("New recommendation added");
        
        // Create a new 'recommendation' element
        var element = document.createElement("div");
        element.setAttribute("class", "recommendation");
        
        // Create the recommendation content
        element.innerHTML = `
            <i class="fas fa-quote-left quote-icon"></i>
            <p>${recommendation.value}</p>
            <div class="recommendation-author">- New Recommendation</div>
        `;
        
        // Add this element to the end of the list of recommendations
        document.getElementById("all_recommendations").appendChild(element); 
        
        // Reset the value of the textarea
        recommendation.value = "";
        
        // Show success popup
        showPopup(true);
    } else {
        // Show error message if input is empty
        alert("Please enter a recommendation message before submitting.");
    }
}

function showPopup(bool) {
    const popup = document.getElementById('popup');
    
    if (bool) {
        popup.classList.add('show');
        // Auto-hide after 3 seconds
        setTimeout(() => {
            showPopup(false);
        }, 3000);
    } else {
        popup.classList.remove('show');
    }
}

// Add event listener for Enter key in recommendation textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('new_recommendation');
    
    textarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.ctrlKey) {
            event.preventDefault();
            addRecommendation();
        }
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', function(event) {
        const popup = document.getElementById('popup');
        if (popup.classList.contains('show') && !popup.contains(event.target)) {
            showPopup(false);
        }
    });
});