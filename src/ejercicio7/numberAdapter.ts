import { ComplexNumber } from "./complexNumber.js";
import { RationalNumber } from "./rationalNumber.js";

/**
 * Adapter class that can perform RationalNumber operations with ComplexNumbers
 */
export class Adapter extends RationalNumber {
  private _num: ComplexNumber;
  private _den: ComplexNumber;
  constructor(numerator: ComplexNumber, denominator: ComplexNumber) {
    super(0, 1);
    if (denominator.real === 0 && denominator.imaginary === 0) {
      throw new Error("Denominator cannot be zero.");
    }
    this._num = numerator;
    this._den = denominator;
  }

  /**
   * Adds using complex in rational numbers
   * @param other - The other adapted number
   * @returns - The addition between the numbers
   */
  add(other: Adapter): Adapter {
    const a = this._num;
    const b = this._den;
    const c = other._num;
    const d = other._den;
    const newNum = a.multiply(d).add(c.multiply(b));
    const newDen = b.multiply(d);
    return new Adapter(newNum, newDen);
  }

  subtract(other: Adapter): Adapter {
    const a = this._num;
    const b = this._den;
    const c = other._num;
    const d = other._den;

    const newNum = a.multiply(d).subtract(c.multiply(b));
    const newDen = b.multiply(d);

    return new Adapter(newNum, newDen);
  }

  multiply(other: Adapter): Adapter {
    return new Adapter(
      this._num.multiply(other._num),
      this._den.multiply(other._den),
    );
  }

  divide(other: Adapter): Adapter {
    return new Adapter(
      this._num.multiply(other._den),
      this._den.multiply(other._num),
    );
  }

  toString(): string {
    return `(${this._num.toString()}) / (${this._den.toString()})`;
  }
}

const a = new Adapter(
  new ComplexNumber(1, 2), // numerador
  new ComplexNumber(3, -1), // denominador
);

const b = new Adapter(new ComplexNumber(2, 0), new ComplexNumber(1, 1));

console.log(a.add(b).toString());
console.log(a.subtract(b).toString());
console.log(a.multiply(b).toString());
console.log(a.divide(b).toString());
