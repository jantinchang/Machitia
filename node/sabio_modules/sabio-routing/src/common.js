const debug = require("sabio-debug");

const routeDebugger = debug.extend("routing");
const routeDebuggerVerbose = debug.extend("verbose:routing");

const SCHEMAS = {
  ROUTES: {
    PREFIX: "sabio:schemas.routes.prefix",
    ROUTE: "sabio:schemas.routes.route",
    ANONYMOUS: "sabio:schemas.routes.allowanonymous",
    ROLEAUTHORIZATION: "sabio:schemas.routes.roleauthorization"
  }
};

// export const SUPPORTED_METHODS = ["get", "put", "post", "delete", "patch"];

const isReflectEnabled = false; //typeof Reflect.defineMetadata === "function";
const _dataStore = {};

const common = {
  routeDebugger,
  routeDebuggerVerbose,
  SCHEMAS,
  setMetaData,
  getDecorators,
  getStore,
  getDecoratorsFromReflect
};

function setMetaData(metadataKeyPart, value, target, isCollection) {
  setByKey(metadataKeyPart, value, target, isCollection);
}

function getDecorators(metadataKeyPart, target, propertyName) {
  routeDebuggerVerbose("getDecorators", target);

  let decorators = null;

  if (!isReflectEnabled) {
    decorators = get(metadataKeyPart, target);
  } else {
    decorators = getDecoratorsFromReflect(
      metadataKeyPart,
      target,
      propertyName
    );
  }

  return decorators;
}

function getStore(metadataKeyPart) {
  let decorators = null;

  if (!isReflectEnabled) {
    decorators = get(metadataKeyPart);
  } else {
    throw new Error("Unsupported Data Store Configuration");
  }

  return decorators;
}

function getDecoratorsFromReflect(metadataKeyPart, target, propertyName) {
  const keys = propertyName
    ? Reflect.getMetadataKeys(target, propertyName)
    : Reflect.getMetadataKeys(target);

  routeDebuggerVerbose(keys);

  const decorators = keys
    .filter(key => key.toString().startsWith(metadataKeyPart))
    .reduce((values, key) => {
      const currentDecorators = propertyName
        ? Reflect.getMetadata(key, target, propertyName)
        : Reflect.getMetadata(key, target);

      return values.concat(currentDecorators);
    }, []);

  return decorators;
}

function ensureKey(key) {
  if (!_dataStore[key]) {
    _dataStore[key] = new Map();
  }
}

function get(key, target) {
  let values = null;
  if (_dataStore[key] && target) {
    values = _dataStore[key].get(target);
  } else if (_dataStore[key]) {
    values = _dataStore[key];
  }

  return values;
}

function setByKey(key, value, target, isCollection) {
  ensureKey(key);
  const map = _dataStore[key];
  let existing = map.get(target);

  if (existing && !isCollection) {
    routeDebuggerVerbose(`Overriding key value ${key} to ${value}`);
  }

  if (!isCollection) {
    map.set(target, value);
  } else {
    if (!existing) {
      existing = [];
    }
    existing.push(value);
    map.set(target, existing);
  }
}

module.exports = common;
