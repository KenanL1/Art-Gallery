import axios from "axios";

// Create a new account
export const createUser = async ({
  name,
  username,
  password,
}: {
  name: string;
  username: string;
  password: string;
}) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: name,
        username: username,
        password: password,
      },
    }
  );

  return response.data;
};

// login user
export const authUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await axios(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ username: username, password: password }),
    }
  );

  return response.data;
};
