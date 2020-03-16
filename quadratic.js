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
  
  const getDiscriminant = (a, b, c) => (
    multiply(a, c).
    then((mulAC) => Promise.all([multiply(b, b), multiply(4, mulAC)])).
    then(([sqrB, mulResult]) => subtract(sqrB, mulResult))
  );
  
  const quadratic = (a, b, c, cb) => {
    let discriminant;
    getDiscriminant(a, b, c).
    then((resultDiscriminant) => {
      discriminant = resultDiscriminant;
      return less(discriminant, 0);
    }).
    then((isNegative) => {
      if (isNegative) {
        return new Promise((_, reject) => reject());
      }
      return Promise.all([subtract(0, b), sqrt(discriminant)]);
    }).
    then(([minusB, discriminantSqrt]) => (
      Promise.all([subtract(minusB, discriminantSqrt), add(minusB, discriminantSqrt), multiply(2, a)])
    )).
    then(([subNumer, addNumer, denom]) => (
      Promise.all([divide(subNumer, denom), divide(addNumer, denom)])
    )).
    then(([firstResult, secondResult]) => cb(firstResult, secondResult)).
    catch(() => {
      console.log('У квадратного уравнения нет корней')
    });
  };

  window.quadratic = quadratic;
})();