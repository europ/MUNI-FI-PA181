import { fetch } from ".";

export const fetchByUrl = async (url, options) => {
  try {
    const response = await fetch(url, options);

    return response;
  } catch {
    return {};
  }
};

export const getByUrl = async (url, params) => {
  const response = await fetchByUrl(url, { method: "GET", params });

  return response.ok ? await response.json() : {};
};

export const postByUrl = async (url, body, params) => {
  const response = await fetchByUrl(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    params,
    body: JSON.stringify(body)
  });

  return response.ok;
};

export const postByUrlWithResponse = async (url, body, params) => {
  const response = await fetchByUrl(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    params,
    body: JSON.stringify(body)
  });

  return response.ok ? await response.json() : {};
};

export const putByUrl = async (url, body, params) => {
  const response = await fetchByUrl(url, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    params,
    body: JSON.stringify(body)
  });

  return response.ok;
};

export const deleteByUrl = async (url, params) => {
  const response = await fetchByUrl(url, { method: "DELETE", params });

  return response.ok;
};
