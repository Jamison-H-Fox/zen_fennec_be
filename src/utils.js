const matchPath = (pattern, path) => {
  const patternSegments = pattern.split('/')
  const pathSegments = path.split('/')

  if (patternSegments.length !== pathSegments.length) {
    return null
  }

  const params = {}
  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i]
    const pathSegment = pathSegments[i]

    if (patternSegment.startsWith(':')) {
      const paramName = patternSegment.slice(1)
      params[paramName] = pathSegment
    } else if (patternSegment !== pathSegment) {
      return null
    }
  }

  return params
}

const parseJsonBody = async (req) => {
  try {
    return await req.json()
  } catch (error) {
    return null
  }
}

const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const errorResponse = (message, status = 400) => {
  return jsonResponse({ error: message }, status)
}

module.exports = {
  matchPath,
  parseJsonBody,
  jsonResponse,
  errorResponse,
}
