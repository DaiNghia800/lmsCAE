const generateClassCode = require('../../helpers/generateClassCode.helper');
const Class = require('../../models/Class.model');

module.exports.index = (req, res) => {
    res.render("client/pages/class/index", {
        pageTitle: "Class page"
    });
};

module.exports.createClass = async (req, res) => {
    try {
        const { name } = req.body;

        let code, exists;
        do {
            code = generateClassCode();
            exists = await Class.findOne({ code });
        } while (exists);

        const newClass = await Class.create({
            name,
            code,
            teacherId: req.user._id,
            studentIds: []
        });

        res.status(201).json({ 
            message: 'Class created successfully',
            class: newClass
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Server error'
        });
    }
};