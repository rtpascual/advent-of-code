export async function profile(label: string, func: () => any) {
  performance.mark("start");

  const result = await func();

  performance.mark("end");

  const measure = performance.measure("start to end", "start", "end");

  console.log(`${label} Time: ${measure.duration}ms`);

  return result;
}
