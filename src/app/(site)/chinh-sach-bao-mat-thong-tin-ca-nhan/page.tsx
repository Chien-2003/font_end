export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="mx-auto max-w-full md:px-4 lg:py-16 md:py-8 py-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"></div>
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4 text-white">
            Elysia Wear
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Phong cách tối giản cho cuộc sống hiện đại. Mang đến những
            thiết kế tinh tế và chất lượng vượt trội.
          </p>
        </div>
      </div>
    </footer>
  );
}
