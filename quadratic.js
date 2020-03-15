(() => {


  const promisify = (fn) => (...args) => {
    return new Promise((resolve) => {
      fn(...args, resolve)
    });
  };
  
  const sqrt = promisify(window.Homework.sqrt);
  const add = promisify(window.Homework.add);
  const subtract = promisify(window.Homework.subtract);
  const multiply = promisify(window.Homework.multiply);
  const divide = promisify(window.Homework.divide);
  const less = promisify(window.Homework.less);
  
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
    let discriminant;
    let discriminantSqrt;
    let minusB;
    let denom;
    let first;
    let second;
    getDiscriminant(a, b, c).
    then((resultDiscriminant) => {
      discriminant = resultDiscriminant;
      return less(discriminant, 0);
    }).
    then((isNegative) => {
      if (isNegative) {
        return new Promise((_, reject) => reject());
      }
      return sqrt(discriminant);
    }).
    then((sqrtFromDiscriminant) => {
      discriminantSqrt = sqrtFromDiscriminant;
      return subtract(0, b);
    }).
    then((resultMinusB) => {
      minusB = resultMinusB;
      return multiply(2, a);
    }).
    then((resultDenom) => {
      denom = resultDenom;
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
    })
    .catch(() => {
      console.log('У квадратного уравнения нет корней')
    });
  };

  window.quadratic = quadratic;
})();