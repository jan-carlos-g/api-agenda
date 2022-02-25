import { PhoneNumber } from "../../../database/models"
import { phonenumberAttributes } from "../model/phonenumber.model"

export const createPhonenumberService = async (data: phonenumberAttributes) => {
	const newPhoneNumber = await PhoneNumber.create(data)
	return newPhoneNumber
}