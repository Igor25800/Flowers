import {MoneyPipe} from "./money.pipe";

fdescribe('moneyPipes', () => {
  const pipe = new MoneyPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform', () => {
    const value = 2555
    expect(pipe.transform(value)).toBe(`€${value} EUR`)
  });
});
