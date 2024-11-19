let add = (function() {
    let counter = 0;
    return function() {
        return counter++;
    }
})();

let Counter = function() {
    let counter = 0;

    const add = function() {
        return counter++;
    }

    const reset = function() {
        counter = 0;
    }

    return {
        add,
        reset
    }
}