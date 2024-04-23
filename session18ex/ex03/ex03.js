"use strict";
const cache = {
    data: new Map(),
    calculate: function (func, args) {
        const key = JSON.stringify(args);
        if (this.data.has(key)) {
            console.log("Returning cached result...");
            return this.data.get(key);
        }
        console.log("Calculating...");
        const result = func(args);
        this.data.set(key, result);
        return result;
    }
};
function add(numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
}
const cachedAdd = (...args) => cache.calculate(add, args);
console.log(cachedAdd(2, 3));
console.log(cachedAdd(2, 3));
console.log(cachedAdd(2, 3));
