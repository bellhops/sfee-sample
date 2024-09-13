import { isEqual, isObject, transform } from 'lodash';

const changes = (object: any, base: any) =>
  transform(object, (result: any, value, key) => {
    if (!isEqual(value, base[key])) {
      // Disabling lint rule for param reassignment here
      // Lodash transform function is not a pure accumulator style function therefore eslint throws error, no option to resolve
      // eslint-disable-next-line no-param-reassign
      result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
    }
  });

const objectDiff = (obj1: any, obj2: any) => changes(obj1, obj2);

export default objectDiff;
