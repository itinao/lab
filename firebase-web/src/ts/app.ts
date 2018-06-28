function echo<T>(param: T): T{
    return param
}

console.log(echo('test'));
console.log(echo(123));
