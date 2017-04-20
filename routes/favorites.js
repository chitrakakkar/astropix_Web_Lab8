var express = require('express');
var router = express.Router();


/* GET favorites page. */
router.get('/', function(req, res, next) {
    res.render('favorites', {favorites : req.session.favorites});
});


/* POST Add new favorite */
router.post('/add', function(req, res, next)
{
    console.log("I am req.body", req.body);
    console.log("Check here",req.session.favorites);

    // If no favorites array, create one
    if (!req.session.favorites)
    {
        req.session.favorites = [] ; //Create empty array
    }

    //Check if this image is already in array
    for (var x = 0 ; x < req.session.favorites.length ; x++)
    {
        if (req.session.favorites[x].date == req.body.date)
        {
            console.log('This is already a favorite');
            return res.redirect('back');   // Back to previous page
        }
    }

    // If not, add to array and redirect to favorites page
    req.session.favorites.push(req.body);
    res.redirect('/favorites');

});

/* delete selected items */
router.post('/delete', function(req, res, next)
{
    //picks the date as date is the unique key;
    var item_to_be_deleted= req.body.date;
    //http://stackoverflow.com/questions/5767325/how-to-remove-a-particular-element-from-an-array-in-javascript/20690490#20690490
    req.session.favorites = req.session.favorites.filter(function(item)
    {
            return item.date!== item_to_be_deleted
    });
    res.redirect('/favorites');

});

module.exports = router;
