const performanceCalculation = (
  pressureAltitude,
  oat,
  aircraftWeight,
  flapSetting,
  windSpeed,
  windDirection,
  runwayOfIntendedUse,
  dataSet
) => {
  let ceilX = 0;
  let floorX = 0;
  let ceilY = 0;
  let floorY = 0;
  const lerp = (a, b, amount) => (1 - amount) * a + amount * b;
  const precise = (x) => Number.parseFloat(x).toFixed(2);
  const windMod = (rwis, w, v) => {
    const dtr = (deg) => deg * (Math.PI / 180);
    const angle = rwis - w;
    const headwind = Math.abs(parseFloat(Math.cos(dtr(angle)).toFixed(10))) * v || 0;
    const crosswind =
      Math.abs(parseFloat(Math.sin(dtr(angle)).toFixed(10))) * v;
    return { windMod: (headwind / 20) * 0.1, crosswind: crosswind };
  };

  const {
    w1Ldg,
    w1Abn,
    w1Tko,
    w2Ldg,
    w2Abn,
    w2Tko,
    w3Ldg,
    w3Abn,
    w3Tko,
    w4Ldg,
    w4Abn,
    w4Tko,
  } = dataSet;
  const landingWeights = [w1Ldg, w2Ldg, w3Ldg, w4Ldg];
  const abnormalWeights = [w1Abn, w2Abn, w3Abn, w4Abn];

  if (!pressureAltitude % 1 === 0) {
    ceilX = Math.ceil(pressureAltitude / 1000);
    floorX = Math.floor(pressureAltitude / 1000);
  }
  if (!oat % 1 === 0) {
    ceilY = Math.ceil(oat / 10);
    floorY = Math.floor(oat / 10);
  }

  const interpolate = (num, num2, num3, num4) => {
    const amountX = pressureAltitude / 1000 - floorX;
    const amountY = oat / 10 - floorY;
    const interpolatedX1 = lerp(num, num3, amountX);
    const interpolatedX2 = lerp(num2, num4, amountX);
    const interpolatedY = lerp(interpolatedX1, interpolatedX2, amountY);
    return interpolatedY;
  };

  let weightFloor;
  let floorForLERP;
  if (aircraftWeight === 2888) {
    weightFloor = flapSetting ? landingWeights[0] : abnormalWeights[0];
    floorForLERP = 2888;
  } else if (aircraftWeight < 2888 && aircraftWeight >= 2822) {
    weightFloor = flapSetting ? landingWeights[1] : abnormalWeights[1];
    floorForLERP = 2822;
  } else if (aircraftWeight < 2822 && aircraftWeight >= 2645) {
    weightFloor = flapSetting ? landingWeights[2] : abnormalWeights[2];
    floorForLERP = 2645;
  } else {
    weightFloor = flapSetting ? landingWeights[3] : abnormalWeights[3];
    floorForLERP = 2425;
  }

  const floorWeightDistances = [];
  floorWeightDistances.push(weightFloor[0][floorX][floorY]);
  floorWeightDistances.push(weightFloor[0][ceilX][floorY]);
  floorWeightDistances.push(weightFloor[0][floorX][ceilY]);
  floorWeightDistances.push(weightFloor[0][ceilX][ceilY]);
  floorWeightDistances.push(weightFloor[1][floorX][floorY]);
  floorWeightDistances.push(weightFloor[1][ceilX][floorY]);
  floorWeightDistances.push(weightFloor[1][floorX][ceilY]);
  floorWeightDistances.push(weightFloor[1][ceilX][ceilY]);

  let weightCeiling;
  let ceilingForLERP;
  if (aircraftWeight <= 2888 && aircraftWeight > 2822) {
    weightCeiling = flapSetting ? landingWeights[0] : abnormalWeights[0];
    ceilingForLERP = 2888;
  } else if (aircraftWeight <= 2822 && aircraftWeight > 2645) {
    weightCeiling = flapSetting ? landingWeights[1] : abnormalWeights[1];
    ceilingForLERP = 2822;
  } else if (aircraftWeight <= 2645 && aircraftWeight > 2425) {
    weightCeiling = flapSetting ? landingWeights[2] : abnormalWeights[2];
    ceilingForLERP = 2645;
  } else {
    weightCeiling = flapSetting ? landingWeights[3] : abnormalWeights[3];
    ceilingForLERP = 2425;
  }
  const ceilingWeightDistances = [];
  ceilingWeightDistances.push(weightCeiling[0][floorX][floorY]);
  ceilingWeightDistances.push(weightCeiling[0][ceilX][floorY]);
  ceilingWeightDistances.push(weightCeiling[0][floorX][ceilY]);
  ceilingWeightDistances.push(weightCeiling[0][ceilX][ceilY]);
  ceilingWeightDistances.push(weightCeiling[1][floorX][floorY]);
  ceilingWeightDistances.push(weightCeiling[1][ceilX][floorY]);
  ceilingWeightDistances.push(weightCeiling[1][floorX][ceilY]);
  ceilingWeightDistances.push(weightCeiling[1][ceilX][ceilY]);

  const w1t0 = interpolate(
    ceilingWeightDistances[0],
    ceilingWeightDistances[2],
    ceilingWeightDistances[1],
    ceilingWeightDistances[3]
  );
  const w1t1 = interpolate(
    ceilingWeightDistances[4],
    ceilingWeightDistances[6],
    ceilingWeightDistances[5],
    ceilingWeightDistances[7]
  );
  const w2t0 = interpolate(
    floorWeightDistances[0],
    floorWeightDistances[2],
    floorWeightDistances[1],
    floorWeightDistances[3]
  );
  const w2t1 = interpolate(
    floorWeightDistances[4],
    floorWeightDistances[6],
    floorWeightDistances[5],
    floorWeightDistances[7]
  );

  const percentForLERP = (
    (aircraftWeight - floorForLERP) /
    (ceilingForLERP - floorForLERP)
  ).toPrecision(4);

  const windModifier = windMod(runwayOfIntendedUse, windDirection, windSpeed);
  const w1t0w2t0 = precise(lerp(w2t0, w1t0, percentForLERP) / 0.3048);
  const w1t1w2t1 = precise(lerp(w2t1, w1t1, percentForLERP) / 0.3048);
  return {
    Ground_Roll: w1t0w2t0 - w1t0w2t0 * windModifier.windMod,
    Fifty_Foot_Obstacle: w1t1w2t1,
  };
};

export default performanceCalculation;
