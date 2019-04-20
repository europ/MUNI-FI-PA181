import { getByUrl, postByUrl, deleteByUrl } from "../utils";

const TEST_BASE = "/Tests";

export const getTests = async () => await getByUrl(TEST_BASE);

export const postTest = async test => await postByUrl(TEST_BASE, test);

export const deleteTest = async testId =>
  await deleteByUrl(`${TEST_BASE}/${testId}`);
