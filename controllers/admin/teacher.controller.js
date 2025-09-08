module.exports.index = async (req, res) => {
  res.render("admin/pages/teacher/index", {
        pageTitle: "Teacher"
    }
)};

module.exports.detailTeacher = async (req, res) => {
  res.render("admin/pages/teacher/detail", {
        pageTitle: "Teacher detail"
    }
)};

module.exports.requestTeacher = async (req, res) => {
  res.render("admin/pages/teacher/request", {
        pageTitle: "Teacher request"
    }
)};