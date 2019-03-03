var express = require('express');
var router = express.Router();
var discoverer = require('../lib/discover.js');
var auth_lib = require('../lib/auth.js');
var db_utils = require('../db/db_utils.js');

// Get the authentification middleware.
var F_auth_middleware = auth_lib.auth.connect(auth_lib.basic);

// Fetch all ligghts.
let A_lights = [];
discoverer.discoverLights(A_lights);

/*  * * * * * * * * * * * * * * * * * * * * * */
/*  * * * * * * * ROUTES * * * * * * * * * *  */
/*  * * * * * * * * * * * * * * * * * * * * * */

/*  * * * * * * * * HOME PAGE* * * * * * * * * * * * * */
router.get('/', db_utils.middleware_logs, function(req, res, next) {
  res.render('index', { title: 'Yeelight Brain', lights : A_lights});
      
});

/*  * * * * * * * * * * * * * * * * * * * * * */
/*  * * * * * * * API *  * * * * * * * * * *  */
/*  * * * * * * * * * * * * * * * * * * * * * */

router.get('/turn/:mode/:id', db_utils.middleware_logs, F_auth_middleware,function(req, res, next) {
  let S_Mode = req.params.mode;
  let S_Id = req.params.id;
  let O_Light;
  let O_api_return = { lights : []};

  if ( A_lights.length > 0 ) {
    // For all lights
    if ( S_Id == "all") {
      A_lights.forEach(P_O_light => {
        if (P_O_light.light.connected) {
          P_O_light.light.sendCommand({
              id: -1,
              method: 'set_power',
              params: [S_Mode, 'smooth', 300]
          })
          O_api_return.lights.push( P_O_light.light.device);
        }
      });
    // Another one.
    } else {
      O_Light = A_lights.find((P_O_light) => P_O_light.id == S_Id);    
      if (O_Light.light.connected) {
        O_Light.light.sendCommand({
            id: -1,
            method: 'set_power',
            params: [S_Mode, 'smooth', 300]
        })
        O_api_return.lights.push( O_Light.light.device);
      }
    }
  }  
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(O_api_return));
      
});


module.exports = router;
