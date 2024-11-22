import isEqual from 'lodash/isEqual';

export abstract class ValueObject {
  public equals(vo: this): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.constructor.name !== this.constructor.name) {
      return JSON.stringify(this) === JSON.stringify(vo);
    }

    return isEqual(vo, this);
  }
}
