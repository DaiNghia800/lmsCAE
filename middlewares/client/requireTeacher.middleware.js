module.exports = (req, res, next) => {
    if(req.user.role !== 'teacher') {
        res.status(403).json(
            { error: 'Only teachers can create' }
        );
    }
    next();
};