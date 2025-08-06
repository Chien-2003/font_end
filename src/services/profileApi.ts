const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export interface UpdateProfilePayload {
  full_name?: string;
  phone?: string;
  address?: string;
  order_address?: {
    province_code: string;
    district_code: string;
    ward_code: string;
    detail: string;
  };
  birth_date?: string | null;
  gender?: 0 | 1 | 2;
  avatar?: string | null;
}

export interface UpdateProfileResponse {
  message: string;
  data: any;
}

export interface UserResponse {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  order_address?: {
    province_code: string;
    district_code: string;
    ward_code: string;
    detail: string;
  };
  birth_date?: string;
  gender?: 0 | 1 | 2;
}

export const getProfile = async (): Promise<UserResponse> => {
  const res = await fetch(`${BASE_URL}/profile/get-user`, {
    credentials: 'include',
  });

  const result = await res.json();

  if (!res.ok || !result?.data) {
    throw new Error(result.message);
  }

  return result.data;
};

export const updateProfile = async (
  data: UpdateProfilePayload,
): Promise<UpdateProfileResponse> => {
  const res = await fetch(`${BASE_URL}/profile/update-user`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result: UpdateProfileResponse = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
};
