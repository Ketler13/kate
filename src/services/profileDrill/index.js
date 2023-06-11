function getMiddle(val) {
  return val / 2;
}

function getInner(val, holes) {
  return ((val - 80) / (holes - 1)) + 40;
}

function toCM(val) {
  return (val / 10).toFixed(3);
}

export function calculateDrill(rawValue) {
  const length = rawValue * 10;

  let result = '';

  if (length <= 393) {
    result = 'Всего два';
  } else if (length >= 394 && length <= 793) {
    const middle = getMiddle(length);
    result = `Всего три, середина ${toCM(middle)}`;
  } else if (length >= 794 && length <= 1293) {
    const inner = getInner(length, 4);
    result = `Всего четыре, два по ${toCM(inner)}`;
  } else {
    const middle = getMiddle(length);
    const inner = getInner(length, 5);
    result = `Всего пять, середина ${toCM(middle)}, два по ${toCM(inner)}`;
  }
  
  return result;
}