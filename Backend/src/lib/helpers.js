import bcrypt from "bcryptjs";

const helpers={};

helpers.encryptPassword=async (password)=>{
    const salt=await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt);
    return hashPassword;
}

helpers.matchPassword=async (password,savedPassword)=>{
    try {
       return await bcrypt.compare(password,savedPassword);
    } catch (error) {
        console.log(e);
    }
}

export default helpers;
