import { hash, compare } from "bcrypt";

export const createPasswordHashed = async (password: string): Promise<string> => {
    const salt = 10;
    return hash(password, salt);
}

export const validatePassword = async (password: string, passwordHashed: string): Promise<boolean> => {
    return compare(password, passwordHashed);
}