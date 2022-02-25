import * as readline from 'readline'
import { User } from '../../database/models';

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

prompt.question('Digite o email do root: ', (email: string) => {
    prompt.question('Digite a senha do root: ', async (password: string) => {
        await User.create({ email, password, status: "active" })
    })
})
