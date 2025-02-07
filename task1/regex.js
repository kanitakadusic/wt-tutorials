function isNumberFollowedByDashAndTwoOrMoreCharacters(string) {
    const regex = /^\d+_[A-Za-z0-9_]{2,}$/;
    return regex.test(string);
}

// dd-mm-yyyy
function isDate(string) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
    return regex.test(string);
}