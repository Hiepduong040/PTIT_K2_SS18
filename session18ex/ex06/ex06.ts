type FunctionType = (...args: any[]) => any;

function typeCheck(func: FunctionType) {
    return (...args: any[]) => { // Sử dụng arrow function để giữ nguyên ngữ cảnh của `this`
        const matchResult = func.toString().match(/\((.*?)\)/);
        if (!matchResult || matchResult.length < 2) {
            throw new Error('Invalid function format');
        }
        const funcArgs = matchResult[1].split(',').map(arg => arg.trim().split(':')[1]);
        if (args.length !== funcArgs.length) {
            throw new Error('Invalid number of arguments');
        }
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] !== funcArgs[i].toLowerCase()) {
                throw new Error(`Argument ${i + 1} must be of type ${funcArgs[i]}`);
            }
        }
        return func.apply(this, args);
    };
}

function exampleFunction(a: number, b: string) {
    return a + b;
}

const checkedFunction = typeCheck(exampleFunction);
console.log(checkedFunction(1, '2')); // No error
console.log(checkedFunction(1, 2));   // Error: Argument 2 must be of type string