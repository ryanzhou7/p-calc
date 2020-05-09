function incrementBy(e, stateSetter, value) {
  e.preventDefault();
  stateSetter((previous) => previous + value);
}

function incrementOrginCoordinates(e, xIncrement, yIncrement, stateSetter) {
  e.preventDefault();
  stateSetter(({ x, y }) => {
    return { x: x + xIncrement, y: y + yIncrement };
  });
}

export { incrementBy, incrementOrginCoordinates };
