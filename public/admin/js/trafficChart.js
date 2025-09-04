const ctx = document.getElementById('myDoughnutChart').getContext('2d');

const trafficChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [
      'Create a Design System in Figma',
      'The Complete Digital Marketing Course',
      'Google Ads Training',
      'Microsoft Excel'
    ],
    datasets: [{
      data: [60, 20, 12, 8],
      backgroundColor: [
        '#1e88e5',
        '#00c853',
        '#ffca28',
        '#e53935'
      ],
    //   hoverOffset: 20
    }]
  },
  options: {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: {
        display: false
      }
    }
  }
});
