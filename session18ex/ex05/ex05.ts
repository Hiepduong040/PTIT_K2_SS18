function uppercase(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        return originalMethod.apply(this, args).toUpperCase();
    };
    return descriptor;
}
  
function reverse(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return originalMethod.apply(this, args).split('').reverse().join('');
    };
    return descriptor;
  }

function composeDecorators(...decorators: Function[]) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        decorators.reverse().forEach(decorator => decorator(target, propertyKey, descriptor));
    };
}

const combinedDecorator = composeDecorators(uppercase, reverse);
class ExampleClasss {
    @combinedDecorator
    public exampleMethod(input: string) {
    return input;
    }
}
const example5 = new ExampleClasss();
console.log(example5.exampleMethod('hello'));