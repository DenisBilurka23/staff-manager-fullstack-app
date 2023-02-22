import { DELETE, GET, POST } from './index'

export const addDepartment = params => POST('/departments/add', params)
export const editDepartment = (id, params) => POST(`/departments/edit/${id}`, params)
export const deleteDepartment = id => DELETE(`/departments/delete/${id}`)
export const getDepartment = id => GET(`/departments/${id}`)
