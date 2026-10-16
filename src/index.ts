export const {
  hasOwn: HAS_OWN,
  getOwnPropertyDescriptor: OWN_DESC,
  getOwnPropertyDescriptors: OWN_DESCS,
  getOwnPropertySymbols: OWN_SYMBOL_KEYS,
} = Object;

export function OWN_ENUM_KEYS(object: object): (string | symbol)[] {
  return [...OWN_ENUM_STRING_KEYS(object), ...OWN_ENUM_SYMBOL_KEYS(object)];
}

export function OWN_ENUM_STRING_KEYS(object: object): string[] {
  const keys = Object.keys(object);

  for (const key of keys) {
    isUnsafeKey(key) && keys.splice(keys.indexOf(key), 1);
  }

  return keys;
}

export function OWN_ENUM_SYMBOL_KEYS(object: object): symbol[] {
  const keys = OWN_SYMBOL_KEYS(object);

  for (const key of keys) {
    !Object.prototype.propertyIsEnumerable.call(object, key) &&
      keys.splice(keys.indexOf(key), 1);
  }

  return keys;
}

export function OWN_KEYS(object: object): (string | symbol)[] {
  return [...OWN_STRING_KEYS(object), ...OWN_SYMBOL_KEYS(object)];
}

export function OWN_STRING_KEYS(object: object): string[] {
  const keys = Object.getOwnPropertyNames(object);

  for (const key of keys) {
    isUnsafeKey(key) && keys.splice(keys.indexOf(key), 1);
  }

  return keys;
}

function isUnsafeKey(key: string): boolean {
  return key === '__proto__' || key === 'prototype' || key === 'constructor';
}
