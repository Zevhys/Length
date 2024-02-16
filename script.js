let meters = [
  "Tm",
  "Gm",
  "Mm",
  "km",
  "hm",
  "dam",
  "m",
  "dm",
  "cm",
  "mm",
  "mum",
  "nm",
  "pm",
  "fm",
];

let metersName = [
  "Terameter",
  "Gigameter",
  "Megameter",
  "Kilometer",
  "Hectometer",
  "Decameter",
  "Meter",
  "Decimeter",
  "Centimeter",
  "Milimeter",
  "Micrometer",
  "Nanometer",
  "Picometer",
  "Femtometer",
];

let fromUnit = "";
let toUnit = "";

const fromUnitElem = document.getElementById("from-unit");
const toUnitElem = document.getElementById("to-unit");

function initElem(m, n, i) {
  const lg = document.createElement("option");
  lg.setAttribute("value", m);

  lg.innerText = metersName[i];

  if (m === "m") {
    lg.setAttribute("selected", "");
  }

  n.appendChild(lg);
}

meters.forEach((c, i) => {
  initElem(c, fromUnitElem, i);
  initElem(c, toUnitElem, i);
});

[fromUnitElem, toUnitElem].forEach((c) => {
  c.onchange = () => {
    if (c === fromUnitElem) {
      fromUnit = fromUnitElem.value;
      convertUnit();
    }

    if (c === toUnitElem) {
      toUnit = toUnitElem.value;
      convertUnit(true);
    }
  };
});

const from = document.getElementById("from");
const to = document.getElementById("to");

from.addEventListener("input", () => {
  convertUnit();
});

to.addEventListener("input", () => {
  convertUnit(true);
});

function convertUnit(rev = false) {
  let fromUnitEl = rev ? toUnitElem : fromUnitElem;
  let toUnitEl = rev ? fromUnitElem : toUnitElem;

  let fromI = rev ? to : from;
  let toI = rev ? from : to;

  const length = meters.length;
  const cmPos = meters.indexOf("cm");
  let lengthArr = [];
  for (let i = 0; i < length; i++) {
    lengthArr.push(i + 1 - cmPos);
  }

  const getIdx = (v) => {
    let idx = lengthArr[meters.indexOf(v.value)] - 1 * -1;
    return Math.ceil(Math.abs(idx) ** 2 / 3) * Math.sign(idx);
  };

  let fromIdx = getIdx(fromUnitEl);

  let f = 10.0;
  f = 10.0 ** (fromIdx * -1);

  let m = fromI.value * f;

  let toIdx = getIdx(toUnitEl);
  f = 10.0 ** toIdx;
  toI.value = m * f;
}
from.value = 0;
to.value = 0;

convertUnit();
