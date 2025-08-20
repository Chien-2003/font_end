import { X } from 'lucide-react';
import { toast } from 'sonner';

export const alertSuccess = (message: string) => {
  toast.custom((t) => (
    <div className="flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 p-3 shadow-md min-w-[280px] max-w-[400px]">
      <span className="text-green-700 font-medium break-words">
        {message}
      </span>
      <button
        onClick={() => toast.dismiss(t)}
        className="ml-auto text-green-700 hover:text-green-900 cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  ));
};

export const alertError = (message: string) => {
  toast.custom((t) => (
    <div className="flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 p-3 shadow-md min-w-[280px] max-w-[400px]">
      <span className="text-red-700 font-medium break-words">
        {message}
      </span>
      <button
        onClick={() => toast.dismiss(t)}
        className="ml-auto text-red-700 hover:text-red-900 cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  ));
};

export const alertWarning = (message: string) => {
  toast.custom((t) => (
    <div className="flex items-center gap-3 rounded-lg bg-yellow-50 border border-yellow-200 p-3 shadow-md min-w-[280px] max-w-[400px]">
      <span className="text-yellow-700 font-medium break-words">
        {message}
      </span>
      <button
        onClick={() => toast.dismiss(t)}
        className="ml-auto text-yellow-700 hover:text-yellow-900 cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  ));
};
