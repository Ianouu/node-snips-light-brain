const db = require('better-sqlite3')('./db/yeelight-brain.db');
var moment = require('moment');


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

module.exports = {
    insertLog,
    middleware_logs
}