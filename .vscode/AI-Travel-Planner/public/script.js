const form = document.getElementById('travelForm');
const formSection = document.getElementById('formSection');
const loading = document.getElementById('loading');
const resultSection = document.getElementById('resultSection');
const tripPlanDiv = document.getElementById('tripPlan');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const destination = document.getElementById('destination').value;
  const days = document.getElementById('days').value;
  const budget = document.getElementById('budget').value;
  const interests = document.getElementById('interests').value;

  formSection.style.display = 'none';
  loading.style.display = 'block';

  try {
    const response = await fetch('http://localhost:3001/generate-trip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination, days, budget, interests })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || 'Failed to generate trip');
    }

    loading.style.display = 'none';
    resultSection.style.display = 'block';
    tripPlanDiv.textContent = data.tripPlan;
  } catch (error) {
    console.error('Error:', error);
    loading.style.display = 'none';
    alert('Error: ' + error.message + '\n\nPlease check if the server is running and API key is valid.');
    formSection.style.display = 'block';
  }
});

function resetForm() {
  form.reset();
  resultSection.style.display = 'none';
  formSection.style.display = 'block';
}
