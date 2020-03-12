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


Promise.allSettled = function (promises) {
  return Promise.all(
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
}
