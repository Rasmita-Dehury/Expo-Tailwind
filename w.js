var x = { a: 10, b: 12, c: { d: { e: 10 } } };

function createDuplicate(obj) {
    let y = {};
    for (let prop in obj) {
        //console.log(prop, obj[prop]);
        y[prop] = obj[prop];
    }

    return y;
}

var duplicateX = createDuplicate(x);



x.a = 15;
console.log(x);
console.log(duplicateX);

x.c.d.e = 20;
console.log(x);
console.log(duplicateX);

