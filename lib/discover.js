const YeeDevice = require('yeelight-platform').Device
const YeeDiscovery = require('yeelight-platform').Discovery
const discoveryService = new YeeDiscovery()

var db_utils = require('../db/db_utils.js');

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
        db_utils.insertLights({"id" : N_id, "light" : O_New_device})
        O_New_device.connect();
        O_New_device.on('connected', () => {
          console.log("host-" + N_id + ": " + O_New_device.device.Location + "    | Connected: " + O_New_device.connected);
        })
      }
    });
  
    discoveryService.listen();
  }

// TODO : DOnnées manquantes dans la page affichant les lampes
  function connectLights(A_lights) {
    console.log("*** READ DB ***");
    let V_A_lights = db_utils.getAllLights();
    let V_S_ip, V_N_id;
    V_A_lights.forEach(element => {
      V_S_ip = element.last_ip;

      console.log("Connection to - " +V_S_ip);
      V_N_id = element.id;
      let V_O_device = new YeeDevice({host: V_S_ip, port: 55443})
      V_O_device.connect();
      V_O_device.on('connected', () => {
        V_O_device.device.model = element.model;
        V_O_device.device.Location = V_S_ip;
        A_lights.push({"id" : V_N_id, "light" : V_O_device}); 
        console.log("host-" +V_N_id + ": " + V_O_device.device.host + "    | Connected: " + V_O_device.connected);
      })
    });
  }
  

function initLights(A_lights){
  connectLights(A_lights);
  discoverLights(A_lights);
}
module.exports = {
    initLights
}