import Client from "../../api/index"

export const getBatchBycourseId = async (id: string) => {
    const response = await Client.batch.getbycourse(id)
    return response.data
}