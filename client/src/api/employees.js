import { DELETE, GET, POST } from './index'

export const addEmployee = params => POST('/employees/add', params)
export const editEmployee = (id, params) => POST(`/employees/edit/${id}`, params)
export const deleteEmployee = id => DELETE(`/employees/delete/${id}`)
export const getEmployee = id => GET(`/employees/${id}`)
