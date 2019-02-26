var express = require('express');
var router = express.Router();
const YeeDevice = require('yeelight-platform').Device
const YeeDiscovery = require('yeelight-platform').Discovery
const discoveryService = new YeeDiscovery()

/*  * * * * * * * * * * * * * * * * * * * * * */
let A_Lights = [];

function getLights() {
  console.log("--- GET LIGHTS---");
    discoveryService.on('started', () => {
        console.log('** Discovery Started **')
    })

    // discoveryService.on('didDiscoverDevice', (device) => {
    //     console.log("--ADD A DEVICE---")
    //     device.connect();
    //     A_Lights.push(device);
    // })
    const device = new YeeDevice({host: "x.x.x.x", port: 55443})
    device.connect()
    console.log('host: x.x.x.x Connected: ' + device.connected);

  
  device.on('connected', () => {
    console.log('host: x.x.x.x Connected: ' + device.connected);
  //     device.sendCommand({
  //         id: -1,
  //         method: 'set_power',
  //         params: ["on", 'smooth', 300]
  //     })
  })  
    A_Lights.push(device);
    // discoveryService.listen()

}
getLights();

/*  * * * * * * * * * * * * * * * * * * * * * */
/*  * * * * * * * ROUTES * * * * * * * * * *  */
/*  * * * * * * * * * * * * * * * * * * * * * */

/*  * * * * * * * * HOME PAGE* * * * * * * * * * * * * */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
      
});

/*  * * * * * * * * * * * * * * * * * * * * * */
/*  * * * * * * * API *  * * * * * * * * * *  */
/*  * * * * * * * * * * * * * * * * * * * * * */

/*  * * * * * * * * HOME PAGE* * * * * * * * * * * * * */
router.get('/turn/on/all', function(req, res, next) {
  A_Lights.forEach(light => {
    if (light.connected) {
      light.sendCommand({
          id: -1,
          method: 'set_power',
          params: ["on", 'smooth', 300]
      })
    } else {
      console.log("Can't turn on, cause not connected.");
    } 
    
  });
  res.render('index', { title: 'Express' });
      
});

/*  * * * * * * * * HOME PAGE* * * * * * * * * * * * * */
router.get('/turn/off/all', function(req, res, next) {
  A_Lights.forEach(light => {
    if (light.connected) {
      light.sendCommand({
          id: -1,
          method: 'set_power',
          params: ["off", 'smooth', 300]
      })
    } else {
      console.log("Can't turn on, cause not connected.");
    } 
    
  });
  res.render('index', { title: 'Express' });
      
});

module.exports = router;
