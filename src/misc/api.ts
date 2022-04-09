import axios from "axios";

export const base = "http://localhost:6111";

export const baseUrl = `${base}/api`;

export const loginApi = async (loginData: {
  username: string;
  password: string;
}) => {
  const url = `${baseUrl}/login`;
  try {
    const response = await axios.post(url, {
      ...loginData,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const registerApi = async (registerData: {
  username: string;
  password: string;
}) => {
  const url = `${baseUrl}/signup`;
  try {
    const response = await axios.post(url, {
      ...registerData,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchUserApi = async (text: string) => {
  const url = `${baseUrl}/users`;
  try {
    const response = await axios.get(url, {
      params: {
        username: text,
      },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const createRoomApi = async (data: {
  name: string;
  users: { userId: string }[];
}) => {
  const url = `${baseUrl}/rooms`;

  try {
    const response = await axios.post(url, {
      ...data,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getMyDataAPI = async (token: string) => {
  const url = `${baseUrl}/users/me`;
  try {
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
