import bcrypt from "bcryptjs";

export const hashPassword = async(password: string, salt: number) => {
  try{
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  catch(error) {
    console.error(`Error in hashing password: ${error}`);
    return null;
  }
}

export const comparePassword = async(password: string, hash: string) => {
  try{
    const compare = await bcrypt.compare(password, hash);
    return compare;
  }
  catch(error) {
    console.error(`Error in comparing password: ${error}`);
    return null;
  }
}