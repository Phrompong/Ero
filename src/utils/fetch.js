const BASE_URL = "http://134.209.108.248:3000/api/v1/";

class JSONRPCError extends Error {
  constructor(errData) {
    super(errData);
    if (Error.captureStackTrace) Error.captureStackTrace(this, JSONRPCError);
    this.name = "JSONRPCError";
    this.message = "\n" + JSON.stringify(errData, null, 2);
  }
}

export async function httpPostRequest(body, endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Could not fetch data", endpoint);
  }

  const data = await res.json();
  return [data, res.status];
}

export async function httpGetRequest(endpoint) {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Could not fetch data", endpoint);
  }

  const data = await res.json();
  return [data, res.status];
}

export async function httpPutRequest(body, endpoint) {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Could not fetch data", endpoint);
  }

  const data = await res.json();
  return [data, res.status];
}
