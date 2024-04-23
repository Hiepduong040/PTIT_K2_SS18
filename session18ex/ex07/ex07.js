"use strict";
class Middleware {
    constructor() {
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    wrap(target) {
        const wrapped = (...args) => {
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
const logger = (...args) => {
    console.log(`Logging: ${args}`);
    return args;
};
const adder = (...args) => {
    const [a, b] = args;
    return a + b;
};
const exampleFunction2 = (a, b) => {
    return a * b;
};
const middleware = new Middleware();
const wrappedFunction = middleware.use(logger).use(adder).wrap(exampleFunction2);
console.log(wrappedFunction(2, 3));
