module.exports.index = (req, res) => {
    res.render("client/pages/about/index", {
        pageTitle: "About page"
    });
};