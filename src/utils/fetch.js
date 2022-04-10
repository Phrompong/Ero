const BASE_URL = "http://134.209.108.248:3000/api/v1/";

class JSONRPCError extends Error {
  constructor(errData) {
    super(errData);
    if (Error.captureStackTrace) Error.captureStackTrace(this, JSONRPCError);
    this.name = "JSONRPCError";
    this.message = "\n" + JSON.stringify(errData, null, 2);
  }
}

export async function httpFetch(method, body, endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    method: method,
    body: body,
  });

  const data = await res.json();
  return [data, res.status];
}
