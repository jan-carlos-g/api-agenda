import Sequelize from 'sequelize'
import { database } from '../../../database/db'

export interface phonenumberAttributes {
  id: string
  name: string
  phone: string
  image: string
  email: string
}

export interface phonenumberInstance extends Sequelize.Model<phonenumberAttributes, any>, phonenumberAttributes { }

export const PhonenumberModel = database.define<phonenumberInstance>('phonenumber', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
