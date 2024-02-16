import bcrypt from "bcrypt"

export async function HashPassword(pass: string): Promise<string> {
    if (pass.length < 6) return ""
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(pass, saltRounds)
    return Promise.resolve(passwordHash)
}

export async function checkPassword(password: string, compareTo: string): Promise<boolean> {
    return await bcrypt.compare(compareTo, password)

}