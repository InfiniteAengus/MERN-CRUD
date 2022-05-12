import axios, { AxiosStatic } from 'axios'

import { getToken, clearInfo } from './storage'

const getInstance = (headers = {}) => {
  const token = getToken()

  return (axios as AxiosStatic).create({
    baseURL: '/api',
    headers: {
      ...headers,
      Authorization: token,
    },
  })
}

const withPromise = (axiosInstance: any) =>
  new Promise((resolve, reject) => {
    axiosInstance.then(
      (res: any) => {
        resolve(res.data)
      },
      (err: any) => {
        // service is unavailable
        if (!err.response) {
          reject(new Error('Service is unavailable'))
          return
        }

        if (err.response.status === 403) {
          // redirect to the homepage if permission is denied
          document.location = '/'
        } else if (
          // redirect to login page if user is not authenticated
          err.response.status === 401 &&
          window.location.pathname.indexOf('/login') === -1
        ) {
          // clear user from storage
          clearInfo()
          // redirect
          document.location = '/login'
        }

        // general error
        reject(
          Object.assign(err.response.data || {}, {
            status: err.response.status,
          })
        )
      }
    )
  })

function get(endpoint: string, params = {}) {
  return withPromise(
    getInstance().get(endpoint, {
      params,
    })
  )
}

function post(endpoint: string, body: any) {
  return withPromise(getInstance().post(endpoint, body))
}

function put(endpoint: string, body: any) {
  return withPromise(getInstance().put(endpoint, body))
}

function del(endpoint: string) {
  return withPromise(getInstance().delete(endpoint))
}

const api = {
  get,
  post,
  put,
  del,
}

export default api
