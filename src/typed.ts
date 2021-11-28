
class Identifier {
    readonly [key: string]: string;
  
    a: string;
    b: string = '3';
}

interface ISingle{
    new (): Singleton;
    count: number; 
}
class Singleton{
    constructor(){++Singleton.count;}
    static count = 0;
}

window['instanseClass'] = new Identifier();
window['instanseClass'].a = '';
window['instanseClass'].b = 'a';

const class1: ISingle = Singleton;