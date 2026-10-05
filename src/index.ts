type GetOwnKeys<T extends boolean> = (T extends true
  ? string | symbol
  : string)[];

export const HAS_OWN = Object.hasOwn;

export const OWN_DESC = Object.getOwnPropertyDescriptor;

export const OWN_DESCS = Object.getOwnPropertyDescriptors;

export function OWN_ENUM_KEYS<T extends boolean = false>(
  object: object,
  symbol?: T,
): GetOwnKeys<T> {
  return typeof symbol !== 'boolean' || !symbol
    ? OWN_ENUM_STRING_KEYS(object)
    : ([
        ...OWN_ENUM_STRING_KEYS(object),
        ...OWN_ENUM_SYMBOL_KEYS(object),
      ] as GetOwnKeys<T>);
}

export function OWN_ENUM_STRING_KEYS(object: object): string[] {
  const keys = Object.keys(object);

  for (const key of keys) {
    if (isUnsafeKey(key)) {
      keys.splice(keys.indexOf(key), 1);
    }
  }

  return keys;
}

export function OWN_ENUM_SYMBOL_KEYS(object: object): symbol[] {
  const keys = OWN_SYMBOL_KEYS(object);

  for (const key of keys) {
    if (!Object.prototype.propertyIsEnumerable.call(object, key)) {
      keys.splice(keys.indexOf(key), 1);
    }
  }

  return keys;
}

export function OWN_KEYS<T extends boolean = false>(
  object: object,
  symbol?: T,
): GetOwnKeys<T> {
  return typeof symbol !== 'boolean' || !symbol
    ? OWN_STRING_KEYS(object)
    : ([
        ...OWN_STRING_KEYS(object),
        ...OWN_SYMBOL_KEYS(object),
      ] as GetOwnKeys<T>);
}

export function OWN_STRING_KEYS(object: object): string[] {
  const keys = Object.getOwnPropertyNames(object);

  for (const key of keys) {
    if (isUnsafeKey(key)) {
      keys.splice(keys.indexOf(key), 1);
    }
  }

  return keys;
}

export const OWN_SYMBOL_KEYS = Object.getOwnPropertySymbols;

function isUnsafeKey(key: PropertyKey): boolean {
  return (
    typeof key === 'string' &&
    (key === '__proto__' || key === 'prototype' || key === 'constructor')
  );
}
