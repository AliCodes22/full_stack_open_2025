export const getTokenAndUser = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = user?.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return { token, user, config };
};
