import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  schemaUserTokens,
  UpdateCurrentUserPasswordForm,
  User,
  UserLoginForm,
  UserRegisterForm,
  userSchemaget,
  userSchemas,
} from "../types";

export const login = async (formData: UserLoginForm) => {
  try {
    const { data } = await api.post("/auth/login", formData);
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const createAccount = async (formData: UserRegisterForm) => {
  try {
    const { data } = await api.post<string>("/auth/create-account", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const url = "/auth/confirm-account";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function forgotPassword(formData: ForgotPasswordForm) {
  const url = "/auth/forgot-password";
  try {
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function requestConfirmationCode(
  formData: RequestConfirmationCodeForm
) {
  try {
    const url = "/auth/request-code";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function validateToken(formData: ConfirmToken) {
  try {
    const url = "/auth/validate-token";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) {
  try {
    const url = `/auth/update-password/${token}`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUser() {
  try {
    const { data } = await api("/auth/user");
    const response = userSchemas.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUsers() {
  try {
    const { data } = await api("/auth/users");
    const response = userSchemaget.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUsersAll() {
  try {
    const { data } = await api("/auth/usersall");
    const response = userSchemaget.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateUserStatus(userId: number, status: boolean) {
  try {
    const { data } = await api.patch<string>("/auth/userstatus", {
      userId,
      status,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}

export async function updateProfile(formData: User) {
  try {
    const { data } = await api.patch<string>("/auth/update-profile", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const {
      data: { image },
    }: { data: { image: string } } = await api.post(
      "/auth/upload-image",
      formData
    );
    return image;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
  try {
    const { data } = await api.post<string>("/auth/update-password", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTokensConfirmUsers() {
  try {
    const { data } = await api.get("/auth/tokens");

    const response = schemaUserTokens.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
