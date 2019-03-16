export const RequestActionCreator = (type, { url, method, needAuth, data, headers, baseURL }, meta) => ({
  type,
  payload: {
    url,
    method,
    needAuth,
    data,
    headers,
    baseURL
  },
  meta: { ...meta, apiRequest: true }
});
