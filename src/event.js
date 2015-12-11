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
function CalEvent(name, startDate, endDate, description, location) {
    if (startDate instanceof Date) { this.startDate = startDate; } else { return null; }
    if (endDate instanceof Date) { this.endDate = endDate; } else { return null; }
    this.uid = util.guid() + '@node-cal-event.js';
    this.summary = name;
    this.location = location;
    this.description = description;
}

CalEvent.prototype.toJSON = function() {
    var json;
    json = "{";
    json += "\"uid\" : \"" + util.makeSafe(this.uid) + "\",\n";
    json += "\"summary\" : \"" + util.makeSafe(this.summary) + "\",\n";
    json += "\"location\" : \"" + util.makeSafe(this.location) + "\",\n";
    json += "\"description\" : \"" + util.makeSafe(this.description) + "\",\n";
    json += "\"startDate\" : \"" + this.startDate.toISOString() + "\",\n";
    json += "\"endDate\" : \"" + this.endDate.toISOString() + "\"\n";
    json += "}";
    return json;
};

exports.CalEvent = CalEvent;