var express = require('express');
var router = express.Router();
var apod = require('../helpers/apod');

/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', { title: 'Express' });
});

/*get a picture from

 */
router.get('/fetch_picture', function(req, res, next)
{
    //req.query is the query string sent to the server-today in this case;
  if (req.query.today)
  {

    apod(function(data, error){
      if (error) {
        return res.render('apod_error', { error : error.message });
      }
      console.log('ROUTE SAYS' + JSON.stringify(data));
      return res.render('picture', { apod : data });
    }, true);

  }
  else if (req.query.random) //req.query is the query string sent to the server-random in this case;
  {

    apod(function(data, error)
    {
      if (error)
      {
        return res.render('apod_error', { error : error.message });
      }

      //console.log('ROUTE SAYS' + JSON.stringify(data));
      return res.render('picture', { apod : data });
    });

  } else
    {
    next();  // Send to next route handler.
    // Since we haven't defined one, this will end up at the 404 error handler
  }

});
module.exports = router;//// exposing the router variable globally to be used into different files.
