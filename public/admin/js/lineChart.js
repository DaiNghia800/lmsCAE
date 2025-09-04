// Hàm tạo label (8 tháng)
const generateLabels = () => {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
};

// Hàm tạo data ngẫu nhiên trong khoảng -100 đến 100
const generateData = () => {
  return Array.from({ length: 8 }, () => (Math.random() * 200 - 100).toFixed(2));
};

// Lấy context canvas
const ctxLineChart = document.getElementById('myLineChart').getContext('2d');

// Tạo biểu đồ
const lineChart = new Chart(ctxLineChart, {
  type: 'line',
  data: {
    labels: generateLabels(),
    datasets: [
      {
        label: 'Dataset',
        data: generateData(),
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.3)',
        fill: 'start'//'origin', 'start', 'end'
      }
    ]
  },
  options: {
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: false,
        text: (ctxLineChart) => 'Fill: ' + ctxLineChart.chart.data.datasets[0].fill
      },
      legend: {
        display: false,
    }
    },
    interaction: {
      intersect: false,
    }
  }
});
