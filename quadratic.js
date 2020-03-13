(() => {
  const promisify = (fn) => (...args) => {
    return new Promise((resolve) => {
      fn(...args, resolve)
    });
  };
  
  const sqrt = promisify(window.sqrt);
  const add = promisify(window.add);
  const subtract = promisify(window.subtract);
  const multiply = promisify(window.multiply);
  const divide = promisify(window.divide);
  
  const getDiscriminant = (a, b, c) => {
    let sqrB;
    return multiply(b, b).
    then((result) => {
      sqrB = result;
      return multiply(4, a);
    }).
    then((result) => multiply(result, c)).
    then((result) => subtract(sqrB, result));
  }
  
  const quadratic = (a, b, c, cb) => {
    let discriminantSqrt;
    let minusB;
    let denom;
    let first;
    let second;
    getDiscriminant(a, b, c).
    then((discriminant) => sqrt(discriminant)).
    then((discriminantSqrt) => {
      discriminantSqrt = discriminantSqrt;
      return subtract(0, b);
    }).
    then((minusB) => {
      minusB = minusB;
      return multiply(2, a);
    }).
    then((denom) => {
      denom = denom;
      return add(minusB, discriminantSqrt);
    }).
    then((numer) => divide(numer, denom)).
    then((result) => {
      first = result;
      return subtract(minusB, discriminantSqrt);
    }).
    then((numer) => divide(numer, denom)).
    then((result) => {
      second = result;
      return cb(first, second)
    });
  };

  window.quadratic = quadratic;
})();