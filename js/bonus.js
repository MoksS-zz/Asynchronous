Promise.prototype.finally = function (onFinally) {
  return this.then(
    res => Promise.resolve(onFinally()).then(() => res),
    err => Promise.resolve(onFinally()).then(() => { throw err; })
  );
};

Promise.any = (promises) => {
  return Promise.all(
    promises.map(promise =>
      promise.then(val => {
        throw val;
      }, reason => reason),
    ),
  ).then(reasons => {
    throw reasons;
  }, firstResolved => firstResolved);
};


Promise.allSettled = promises =>
  Promise.all(
    promises.map(promise =>
      promise
        .then(value => ({
          status: "fulfilled",
          value,
        }))
        .catch(reason => ({
          status: "rejected",
          reason,
        }))
    )
  );

const start = Date.now();
Promise.resolve('foo')
  .finally(() => new Promise(resolve => setTimeout(() => resolve(), 1000)))
  .then(res => console.log(res, Date.now() - start));

Promise.reject(new Error('bar'))
  .finally(() => Promise.reject(new Error('foo')))
  .catch(err => console.log(err.message));

Promise.resolve('foo')
  .then(res => console.log(res, Date.now() - start))
  .finally(() => console.log("WORK"))

  const promise1 = Promise.resolve(3);
  const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
  const promises = [promise1, promise2];

  Promise.allSettled(promises).
    then((results) => results.forEach((result) => console.log(result.status)));

Promise.any([
  Promise.reject('✗'),
  Promise.reject('✗'),
  Promise.resolve('✓'),
  Promise.reject('✗'),
]).then(function (value) {
  console.log(`You win at life`, value)
});