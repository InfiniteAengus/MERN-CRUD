const APP_ID = 'TEST'

export const setItem = (key: string, data: any) => {
  localStorage.setItem(APP_ID + key, JSON.stringify(data))
}

export const getItem = (key: string, defaultVal: any) => {
  try {
    return JSON.parse(localStorage.getItem(APP_ID + key) || '') || defaultVal
  } catch (e) {
    return defaultVal || false
  }
}

export const deleteItem = (key: string) => {
  localStorage.removeItem(APP_ID + key)
}

export const getProfileId = () => getItem('USER_ID', false)
export const setUserId = (data: any) => setItem('USER_ID', data)
export const deleteUserId = () => deleteItem('USER_ID')

export const getToken = () => getItem('TOKEN', false)
export const setToken = (data: any) => setItem('TOKEN', data)
export const deleteToken = () => deleteItem('TOKEN')

export const clearInfo = () => {
  deleteUserId()
  deleteToken()
}
