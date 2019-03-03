const YeeDevice = require('yeelight-platform').Device
const YeeDiscovery = require('yeelight-platform').Discovery
const discoveryService = new YeeDiscovery()


function discoverLights(A_lights) {
    discoveryService.on('started', () => {
        console.log("** Discovery Started **");
    })
  
    discoveryService.on('didDiscoverDevice', (P_O_new_device) => {
      let N_id = 0;
      let O_New_device = new YeeDevice(P_O_new_device);
      let B_found = A_lights.some((O_device) => {
        return O_New_device.device.id == O_device.light.device.id;
      });
      if ( !B_found) {
        console.log("*** Add Device ***");
        N_id = A_lights.length;
        A_lights.push({"id" : N_id, "light" : O_New_device}); 
        O_New_device.connect();
        O_New_device.on('connected', () => {
          console.log("host-" + N_id + ": " + O_New_device.device.Location + "    | Connected: " + O_New_device.connected);
        })
      }
    });
  
    discoveryService.listen();
  }

  
module.exports = {
    discoverLights,
}