function validation(target: any, propertyKey: string, index: number){
    if(index === 0){
        return typeof target[propertyKey] === 'function';
    }
    else if(index === 1){
        return typeof target[propertyKey] === 'number';
    }
    return true;
}

function validateParameters(validationFunction: (target: any, propertyKey: string, index: number) => boolean) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;
      descriptor.value = function(...args: any[]) {
        for (let i = 0; i < args.length; i++) {
          if (!validationFunction(target, key, i)) {
            throw new Error(`Invalid parameter at index ${i}`);
          }
        }
        return originalMethod.apply(this, args);
      }
      return descriptor;
    }
}

class Example{
    @validateParameters(validation)
    example(a: any, b: any): void{
        console.log("Hello World");
    }
  }
const example1 = new Example();
example1.example(1, 0);