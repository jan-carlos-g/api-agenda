import { PhoneNumber } from "../../../database/models"
import { updateData } from "../../../shared/utils/general"
import { phonenumberAttributes, phonenumberInstance } from "../model/phonenumber.model"

export const updatePhonenumberService = async (id: string, data: phonenumberAttributes) => {
	let phoneNumber = await PhoneNumber.findByPk(id)
	phoneNumber = updateData(phoneNumber, data) as phonenumberInstance
	await phoneNumber.save()
	return phoneNumber
}