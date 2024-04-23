type FunctionType3 = (...args: any[]) => any;

class CacheDecorator {
  private cache: { [key: string]: any } = {};
  private cachingMethod8: (...args: any[]) => boolean;

  constructor(cachingMethod8: (...args: any[]) => boolean) {
    this.cachingMethod8 = cachingMethod8;
  }

  wrap3(target: FunctionType3) {
    const cachedTarget8 = (...args: any[]) => {
      const key = JSON.stringify(args);
      if (this.cachingMethod8(...args)) {
        if (key in this.cache) {
          console.log("Returning cached result");
          return this.cache[key];
        } else {
          console.log("Calculating and caching result");
          const result = target(...args);
          this.cache[key] = result;
          return result;
        }
      } else {
        console.log("Calculating and not caching result");
        const result = target(...args);
        return result;
      }
    };
    return cachedTarget8;
  }
}

// Example usage:
const shouldCache = (...args: any[]) => args.length < 5;

const exampleFunction3 = (a: number, b: number) => a * b;

const cachedExampleFunction3 = new CacheDecorator(shouldCache).wrap3(exampleFunction3);

console.log(cachedExampleFunction3(2, 3));
console.log(cachedExampleFunction3(2, 3));