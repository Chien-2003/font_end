"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" py-8 flex flex-col items-center justify-center text-center px-4 bg-white">
      <div className="lg:my-8 my-0 ">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Trang bạn tìm kiếm không tồn tại.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
