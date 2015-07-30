/*
 * promote
 */

/**
 * _promote
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promote = promote;
exports.promoteSync = promoteSync;
function _promote(obj, promotype, opts) {
  opts = opts || {};
  if (obj === undefined || obj === null) {
    throw new Error("Invalid object");
  }
  if (typeof promotype !== "function") {
    throw new Error("Invalid promotype");
  }
  if (opts.strict && obj instanceof promotype) {
    throw new Error("Object is already instance of promotype");
  }
  var proto = Object.getPrototypeOf(obj);
  var otype = proto && proto.constructor || null;
  if (!opts.unsafe && otype && !(promotype.prototype instanceof otype)) {
    throw new Error("Unable to promote object because of incompatible types");
  }
  Object.setPrototypeOf(obj, promotype.prototype);
  return otype;
}

/**
 * promote
 */

function promote(obj, promotype, opts) {
  if (this) {
    var _ref = [this, obj, promotype];
    obj = _ref[0];
    promotype = _ref[1];
    opts = _ref[2];
  }
  return new Promise(function (resolve) {
    return resolve(obj, promotype, _promote(obj, promotype, opts));
  });
}

/**
 * promoteSync
 */

function promoteSync(obj, promotype, opts) {
  try {
    if (this) {
      var _ref2 = [this, obj, promotype];
      obj = _ref2[0];
      promotype = _ref2[1];
      opts = _ref2[2];
    }
    _promote(obj, promotype, opts);
    return true;
  } catch (err) {
    if (opts && opts.silent) {
      return false;
    }
    throw err;
  }
}

/**
 * default
 */
exports["default"] = promote;