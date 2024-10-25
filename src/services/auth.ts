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


export const forgotPassword = async (values: { email: string }) => {
  const { email } = values;

  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/forgot-password`, { email }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred.');
  }
};


export const resetPassword = async (token, data) => {
  return await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/reset-password/${token}`, data);
};

