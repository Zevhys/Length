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

const imperials = {
  in: {
    name: "Inch",
    conv(m) {
      return m * 39.26;
    },
  },

  ft: {
    name: "Foot",
    conv(m) {
      return m * 3.28084;
    },
  },

  yd: {
    name: "Yard",
    conv(m) {
      return m * 1.0936;
    },
  },

  mi: {
    name: "Mile",
    conv(m) {
      return m / 1609.344;
    },
  },
};

let fromUnit = "";
let toUnit = "";

const fromUnitElem = document.getElementById("from-unit");
const toUnitElem = document.getElementById("to-unit");

function initElem(m, n, i) {
  const lg = document.createElement("option");
  lg.setAttribute("value", m);

  if (meters.includes(m)) {
    lg.innerText = metersName[i];
  } else {
    lg.innerText = i.name;
  }

  if (m === "m") {
    lg.setAttribute("selected", "");
  }

  n.appendChild(lg);
}

meters.forEach((c, i) => {
  initElem(c, fromUnitElem, i);
  initElem(c, toUnitElem, i);
});

fromUnitElem.appendChild(document.createElement("hr"));
toUnitElem.appendChild(document.createElement("hr"));

for (const w in imperials) {
  initElem(w, fromUnitElem, imperials[w]);
  initElem(w, toUnitElem, imperials[w]);
}

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

  // console.log(fromIdx, toIdx);

  let f = 10.0;
  f = 10.0 ** (fromIdx * -1);

  let m = fromI.value * f;

  if (meters.includes(toUnitEl.value)) {
    let toIdx = getIdx(toUnitEl);
    f = 10.0 ** toIdx;
    toI.value = m * f;
  } else {
    console.log(imperials[toUnitEl.value]);
    toI.value = imperials[toUnitEl.value].conv(m);
  }
}

convertUnit();
