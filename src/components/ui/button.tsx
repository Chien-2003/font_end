import React from "react";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-blue-600 text-white shadow hover:bg-blue-700",
  destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
  outline: "border border-gray-300 bg-white hover:bg-gray-100 text-black",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  ghost: "bg-transparent hover:bg-gray-100 text-black",
  link: "text-blue-600 underline hover:text-blue-800",
};

const sizeClasses: Record<Size, string> = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-8 text-base",
  icon: "h-9 w-9 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "default", ...props },
    ref
  ) => {
    const combined = `
      inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none
      ${variantClasses[variant]} ${sizeClasses[size]} ${className}
    `;

    return <button ref={ref} className={combined.trim()} {...props} />;
  }
);

Button.displayName = "Button";
