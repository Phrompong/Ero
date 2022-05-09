//const BASE_URL = "https://ero-bke-test.domain.local/api/v1/";
//const BASE_URL = "https://ero-bke-test.domain.local/api/v1/";
const BASE_URL = "https://203.151.211.133/api/v1/";

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

  // if (!res.ok) {
  //   throw new Error("Could not fetch data", endpoint);
  // }

  const data = await res.json();
  return [data, res.status];
}

export async function httpGetRequest(endpoint) {
  const url = `${BASE_URL}${endpoint}`;

  console.log(url);
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

export async function httpFetch(method, body, endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return [data, res.status];
}

export async function httpPostRequestUploadFile(body, endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    method: "POST",
    body: body,
    redirect: "follow",
  });

  const data = await res.json();
  return [data, res.status];
}
