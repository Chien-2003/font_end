export async function uploadImage(
  file: File,
): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('http://localhost:4000/upload/image', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Upload ảnh thất bại');
    }

    const data = await res.json();
    return data.url as string;
  } catch (error) {
    console.error('Lỗi upload ảnh:', error);
    return null;
  }
}
