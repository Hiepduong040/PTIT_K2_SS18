function decorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args:any[]){
        console.log(propertyKey);
        console.log(args);
        const result = originalMethod.apply(this, args);
        console.log(result);
        return result
    }
    return descriptor
    
}

class Test {
    @decorator
    demo(value: number): number {
        return value;
    }
}
let test = new Test();
console.log(test.demo(5));