import { getToken } from "../utils/auth"

const BASE_URL = 'http://localhost:3333/api/v1'

const request = async (endpoint, option = {}) => {
    const url = `${BASE_URL}${endpoint}`

    //header

    const headers = {
        'Content-Type': 'application/json',
        ...option.headers


    }
    // adicionar token o disponivel
    const token = getToken()
    if (token) {
        headers.Authorization = `Baerer ${token}`
    }
    const config = {
        method: option.method || 'GET',
        headers,
        ...option
    }

    //Se tiver corpo, converta para JSON
    if (config.body && typeof config.body !== 'string') {
        config.body = JSON.stringify(config.body)
    }

    try {
        const response = await fetch(endpoint, config)

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData || `Error ${response.status}: ${response.statusText}`)
        }
    } catch (error) {

    }
}

export const api = {
    get: () => request(endpoint),
    post: () => request(endpoint, { method: 'POST', body })
}