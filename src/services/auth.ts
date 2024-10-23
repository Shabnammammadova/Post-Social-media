import axios from "axios"

export const login = async (data: { email: string, password: string }) => {
  return await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
    data,
    { withCredentials: true }
  );
};


export const register = async (data: { email: string, password: string, name: string, surname: string }) => {
  return await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/register`,
    data,
    { withCredentials: true }
  );
};

export const getCurrentUserAsync = async () => {
  return await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/auth/current-user`, {
    withCredentials: true
  })
}


export const logout = async () => {
  return await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/logout`, {},
    { withCredentials: true }
  )
}