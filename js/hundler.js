function promisify(cb, ...args) {
  return new Promise(res => {
    cb(...args, result => res(result));
  });
}

// Вариант 1
async function maxOfArray(array, cb) {
  const length = await promisify(array.length);
  let result = 0;
  let i = 0;
  let check = await promisify(less, i, length);

  while (check) {
    const element = await promisify(array.get, i);
    const max = await promisify(less, result, element);

    if (max) {
      result = element;
    }

    i = await promisify(add, i, 1);
    check = await promisify(less, i, length);
  }

  const checkCb = await promisify(equal, cb, undefined);
  if (!checkCb) {
    cb(result);
  }

  return result;
}

// Вариант 2

async function averageOfArray(array, cb) {
  const length = await promisify(array.length);
  let result = 0;
  let i = 0;
  let check = await promisify(less, i, length);

  while (check) {
    const element = await promisify(array.get, i);
    result = await promisify(add, result, element);

    i = await promisify(add, i, 1);
    check = await promisify(less, i, length);
  }
  result = await promisify(divide, result, length);

  const checkCb = await promisify(equal, cb, undefined);

  if (!checkCb) {
    cb(result);
  }

  return result;
}

// Вариант 3
async function vectorSum(v1, v2, cb) {
  const length = await promisify(v1.length);
  const result = new AsyncArray();

  let i = 0;
  let check = await promisify(less, i, length);

  while (check) {
    // в чатике по техническим вопроссам разрешили
    const [element1, element2] = await Promise.all([
      promisify(v1.get, i),
      promisify(v2.get, i),
    ])
    // const element1 = await promisify(v1.get, i);
    // const element2 = await promisify(v2.get, i);
    const sum = await promisify(add, element1, element2);

    await promisify(result.push, sum);

    i = await promisify(add, i, 1);
    check = await promisify(less, i, length);
  }

  const checkCb = await promisify(equal, cb, undefined);
  if (!checkCb) {
    cb(result);
  }

  return result;
}

// Вариант 4
async function areaOfTriangle(x1, y1, x2, y2, x3, y3, cb) {
  const [xOne, xTwo, yOne, yTwo] = await Promise.all([
    promisify(subtract, x1, x3),
    promisify(subtract, x2, x3),
    promisify(subtract, y1, y3),
    promisify(subtract, y2, y3)
  ]);
  
  const [mulOne, mulTwo] = await Promise.all([
    promisify(multiply, xOne, yTwo),
    promisify(multiply, xTwo, yOne)
  ]);

  const sub = await promisify(subtract, mulOne, mulTwo);

  const result = await promisify(multiply, sub, 0.5);

  const checkCb = await promisify(equal, cb, undefined);
  if (!checkCb) {
    cb(result);
  }

  return result;
}

// Вариант 5


// Вариант 6
async function sumOdd(array, cb) {
  const length = await promisify(array.length);
  let result = 0;
  let i = 0;
  let check = await promisify(less, i, length);

  while (check) {
    const element = await promisify(array.get, i);
    const checkMod = await promisify(mod, element, 2);
    const checkEqual = await promisify(equal, checkMod, 1);

    if (checkEqual) {
      result = await promisify(add, result, element);
    }

    i = await promisify(add, i, 1);
    check = await promisify(less, i, length);
  }

  const checkCb = await promisify(equal, cb, undefined);
  if (!checkCb) {
    cb(result);
  }

  return result;
}

// Вариант 7
async function sumEven(array, cb) {
  const length = await promisify(array.length);
  let result = 0;
  let i = 0;
  let check = await promisify(less, i, length);

  // придумывать название переменным очень сложно(
  while (check) {
    const element = await promisify(array.get, i);

    result = await promisify(add, result, element);
    i = await promisify(add, i, 2);
    check = await promisify(less, i, length);
  }

  // проверка на наличие функцие callback
  // если функции нет, то просто возвращаем промисс в качестве результата))
  const checkCb = await promisify(equal, cb, undefined);
  if (!checkCb) {
    cb(result);
  }

  // в указзаной функци в качестве интефейса указан 
  // AsyncArray, я надеюсь это массив number[],
  // поэтому не привожу и не проверяю на типы)
  return result;
}

