
export default class SubStr extends String{
    constructor(str){
        super(str);
    }

    getSubstr(start, end){
        return super.substr(start, end);
    }
}