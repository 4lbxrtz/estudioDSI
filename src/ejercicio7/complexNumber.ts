export class ComplexNumber {
  private _real: number;
  private _imaginary: number;

  constructor(real: number, imaginary: number) {
    this._real = real;
    this._imaginary = imaginary;
  }

  get real(): number {
    return this._real;
  }

  get imaginary(): number {
    return this._imaginary;
  }

  add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this._real + other._real,
      this._imaginary + other._imaginary,
    );
  }

  subtract(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this._real - other._real,
      this._imaginary - other._imaginary,
    );
  }

  multiply(other: ComplexNumber): ComplexNumber {
    const real = this._real * other._real - this._imaginary * other._imaginary;
    const imaginary =
      this._real * other._imaginary + this._imaginary * other._real;
    return new ComplexNumber(real, imaginary);
  }

  divide(other: ComplexNumber): ComplexNumber {
    const denom = other._real ** 2 + other._imaginary ** 2;
    if (denom === 0) {
      throw new Error("Cannot divide by zero.");
    }
    const real =
      (this._real * other._real + this._imaginary * other._imaginary) / denom;
    const imaginary =
      (this._imaginary * other._real - this._real * other._imaginary) / denom;
    return new ComplexNumber(real, imaginary);
  }

  toString(): string {
    const sign = this._imaginary >= 0 ? "+" : "-";
    return `${this._real} ${sign} ${Math.abs(this._imaginary)}i`;
  }
}

const a = new ComplexNumber(2, 3); // 2 + 3i
const b = new ComplexNumber(1, -4); // 1 - 4i

console.log(a.add(b).toString()); // "3 - 1i"
console.log(a.subtract(b).toString()); // "1 + 7i"
console.log(a.multiply(b).toString()); // "14 - 5i"
console.log(a.divide(b).toString()); // "-0.5882352941176471 + 0.6470588235294118i"
