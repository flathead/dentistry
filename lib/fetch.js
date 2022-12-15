export const fetcher = async (...args) => {
  const res = await fetch(...args);
  let payload;
  try {
    if (res.status === 204) return null; // 204 если нет body
    payload = await res.json();
  } catch (e) {
    console.log(e.message);
  }
  if (res.ok) {
    return payload;
  } else {
    return Promise.reject(payload.error || new Error('Что-то пошло не так'));
  }
};
