function add2(num) {
    return num + 2;
}

function once(callback) {
    let called = false;
    let firstCallResult;

    return function(arguments) {
        if (called) return firstCallResult;

        called = true;
        firstCallResult = callback(arguments);
        return firstCallResult;
    }
}