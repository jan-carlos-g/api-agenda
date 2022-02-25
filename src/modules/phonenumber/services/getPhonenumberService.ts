import { PhoneNumber } from "../../../database/models"

export const getPhonenumberService = async (id: string) => {
	const phoneNumber = await PhoneNumber.findByPk(id)
	return phoneNumber
}