const home = (req, res) => {
    res.render('index.ejs', {title: 'FitFusion Application'})
}

module.exports = {
    home,
}