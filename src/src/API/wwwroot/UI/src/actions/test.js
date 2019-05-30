import { getByUrl, postByUrl, deleteByUrl } from "../utils";

const TEST_BASE = "/api/Tests";

export const getTests = async () => await getByUrl(TEST_BASE);

export const getTest = async id => await getByUrl(`${TEST_BASE}/${id}`);

export const postTest = async test =>
  await postByUrl(`${TEST_BASE}/import`, test);

export const deleteTest = async testId =>
  await deleteByUrl(`${TEST_BASE}/${testId}`);
