export const idCheck = (id) => {
    let regExp = /^(?=.*[a-z])(?=.*[0-9]).{4,10}$/;
    return regExp.test(id)
};

export const pwCheck = (pw)=> {
    let regExp =/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()+=-])(?=.*[0-9]).{8,15}$/;
    return regExp.test(pw)
};