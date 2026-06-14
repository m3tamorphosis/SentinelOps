export function jsonResponse<T>(data: T, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...init?.headers
    }
  })
}

export function errorResponse(message: string, status = 500) {
  return jsonResponse(
    {
      error: message,
      status
    },
    { status }
  )
}
