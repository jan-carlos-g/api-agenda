import { PhoneNumber } from "../../../database/models"

export const deletePhonenumberService = async (id: string) => {
    const newPhoneNumber = await PhoneNumber.findByPk(id)
    await newPhoneNumber?.destroy()
    return newPhoneNumber
}