import { items } from '@/data/cskh';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

export default function page() {
  return (
    <Fragment>
      <div className="bg-[#2f5acf]">
        <div className="mx-auto max-w-[1224px] px-3 w-full h-full py-4 md:py-6 lg:py-9">
          <h4 className="text-[#f2fd5d] uppercase text-[18px] leading-[26.46px] m-0">
            Elysia Wear - Chào mừng bạn đến với
          </h4>
          <h1 className="text-white text-[36px] leading-[52.92px] uppercase font-semibold mb-4">
            Trung tâm dịch vụ khách hàng
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="p-2 align-top min-h-[1px] relative mx-0"
              >
                <Link
                  href={item.href}
                  className="group flex items-center bg-white p-4 rounded-[1rem] transition-all duration-200 hover:bg-[#000]"
                >
                  <div className="w-full max-w-[4.25rem] h-[4.25rem]">
                    <Image
                      src={item.imgSrc}
                      alt={item.title}
                      width={68}
                      height={68}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="pl-2">
                    <h3 className="text-[20px] text-[#231f20] leading-[29.4px] m-0 font-medium group-hover:text-[#fff]">
                      {item.title}
                    </h3>
                    <span className="text-[16px] leading-[20.29px] text-black/80 group-hover:text-[#cfcfcf]">
                      {item.desc}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
