/*
 * node-cal
 * nodejs calendar module
 * calendar class and related functions
 *
 * ohnx was here (2015)
 *
 */

'use strict';

var calEvent = require('./event.js');
var util = require('./util.js');

var exports = module.exports = {};

function Calendar(name, desc) {
    if(name == null) return null;
    this.prodid = "-//node-cal//"+name+"//EN";
    this.name = name;
    this.desc = desc;
    this.events = [];
}

Calendar.prototype.addEvent = function(event) {
    if (util.isValidEvent(event)) {
        this.events.push(event);
    } else {
        throw "Invalid event!";
    }
};

Calendar.prototype.toICal = function(url) {
    var serialized, len, event;
    len = this.events.length;
    serialized = "BEGIN:VCALENDAR\n" +
                "VERSION:2.0\n"+
                "CALSCALE:GREGORIAN\n" +
                "METHOD:PUBLISH\n";
    serialized += "PRODID:" + this.prodid + "\n";
    serialized += "URL:" + (url==null?"":url) + "\n";
    serialized += "NAME:" + this.name + "\n";
    serialized += "X-WR-CALNAME:" + this.name + "\n";
    serialized += "DESCRIPTION:" + (this.desc == null ? "" : this.desc) + "\n";
    serialized += "X-WR-CALDESC:" + (this.desc == null ? "" : this.desc) + "\n";
    for (var i = 0; i < len; i++) {
        event = this.events[i];
        serialized += "BEGIN:VEVENT\n";
        serialized += "UID:" + event.uid + "\n";
        serialized += "SUMMARY:" + util.makeSafe(event.summary, true) + "\n";
        serialized += "DESCRIPTION:" + util.makeSafe(event.description, true) + "\n";
        serialized += "CLASS:PUBLIC\n";
        serialized += "DTSTART:" + util.dateToStr(event.startDate) + "\n";
        serialized += "DTEND:" + util.dateToStr(event.endDate) + "\n";
        serialized += "LOCATION:" + util.makeSafe(event.location, true) + "\n";
        serialized += "END:VEVENT\n";
    }
    serialized += "END:VCALENDAR";
    return serialized;
};

Calendar.prototype.toJSON = function () {
    var json, len;
    len = this.events.length;
    json = "{\n";
    json += "\"prodid\" : \"" + this.prodid + "\",\n";
    json += "\"name\" : \"" + this.name + "\",\n";
    json += "\"desc\" : \"" + (this.desc == null ? "" : this.desc) + "\",\n";
    json += "\"events\" : [\n";
    for (var i = 0; i < len; i++) {
        json += this.events[i].toJSON() + ",\n";
    }
    json = json.slice(0, -2);
    json += "]\n}";
    return json;
};

var calFromJSON = function(json) {
    if(json == null) return null;
    try {
        var keys = JSON.parse(json);
        var newCal = new Calendar(keys["name"], keys["desc"]);
        var eA = keys["events"];
        var lenEA = eA.length;
        newCal.prodid = keys["prodid"];
        for(var i=0; i< lenEA; i++) {
            newCal.addEvent(
                new calEvent.CalEvent(
                    eA[i]["summary"],
                    new Date(eA[i]["startDate"]),
                    new Date(eA[i]["endDate"]),
                    eA[i]["description"],
                    eA[i]["location"],
                    eA[i]["uid"]
                )
            );
        }
        return newCal;
    } catch (e) {
        return null;
    }
};

exports.Calendar = Calendar;
exports.calFromJSON = calFromJSON;
