function timingDecorator(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    const startTime = performance.now();
    const result = originalMethod.apply(this, args);
    const endTime = performance.now();
    const timeRun = endTime - startTime;

    console.log(`Call to ${key} took ${timeRun} ms`);
    console.log(`Arguments: ${args}`);
    console.log(`Result: ${result}`);

    return result;
  }

  return descriptor;
}

class ExampleClass {
  @timingDecorator
  exampleMethod(a: number, b: number) {
    return a + b;
  }
}
const example = new ExampleClass();
example.exampleMethod(1, 2);