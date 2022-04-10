class JSONRPCError extends Error {
  constructor(errData) {
    super(errData);
    if (Error.captureStackTrace) Error.captureStackTrace(this, JSONRPCError);
    this.name = "JSONRPCError";
    this.message = "\n" + JSON.stringify(errData, null, 2);
  }
}

export async function httpFetch(method, body, url) {
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
    credentials: "include",
  });

  const data = await res.json();

  console.log(data);
}
