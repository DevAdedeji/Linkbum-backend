const errorHandler = (err)=>{
    let errors = {};
   
   if(err.code === 11000){
        let field = Object.keys(err.keyValue);
        errors[field]=`User with ${field} already exists`;
        errors['status'] = 409;
        return errors;
   }

   if(err._message.includes('User validation failed')){
        Object.values(err.errors).forEach(properties=>{
            errors[properties.path] = properties.message;
            errors['status'] = 400;
        })
   }

   return errors;
    
}

module.exports = errorHandler;