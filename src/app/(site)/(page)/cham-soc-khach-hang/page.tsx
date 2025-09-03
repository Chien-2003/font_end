'use client';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import { items } from '@/data/cskh';
import PolicyModal from '@/model/modalPolicy';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';

export default function CustomerServicePage() {
  const [selectedItem, setSelectedItem] = useState<
    (typeof items)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleItemClick = (item: (typeof items)[0]) => {
    if (item.href === '##') {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <Fragment>
      <div className="bg-gradient-to-br from-blue/40 via-blue/70 to-blue/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-[#f2fd5d] rounded-full blur-sm animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full blur-sm animate-pulse delay-700"></div>
        </div>
        <div className="my-6 px-3 z-50">
          <Breadcrumbs />
        </div>
        <div className="mx-auto max-w-[1280px] px-4 w-full h-full py-8 md:py-10 lg:py-16 relative">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-[#f2fd5d] uppercase text-lg md:text-xl font-medium px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                Elysia Wear - Chào mừng bạn đến với
              </span>
            </div>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl uppercase font-bold mb-4 leading-tight">
              Trung tâm dịch vụ khách hàng
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Chúng tôi luôn sẵn sàng hỗ trợ và mang đến trải nghiệm
              tuyệt vời nhất cho bạn
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                {item.href === '##' ? (
                  <button
                    onClick={() => handleItemClick(item)}
                    className="w-full h-full min-h-full flex items-center bg-white p-6 rounded-2xl transition-all duration-300 hover:bg-gray hover:scale-105 hover:shadow-2xl hover:shadow-black/20 border border-white/10 cursor-pointer"
                  >
                    <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-2 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                      <Image
                        src={item.imgSrc}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain filter group-hover:invert transition-all duration-300"
                      />
                    </div>
                    <div className="pl-4 flex-1 text-left">
                      <h3 className="text-xl text-gray font-semibold mb-1 group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </div>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="group flex items-center bg-white p-6 rounded-2xl transition-all duration-300 hover:bg-gray hover:scale-105 hover:shadow-2xl hover:shadow-black/20 border border-white/10"
                  >
                    <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-2 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                      <Image
                        src={item.imgSrc}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain filter group-hover:invert transition-all duration-300"
                      />
                    </div>
                    <div className="pl-4 flex-1">
                      <h3 className="text-xl text-gray font-semibold mb-1 group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && selectedItem && (
        <PolicyModal
          isOpen={isModalOpen}
          selectedItem={selectedItem}
          onClose={closeModal}
        />
      )}
    </Fragment>
  );
}
