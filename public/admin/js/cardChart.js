const ctxt = document.getElementById('activeStudentsChart').getContext('2d');
const ctxt2 = document.getElementById('activeStudentsChart2').getContext('2d');

new Chart(ctxt, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // tuỳ chỉnh
      datasets: [{
        label: 'Active Students',
        data: [200, 400, 300, 450, 320, 500, 600], // dữ liệu demo
        borderColor: '#00c389',
        backgroundColor: 'rgba(0, 195, 137, 0.2)',
        tension: 0.4, // tạo đường cong mượt
        fill: true,   // tô màu dưới đường
        pointRadius: 0 // ẩn chấm tròn
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // ẩn chú thích
        }
      },
      scales: {
        x: {
          display: false // ẩn trục X
        },
        y: {
          display: false // ẩn trục Y
        }
      }
    }
  });
new Chart(ctxt2, {
    type: 'line',
  data: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [{
      data: [200, 400, 300, 450, 320, 500, 600],
      borderColor: '#00c389',
      backgroundColor: 'rgba(0,195,137,0.2)',
      tension: 0.4,
      fill: true,
      pointRadius: 0,       // không vẽ chấm
      pointHitRadius: 35    // vùng hover rộng hơn
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          // Ví dụ: hiển thị "Wed: 300 students"
          label: function(context) {
            return context.label + ": " + context.formattedValue + " students";
          }
        }
      }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  }
  });