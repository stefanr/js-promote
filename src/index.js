/*
 * promote
 */

function _promote(obj: object, promotype: callable, opts?: object): callable {
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
  let proto = Object.getPrototypeOf(obj);
  let otype = (proto && proto.constructor) || null;
  if (!opts.unsafe && otype && !(promotype.prototype instanceof otype)) {
    throw new Error("Unable to promote object because of incompatible types");
  }
  Object.setPrototypeOf(obj, promotype.prototype);
  return otype;
}

export function promote(obj: object, promotype: callable, opts?: object): Promise {
  if (this !== undefined && this !== null) {
    [obj, promotype, opts] = [this, obj, promotype];
  }
  return new Promise((resolve) => {
    return resolve(obj, promotype, _promote(obj, promotype, opts));
  });
}

export function promoteSync(obj: object, promotype: callable, opts?: object): boolean {
  try {
    if (this !== undefined && this !== null) {
      [obj, promotype, opts] = [this, obj, promotype];
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

export default promote;
promote.sync = promoteSync;
