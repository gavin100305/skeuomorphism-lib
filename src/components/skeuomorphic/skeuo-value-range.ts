export function valueRange(min: number, max: number, step: number) {
  const lower = Number.isFinite(min) ? min : 0;
  const upper = Number.isFinite(max) && max >= lower ? max : lower;
  const increment = Number.isFinite(step) && step > 0 ? step : 1;

  function clamp(value: number) {
    return Number.isFinite(value) ? Math.min(upper, Math.max(lower, value)) : lower;
  }

  function atStep(index: number) {
    return clamp(Number((lower + index * increment).toPrecision(15)));
  }

  function nearest(value: number) {
    const bounded = clamp(value);
    return bounded === upper ? upper : atStep(Math.round((bounded - lower) / increment));
  }

  function move(value: number, steps: number) {
    const offset = (clamp(value) - lower) / increment;
    const index = Number(offset.toPrecision(15));
    return atStep(steps > 0 ? Math.floor(index) + steps : Math.ceil(index) + steps);
  }

  return { min: lower, max: upper, clamp, nearest, move };
}
