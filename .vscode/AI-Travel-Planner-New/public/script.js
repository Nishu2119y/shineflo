// Get DOM elements
const form = document.getElementById('travelForm');
const formSection = document.getElementById('formSection');
const loading = document.getElementById('loading');
const resultSection = document.getElementById('resultSection');
const tripPlanDiv = document.getElementById('tripPlan');

// Form submission handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form values
  const destination = document.getElementById('destination').value.trim();
  const days = document.getElementById('days').value;
  const budget = document.getElementById('budget').value.trim();
  const interests = document.getElementById('interests').value.trim();
  
  // Validate inputs
  if (!destination || !days || !budget || !interests) {
    alert('Please fill in all fields');
    return;
  }
  
  // Show loading state
  showLoading();
  
  try {
    // Send request to backend
    const response = await fetch('http://localhost:3002/generate-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination,
        days: parseInt(days),
        budget,
        interests
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate trip plan');
    }
    
    // Show results
    showResults(data.tripPlan);
    
  } catch (error) {
    console.error('Error:', error);
    hideLoading();
    
    // Show user-friendly error message
    let errorMessage = 'Failed to generate trip plan. ';
    
    if (error.message.includes('fetch')) {
      errorMessage += 'Please make sure the server is running on http://localhost:3002';
    } else if (error.message.includes('API')) {
      errorMessage += 'Please check your API key configuration.';
    } else {
      errorMessage += error.message;
    }
    
    alert(errorMessage);
    showForm();
  }
});

// Show loading state
function showLoading() {
  formSection.style.display = 'none';
  resultSection.style.display = 'none';
  loading.style.display = 'block';
}

// Hide loading state
function hideLoading() {
  loading.style.display = 'none';
}

// Show results
function showResults(tripPlan) {
  hideLoading();
  resultSection.style.display = 'block';
  
  // Format the trip plan for better display
  tripPlanDiv.textContent = tripPlan;
  
  // Scroll to results
  resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Show form
function showForm() {
  resultSection.style.display = 'none';
  loading.style.display = 'none';
  formSection.style.display = 'block';
}

// Reset form function
function resetForm() {
  form.reset();
  showForm();
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add some visual feedback for form inputs
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// Add enter key support for form submission
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && formSection.style.display !== 'none') {
    form.dispatchEvent(new Event('submit'));
  }
});

console.log('🚀 AI Travel Planner loaded successfully!');
console.log('📝 Make sure your server is running on http://localhost:3002');