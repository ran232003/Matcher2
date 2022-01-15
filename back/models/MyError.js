class MyError extends Error{

    constructor(message,errCode){
        let code;
        super(message);
        this.code = errCode;
    }

}
module.exports = MyError;