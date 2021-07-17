// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client<T>(endpoint: string, options: object = {}): Promise<T>{
  const { body, ...customConfig } : Record<string, any> = options;
  const headers = { 'Content-Type': 'application/json' }

  const config : Record<string, any> = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json() as Promise<T>
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function<T> (endpoint: string, customConfig: object = {}) {
  return client<T>(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function<T> (endpoint: string, body: any, customConfig: object = {}) {
  return client<T>(endpoint, { ...customConfig, body })
}
