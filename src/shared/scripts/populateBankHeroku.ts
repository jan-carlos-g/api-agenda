import Seq, { Sequelize } from 'sequelize';
import { cityInstance } from '../../modules/general/models/cities.model';
import { stateInstance } from '../../modules/general/models/states.model';
import cities from '../utils/cities.json'
import states from '../utils/states.json'
import 'dotenv/config'

interface rememberProps {
    old: string
    new: string
}

const remmemberIds: rememberProps[] = []

const database = new Sequelize({
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: process.env.PROD_DB_DIALECT
} as any)

const StateHeroku = database.define<stateInstance>('states', {
    id: {
        type: Seq.UUID,
        allowNull: false,
        defaultValue: Seq.UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Seq.STRING,
        allowNull: true
    },
    initials: {
        type: Seq.STRING,
        allowNull: true
    }
})

const CityHeroku = database.define<cityInstance>('cities', {
    id: {
        type: Seq.UUID,
        allowNull: false,
        defaultValue: Seq.UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Seq.STRING,
        allowNull: true
    },
    state_id: {
        type: Seq.STRING,
        allowNull: false
    }
})

const populateStates = async () => {
    for (let i = 0; i < states.length; i++) {
        const newState = await StateHeroku.create({ name: states[i].name, initials: states[i].initials })
        remmemberIds.push({ old: states[i].id, new: newState.id })
    }
}

const populateCities = async () => {
    for (let j = 0; j < cities.length; j++) {
        const state_id = howNewId(remmemberIds, cities[j].state_id)
        await CityHeroku.create({ name: cities[j].name, state_id })
    }
}

const howNewId = (oldIds: rememberProps[], newId: string) => {
    for (let i = 0; i < oldIds.length; i++) {
        if (oldIds[i].old === newId) return oldIds[i].new
    }
}

const populate = async () => {
    await populateStates()
    await populateCities()
}

populate()