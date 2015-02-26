'use strict';

var mongoose = require('mongoose'),
    tuple = require('../schemas/tuple'),
    Tuple = tuple.Tuple;

var TimelineEntrySchema = new mongoose.Schema({
    verb: {type: String},
    language: {type: String},
    published: {type: Date, default: Date.now},
    actor: {
        objectType: {type: String, required: true},
        _id: {type: mongoose.Schema.ObjectId, required: true},
        image: {type: String},
        displayName: {type: String}
    },
    object: {
        objectType: {type: String},
        _id: {type: mongoose.Schema.ObjectId, required: true}
    },
    target: [{
        objectType: {type: String},
        _id: {type: String, required: true}
    }],
    inReplyTo: [{
        objectType: {type: String},
        _id: {type: mongoose.Schema.ObjectId, required: true}
    }],
    to: {type: [Tuple], validate: [tuple.validateTuples, 'Bad to tuple']},
    bto: {type: [Tuple], validate: [tuple.validateTuples, 'Bad to tuple']}
});

var MemberSchema = new mongoose.Schema({
  objectType: {type: String, required: true},
  id: {type: mongoose.Schema.Types.Mixed, required: true},
  displayName: {type: String, required: true},
  status: {type: String, required: false},
  connection: {
    ipAddress: {type: String},
    userAgent: {type: String}
  }
});

var ConferenceSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  active: {type: Boolean, default: true},
  createdFrom: {type: String, default: 'web'},
  timestamps: {
    created: {type: Date, default: Date.now},
    archived: {type: Date},
    closed: {type: Date}
  },
  history: [TimelineEntrySchema],
  members: [MemberSchema],
  schemaVersion: {type: Number, default: 1}
});

/**
 * Conference mongoose Schema
 */
module.exports = mongoose.model('Conference', ConferenceSchema);
