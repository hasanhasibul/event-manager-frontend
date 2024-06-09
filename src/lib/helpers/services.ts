/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getAllCookies } from "@/lib/helpers";
import { API_BASE_URL } from "@/lib/helpers";

export const getData = async (url: string, params?: any) => {
  try {
    const { authToken } = getAllCookies();
    const response = await axios.get(`${API_BASE_URL}/${url}`, {
      params,
      headers: {
        authorization: authToken,
      },
    });
    return response.data;
  } catch (err: any) {
    return {
      success: false,
      data: [],
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const getDetails = async (url: string, id?: string | number) => {
  try {
    const modifiedUrl = id
      ? `${API_BASE_URL}/${url}/${id}`
      : `${API_BASE_URL}/${url}`;
    const { authToken } = getAllCookies();
    const response = await axios.get(modifiedUrl, {
      headers: {
        authorization: authToken,
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response?.data;
    } else {
      return {
        success: false,
        data: response?.data,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const { authToken } = getAllCookies();
    const response = await axios.post(`${API_BASE_URL}/${url}`, data, {
      headers: {
        authorization: authToken,
      },
    });

    if (response?.status === 201 || response?.status === 200) {
      return response?.data;
    } else {
      return {
        success: false,
        data: response,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: err,
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const updateData = async (
  url: string,
  data?: any,
  id?: number | string
) => {
  try {
    const { authToken } = getAllCookies();
    const putUrl = id ? `${url}/${id}` : `${url}`;
    const response = await axios.put(`${API_BASE_URL}/${putUrl}`, data, {
      headers: {
        authorization: authToken,
      },
    });

    if (response?.status === 201 || response?.status === 200) {
      return response?.data;
    } else {
      return {
        success: false,
        data: response?.data,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const deleteData = async (url: string, id?: number) => {
  try {
    const modifiedUrl = id
      ? `${API_BASE_URL}/${url}/${id}`
      : `${API_BASE_URL}/${url}`;
    const { authToken } = getAllCookies();
    const response = await axios.delete(modifiedUrl, {
      headers: {
        authorization: authToken,
      },
    });

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        data: response?.data,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};
