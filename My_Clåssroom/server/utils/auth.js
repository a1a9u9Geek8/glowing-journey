import bcrypt from 'bcrypt'

export const hashPassword = (password) => {
    //using callback funtion to recall hash
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => { //generating number of phases 
            if(err){   //checking error fuction
                reject(err);
            }
            //function that takes plain argument/input then it get
            bcrypt.hash(password, salt, (err, hash) => {
                if(err){  //checking error fuction
                    reject(err);
                }
                resolve(hash); // gives green light if no err detected
            });
        });

    });

};
//querying database to compare passwords
export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed); //boolean value

};