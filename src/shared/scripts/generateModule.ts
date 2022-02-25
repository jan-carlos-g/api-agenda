import * as readline from 'readline'
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process'

const modules_folders = path.resolve(__dirname, '..', '..', 'modules')
const modules_sub_folders = ['controllers', 'middlewares', 'model', 'routes', 'services']

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

prompt.question('Digite o nome do novo modulo: ', (newModule: string) => {
    const new_path = `${modules_folders}\\${newModule}`
    const old_model_path = path.resolve(__dirname, '..', '..', 'database', 'models', `${newModule}.js`)

    execSync(`npx sequelize-cli model:generate --name=${newModule} --attributes=name:string`);
    fs.rmSync(old_model_path)

    if (fs.existsSync(new_path)) console.log("Este módulo já existe!")
    else {
        generateFolder(new_path)
        modules_sub_folders.forEach((sub_folder) => {
            generateFolder(`${new_path}\\${sub_folder}`)
        })

        generateServices(newModule)
        generateControllers(newModule)
        generateRoutes(newModule)
        generateModel(newModule)
    }

})

const generateModel = (module: string) => {
    const new_path = `${modules_folders}\\${module}\\model`
    const capitalized_module = capitalize(module)

    const content = `import Sequelize from 'sequelize'
import { database } from '../../../database/db'

export interface ${module}Attributes {
    id: string
    name: string
}

export interface ${module}Instance extends Sequelize.Model<${module}Attributes, any>, ${module}Attributes { }

export const ${capitalized_module}Model = database.define<${module}Instance>('${module}', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
})
`

    generateFiles(`${new_path}\\${module}.model.ts`, content)
}

const generateServices = (module: string) => {
    const new_path = `${modules_folders}\\${module}\\services`

    const capitalized_module = capitalize(module)

    generateFiles(`${new_path}\\create${capitalized_module}Service.ts`, `export const create${capitalized_module}Service = async () => { \n\treturn 'Criou ${capitalized_module}'\n}`)
    generateFiles(`${new_path}\\update${capitalized_module}Service.ts`, `export const update${capitalized_module}Service = async (id: string) => { \n\treturn \`Atualizou o ${capitalized_module} de id '\${id}'\`\n}`)
    generateFiles(`${new_path}\\getAll${capitalized_module}Service.ts`, `export const getAll${capitalized_module}Service = async () => { \n\treturn 'Buscou Todos ${capitalized_module}'\n}`)
    generateFiles(`${new_path}\\get${capitalized_module}Service.ts`, `export const get${capitalized_module}Service = async (id: string) => { \n\treturn \`Buscou o ${capitalized_module} de id '\${id}'\`\n}`)
}

const generateRoutes = (module: string) => {
    const new_path = `${modules_folders}\\${module}\\routes`
    const capitalized_module = capitalize(module)

    const content = `import { Router } from 'express'
import { create${capitalized_module}Controller } from '../controllers/create${capitalized_module}Controller';
import { get${capitalized_module}Controller } from '../controllers/get${capitalized_module}Controller';
import { getAll${capitalized_module}Controller } from '../controllers/getAll${capitalized_module}Controller';
import { update${capitalized_module}Controller } from '../controllers/update${capitalized_module}Controller';

const ${module}_router = Router()

${module.toLocaleLowerCase()}_router.post('/', create${capitalized_module}Controller)
${module.toLocaleLowerCase()}_router.get('/', getAll${capitalized_module}Controller)
${module.toLocaleLowerCase()}_router.get('/:id', get${capitalized_module}Controller)
${module.toLocaleLowerCase()}_router.put('/:id', update${capitalized_module}Controller)

export { ${module.toLocaleLowerCase()}_router }
`

    generateFiles(`${new_path}\\${module}.routes.ts`, content)
}

const generateControllers = (module: string) => {
    const new_path = `${modules_folders}\\${module}\\controllers`

    const capitalized_module = capitalize(module)

    generateFiles(`${new_path}\\create${capitalized_module}Controller.ts`, generateContentController(capitalized_module, 'create'))
    generateFiles(`${new_path}\\update${capitalized_module}Controller.ts`, generateContentController(capitalized_module, 'update'))
    generateFiles(`${new_path}\\getAll${capitalized_module}Controller.ts`, generateContentController(capitalized_module, 'getAll'))
    generateFiles(`${new_path}\\get${capitalized_module}Controller.ts`, generateContentController(capitalized_module, 'get'))
}

const generateContentController = (module: string, action: 'create' | 'update' | 'getAll' | 'get' | 'delete') => {
    const content = `import { Request, Response } from 'express'
import { ${action}${module}Service } from './../services/${action}${module}Service'\n
export const ${action}${module}Controller = async (req:Request,res:Response) => {
${(action === 'update' || action === 'get' || action === 'delete') ? '\tconst { id } = req.params\n' : ''}\tconst result = await ${action}${module}Service(${(action === 'update' || action === 'get' || action === 'delete') ? 'id' : ''})
\treturn res.json(result)
}
    `
    return content
}

const generateFiles = (path: string, content: string) => {
    fs.writeFileSync(path, content)
}

const generateFolder = (path: string) => {
    if (fs.existsSync(path)) console.log(`O módulo ${path} já existe!`)
    else fs.mkdirSync(path)
}

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.substring(1);
}
