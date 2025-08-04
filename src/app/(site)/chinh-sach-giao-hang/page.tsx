import Image from 'next/image';
import { Fragment } from 'react';

export default function Page() {
  return (
    <Fragment>
      <div className="mx-auto max-w-6xl flex flex-col gap-3 md:px-4 xl:px-12 2xl:px-16 px-2 sm:px-2 lg:px-8 w-full h-full py-8">
        <h1 className="text-2xl font-medium">Dịch vụ giao hàng</h1>
        <div className="w-full relative" style={{ height: 350 }}>
          <Image
            src="/policy.png"
            alt="product"
            className="object-fill object-center align-middle m-h-auto h-auto"
            fill
            priority
          />
        </div>
      </div>
    </Fragment>
  );
}
