type FunctionType2 = (...args: any[]) => any;

class Middleware {
  private middlewares: FunctionType2[] = [];

  use(middleware: FunctionType2) {
    this.middlewares.push(middleware);
    return this;
  }

  wrap(target: FunctionType2) {
    const wrapped = (...args: any[]) => {
    let idx = 0;
    const wrapNext = () => {
        const middleware = this.middlewares[idx++];
        if (!middleware) {
            return target(...args);
        }
        return middleware(...args, wrapNext);
    };
    return wrapNext();
    };
    return wrapped;
  }
}

// Example usage:
const logger = (...args: any[]) => {
  console.log(`Logging: ${args}`);
  return args;
};

const adder = (...args: any[]) => {
  const [a, b] = args;
  return a + b;
};

const exampleFunction2 = (a: number, b: number) => {
  return a * b;
};

const middleware = new Middleware();
const wrappedFunction = middleware.use(logger).use(adder).wrap(exampleFunction2);
console.log(wrappedFunction(2, 3));