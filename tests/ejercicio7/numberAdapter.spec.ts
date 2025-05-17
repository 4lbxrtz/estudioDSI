import { describe, test, expect } from "vitest";
import { Adapter } from "../../src/ejercicio7/numberAdapter";
import { ComplexNumber } from "../../src/ejercicio7/complexNumber";

const first = new Adapter(new ComplexNumber(1, 2), new ComplexNumber(3, -1));

const second = new Adapter(new ComplexNumber(2, 0), new ComplexNumber(1, 1));

describe("Number adapter tests", () => {
  test("Add tests", () => {
    expect(first.add(second).toString()).toBe("(5 + 1i) / (4 + 2i)");
  });

  test("Substract tests", () => {
    expect(first.subtract(second).toString()).toBe("(-7 + 5i) / (4 + 2i)");
  });

  test("Multiply tests", () => {
    expect(first.multiply(second).toString()).toBe("(2 + 4i) / (4 + 2i)");
  });

  test("Divide tests", () => {
    expect(first.divide(second).toString()).toBe("(-1 + 3i) / (6 - 2i)");
  });

  test("Denominator equal to zero", () => {
    expect(() => {
      new Adapter(new ComplexNumber(2, 0), new ComplexNumber(0, 0));
    }).toThrowError("Denominator cannot be zero.");
  });
});
