module.exports.index = async (req, res) => {
  res.render("admin/pages/dashboard/index", {
    pageTitle: "Dashboard",
    chartData: {
      labels: [
        'Create a Design System in Figma',
        'The Complete Digital Marketing Course',
        'Google Ads Training',
        'Microsoft Excel',
      ],
      data: [20, 35, 25, 20], // ví dụ số phần trăm hoặc số lượng
      colors: ['#1e88e5', '#00c853', '#ffca28', '#e53935'],
    }
  });
};
