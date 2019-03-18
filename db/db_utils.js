const db = require('better-sqlite3')('./db/yeelight-brain.db');
var moment = require('moment');

/*              INSERT LOGS                 */
function insertLog(P_status_code, P_ip, P_route) {
    let date_day = moment().format("DD/MM/YYYY");
    let date_hour = moment().format("hh:mm:ss");
    let O_row = db.prepare("INSERT INTO logs (date_day, status_code, ip, route, date_hour) VALUES (?,?,?,?,?)");

    O_row.run(date_day, P_status_code, P_ip, P_route, date_hour);
}


function middleware_logs (req, res, next) {
    insertLog(res.statusCode, req.ip, req.originalUrl);
    next();
};



/*              INSERT LIGHTS                 */
function insertLights(P_O_Light) {
    let V_S_ip = P_O_Light.light.device.Location;
    V_S_ip = V_S_ip.substring(V_S_ip.indexOf("://")+3, V_S_ip.length);
    V_S_ip = V_S_ip.substring(0, V_S_ip.indexOf(":"));

    const stmt = db.prepare('SELECT mi_id FROM lights WHERE mi_id = ?');

    const V_O_light = stmt.all(P_O_Light.light.device.id);
    if ( V_O_light.length <= 0 ) {
        let O_row = db.prepare("INSERT INTO lights (id, model, mi_id, last_ip) VALUES (?,?,?,?)");
        O_row.run(P_O_Light.id, P_O_Light.light.device.model, P_O_Light.light.device.id, V_S_ip);
    }
}


/*              GET ALL LIGHTS                 */
function getAllLights() {
    const stmt = db.prepare('SELECT * FROM lights');
    const V_O_light = stmt.all();

    return V_O_light;
}



module.exports = {
    insertLog,
    insertLights,
    getAllLights,
    middleware_logs
}