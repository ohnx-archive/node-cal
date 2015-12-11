/*
 * node-cal
 * nodejs calendar module
 * misc util functions for the classes
 *
 * ohnx was here (2015)
 *
 */

'use strict';
var CalEvent = require('./event.js').CalEvent;

var exports = module.exports = {};

function guid() {
    function s4() {
        return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
}

function isValidEvent(event) {
    try {
        if (event.uid == null) return false;
        if (event.summary == null) return false;
        if (event.startDate == null) return false;
        if (event.endDate == null) return false;
        return true;
    } catch (e) {
        return false;
    }
}

function dateToStr(date) {
    //ics has date formatting like ISO, just without all the dashes and colons
    //ie, 19970715T040000Z
    var icsDate = date.toISOString();
    // remove everything after miliseconds
    icsDate = icsDate.substring(0, icsDate.indexOf('.'));
    //add back the Z
    icsDate += "Z";
    //remove dashes
    icsDate = icsDate.replace(/-/g,'');
    //remove colons
    icsDate = icsDate.replace(/:/g,'');
    return icsDate;
}

function makeSafe(str, isICS) {
    if (isICS) {
        str = str
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
    }
    return str
    .replace(/\n/g, "\\n")
    .replace(/\"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

function makeUnsafe(str) {
    return str
    .replace(/\\n/g, "\n")
    .replace(/\\\"/g, '"')
    .replace(/\\r/g, "\r")
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\t/g, "\t");
}

exports.guid = guid;
exports.dateToStr = dateToStr;
exports.isValidEvent = isValidEvent;
exports.makeSafe = makeSafe;
exports.makeUnsafe = makeUnsafe;
