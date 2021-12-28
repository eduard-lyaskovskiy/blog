import axios from "axios";

const instance = axios.create({
  baseURL: "",
});

export const Posts = {
  savePost: async (id, token) => {
    try {
      const response = await instance.post(`/api/posts/${id}`, "", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  getPosts: async (token) => {
    try {
      const response = await instance.get("/api/posts/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  getPostById: async (id = "", token) => {
    try {
      const response = await instance.get(`/api/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  removePostById: async (id = "", token) => {
    try {
      const response = await instance.delete(`/api/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

export const User = {
  signup: async (data) => {
    try {
      const response = await instance.post(
        "/api/auth/register",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  login: async (data) => {
    try {
      const response = await instance.post(
        "/api/auth/login",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  getMe: async (token) => {
    try {
      const response = await instance.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  getUserById: async (id, token) => {
    try {
      const response = await axios.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
