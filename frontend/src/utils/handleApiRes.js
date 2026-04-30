export const handleResponse = (res) => {
  if (!res.data?.success) {
    const error = new Error(res.data.message || "something goes wrong");
    error.code = res.data.code;
    error.data = res.data.data;
    throw error;
  }
  return res.data?.data;
};
