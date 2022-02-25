import { PhoneNumber } from "../../../database/models"

export const getAllPhonenumberService = async () => {
	const phoneNumbers = await PhoneNumber.findAll()
	return phoneNumbers
}