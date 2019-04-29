import { get } from "lodash";
import { getByUrl, postByUrlWithResponse, storage } from "../utils";

const USER_BASE = "/Users";

export const getUser = async id => await getByUrl(`${USER_BASE}/${id}`);

export const login = async formData => {
  const response = await postByUrlWithResponse(
    `${USER_BASE}/authenticate`,
    formData
  );

  if (get(response, "token")) {
    storage.put("token", get(response, "token"));
    return response;
  }

  return null;
};

export const logout = () => storage.remove("token");
