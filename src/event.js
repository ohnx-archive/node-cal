/*
 * node-cal
 * nodejs calendar module
 * event class
 *
 * ohnx was here (2015)
 *
 */

'use strict';
var util = require('./util.js');

var exports = module.exports = {};

// CalEvent object
function CalEvent(name, startDate, endDate, alarms, description, location, uid) {
    if (startDate instanceof Date) { this.startDate = startDate; } else { return null; }
    if (endDate instanceof Date) { this.endDate = endDate; } else { return null; }
    this.alarms = alarms;
    this.uid = uid == null ? (util.guid() + '@node-cal-event.js') : uid;
    this.summary = name;
    this.location = location;
    this.description = description;
}

function RepeatingCalEvent(event, eventLength, testFunc) {
    if(!util.isValidEvent(event)) return null;
    if(eventLength == null) eventLength = 0;
    if(testFunc == null) return null;
    this.event = event;
    this.eventLength = eventLength;
    this.testFunc = testFunc;
}

var repeatWeekly = function(startDate, date) {
    var timeDiff = Math.abs(date.getTime() - startDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays % 7 == 0;
};

CalEvent.prototype.toJSON = function() {
    var json;
    json = "{";
    json += "\"uid\" : \"" + util.makeSafe(this.uid) + "\",\n";
    json += "\"summary\" : \"" + util.makeSafe(this.summary) + "\",\n";
    json += "\"location\" : \"" + util.makeSafe(this.location == null ? "" : this.location) + "\",\n";
    json += "\"description\" : \"" + util.makeSafe(this.description == null ? "" : this.description) + "\",\n";
    json += "\"startDate\" : \"" + this.startDate.toISOString() + "\",\n";
    json += "\"endDate\" : \"" + this.endDate.toISOString() + "\",\n";
    json += "\"alarms\" : " + JSON.stringify(this.alarms) + "\n";
    json += "}";
    return json;
};

var eventFromJSON = function(json) {
    if(json == null) return null;
    try {
        var keys = JSON.parse(json);
        return new CalEvent
        (
            keys["summary"],
            new Date(keys["startDate"]),
            new Date(keys["endDate"]),
            keys["alarms"],
            keys["description"],
            keys["location"],
            keys["uid"]
        );
    } catch (e) {
        return null;
    }
};

exports.CalEvent = CalEvent;
exports.RepeatingCalEvent = RepeatingCalEvent;
exports.repeatWeekly = repeatWeekly;
exports.eventFromJSON = eventFromJSON;
