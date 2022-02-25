import { City, State } from '../../database/models'
import cities from '../utils/cities.json'
import states from '../utils/states.json'
import { stateAttributes } from '../../modules/general/models/states.model';

const populateStates = async () => {
    for (let i = 0; i < states.length; i++) {
        const { id, initials, name } = states[i]
        await State.create({ id, initials, name } as stateAttributes)
    }
}

const populateCities = async () => {
    for (let j = 0; j < cities.length; j++) {
        const { id, state_id, name } = cities[j]
        await City.create({ id, state_id, name })
    }
}

const populate = async () => {
    await populateStates()
    await populateCities()
}

populate()