import Client from "../../api/index"
import type { StudentFormType } from "../../types/studentForm"

export const RegisterFormApi = async (data: StudentFormType) => {
    const response = await Client.loginEndpoint.profile(data)
    return response.data
}