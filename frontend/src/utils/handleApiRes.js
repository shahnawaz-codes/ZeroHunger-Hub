export const handleResponse = (res) => {
  if (!res.data?.success) {
    throw new Error(res.data.message || "something goes wrong");
  }
  return res.data?.data;
};
