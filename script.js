let meters = [
  "Gm",
  "Mm",
  "km",
  "hm",
  "dam",
  "m",
  "cm",
  "mm",
  "mum",
  "nm",
  "pm",
];

let fromUnit = "";
let toUnit = "";

const fromUnitElem = document.getElementById("from-unit");

const toUnitElem = document.getElementById("to-unit");

function initElem(m, n) {
  const lg = document.createElement("option");
  lg.setAttribute("value", m);
  lg.innerText = m;

  if (m === "m") {
    lg.setAttribute("selected", "");
  }

  n.appendChild(lg);
}

meters.forEach((c) => {
  initElem(c, fromUnitElem);
  initElem(c, toUnitElem);
});

[fromUnitElem, toUnitElem].forEach((c) => {
  c.onchange = () => {
    if (c === fromUnitElem) {
      fromUnit = fromUnitElem.value;
    }

    if (c === toUnitElem) {
      toUnit = toUnitElem.value;
    }
  };
});

const from = document.getElementById("from");

const to = document.getElementById("to");

from.addEventListener("input", () => {
  to.value = from.value;
});
