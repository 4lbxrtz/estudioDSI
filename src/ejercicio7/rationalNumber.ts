export class RationalNumber {
  private _numerator: number;
  private _denominator: number;

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero.");
    }
    this._numerator = numerator;
    this._denominator = denominator;
  }

  add(other: RationalNumber): RationalNumber {
    const num =
      this._numerator * other._denominator +
      other._numerator * this._denominator;
    const den = this._denominator * other._denominator;
    return new RationalNumber(num, den);
  }

  subtract(other: RationalNumber): RationalNumber {
    const num =
      this._numerator * other._denominator -
      other._numerator * this._denominator;
    const den = this._denominator * other._denominator;
    return new RationalNumber(num, den);
  }

  multiply(other: RationalNumber): RationalNumber {
    const num = this._numerator * other._numerator;
    const den = this._denominator * other._denominator;
    return new RationalNumber(num, den);
  }

  divide(other: RationalNumber): RationalNumber {
    if (other._numerator === 0) {
      throw new Error("Cannot divide by zero.");
    }
    const num = this._numerator * other._denominator;
    const den = this._denominator * other._numerator;
    return new RationalNumber(num, den);
  }

  toString(): string {
    return `${this._numerator}/${this._denominator}`;
  }
}

const a = new RationalNumber(1, 2);
const b = new RationalNumber(1, 3);

console.log(a.add(b).toString()); // "5/6"
console.log(a.subtract(b).toString()); // "1/6"
console.log(a.multiply(b).toString()); // "1/6"
console.log(a.divide(b).toString()); // "3/2"
