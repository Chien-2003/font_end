import Swal from 'sweetalert2';

const baseConfig = {
  buttonsStyling: false,
  customClass: {
    confirmButton: 'bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600',
    cancelButton: 'bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600',
  },
};

export const showSuccess = (message: string, title = 'Thành công') => {
  return Swal.fire({
    ...baseConfig,
    icon: 'success',
    title,
    text: message,
  });
};

export const showError = (message: string, title = 'Lỗi') => {
  return Swal.fire({
    ...baseConfig,
    icon: 'error',
    title,
    text: message,
  });
};

export const showConfirm = (
  message: string,
  title = 'Xác nhận',
  onConfirm?: () => void,
  onCancel?: () => void
) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'question',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Huỷ',
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm?.();
    } else if (result.isDismissed) {
      onCancel?.();
    }
  });
};
