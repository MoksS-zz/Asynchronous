const pushPromise =  (a, el) => {
  return new Promise((res) => {
    a.push(el, () => res(a));
  });
};

const setPromise =  (a, i, el) => {
  return new Promise((res) => {
    a.set(i,el, () => res(a));
  });
}

const getPromise = (a, i) => {
  return new Promise((res) => {
    a.get(i, (result) => res(result));
  });
};

const popPromise = (a, i) => {
  return new Promise((res) => {
    a.pop(result => res(result));
  });
};

async function lengthPromise(a) {
  let b = new Promise((res, rej) => {
    a.length((result) => {
      res(result);
    });
  });
  c = await b;
  // console.log(c);
  return c
};


