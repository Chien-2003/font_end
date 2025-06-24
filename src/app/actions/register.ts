export async function register(user_name: string, email: string, password: string) {
  const res = await fetch("http://localhost:4000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_name, email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Lỗi đăng ký");
  }

  return res.json();
}
