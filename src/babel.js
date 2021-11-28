async function *generator(count){
    for (let index = 1; index <= count; index++) {
        yield new Promise(resolve =>
            setTimeout(() => resolve(index), 100));
    }

    return;
}

const gen = generator(13);

for await (const val of [Promise.resolve(1)]) {
    console.log(val)
}

class Exemple{
    static count = 4;
}