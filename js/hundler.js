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
async function equation(a, b, c, cb) {
  const checkCb = await promisify(equal, cb, undefined);

  const b2 = await promisify(multiply, b, b);
  const ac = await promisify(multiply, a, c);
  const ac4 = await promisify(multiply, ac, 4);

  const D = await promisify(subtract, b2, ac4);

  const lessD = await promisify(less, D, 0);

  if (lessD) {
    if (!checkCb) {
      cb({});
    }

    return {};
  }

  // если дескриминант равен 0
  const equalD = await promisify(equal, D, 0);
  const a2 = await promisify(multiply, a, 2);

  if (equalD) {
    // давайте представим что я умножил b на -1 вашим api, спасибо :3
    const result1 = await promisify(divide, -b, a2);

    if (!checkCb) {
      cb({ result1 });
    }
    return { result1 };
  }

  const sqrtD = await promisify(sqrt, D);
  const x1 = await promisify(add, -b, sqrtD);
  const x2 = await promisify(subtract, -b, sqrtD);

  const result1 = await promisify(divide, x1, a2);
  const result2 = await promisify(divide, x2, a2);

  if (!checkCb) {
    cb({
      result1,
      result2
    });
  }
  return {
    result1,
    result2
  };
}

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

// Вариант 8

async function AsyncMap(array, fn, cb) {

  const length = await promisify(array.length);
  // map создает новый массив, а не меняет старый, поэтому дублирую
  const result = new AsyncArray();
  let i = 0;
  let check = await promisify(less, i, length);

  while (check) {
    const element = await promisify(array.get, i);

    const newElemet = fn(element, i, array);
    await promisify(result.push, newElemet);

    i = await promisify(add, i, 1);
    check = await promisify(less, i, length);
  }

  const checkCb = await promisify(equal, cb, undefined);
  if (!checkCb) {
    cb(result);
  }

  return result;
}

// Вариант 9

async function AsyncReduce(array, fn, initialValue = 0, cb) {

  const length = await promisify(array.length);
  let result;
  let cur = initialValue;
  let i = 0;
  let check = await promisify(less, i, length);

  while (check) {
    const element = await promisify(array.get, i);
    console.log("jopa", cur)
    result = fn(cur, element, i, array);
    cur = result;

    i = await promisify(add, i, 1);
    check = await promisify(less, i, length);
  }

  const checkCb = await promisify(equal, cb, undefined);
  if (!checkCb) {
    cb(result);
  }

  return result;
}


// Вариант 10

async function AsyncFilter(array, fn, cb) {
  const length = await promisify(array.length);
  const result = new AsyncArray();
  let i = 0;
  let check = await promisify(less, i, length);

  while (check) {
    const element = await promisify(array.get, i);

    const filter = fn(element, i, array);

    if (filter) {
      await promisify(result.push, element);
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
