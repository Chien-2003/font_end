import Breadcrumbs from '@/components/views/Breadcrumbs';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Page() {
  return (
    <Fragment>
      <div className="mx-auto lg:max-w-[900px] max-w-full flex flex-col space-y-3 md:px-4 xl:px-12 2xl:px-16 px-2 sm:px-2 lg:px-8 w-full h-full py-4">
        <div className="mb-6">
          <Breadcrumbs />
        </div>
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
        <div className="w-full text-sm flex flex-col gap-4 leading-6">
          <div className="">
            <p>
              <strong>Giao hàng nhanh và đúng hẹn</strong> cho 95% đơn
              hàng là <strong> mục tiêu</strong> mà đội ngũ vận hành
              của{' '}
              <strong>
                <Link href="/">Elysia Wear</Link>
              </strong>{' '}
              hướng tới. Khách hàng hãy tin ở Elysia Wear, chúng tôi
              sẽ làm được!
            </p>
            <p>
              Hiện tại <strong>Elysia Wear</strong> đang là{' '}
              <strong>đối tác lớn</strong> với 2 đơn vị giao hàng nổi
              tiếng có uy tín như <strong>Ninjavan</strong> và{' '}
              <strong>Snappy</strong>
            </p>
            <p className="uppercase">
              <strong>Elysia Wear CÓ 2 TRUNG TÂM VẬN HÀNH</strong>
            </p>
          </div>
          <div className="">
            <p>
              Các đơn hàng phát sinh từ Đà Nẵng trở ra khu vực phía
              Bắc sẽ được gửi đi từ trung tâm vận hành phía Bắc của
              Elysia Wear, Các đơn còn lại sẽ được đóng gói và vận
              chuyển từ trung tâm phía Nam.
            </p>
            <p className="uppercase">
              <strong>THỜI GIAN VẬN CHUYỂN TRUNG BÌNH</strong>
            </p>
            <p>
              <strong>• Đơn nội thành Hà Nội và Hồ Chí Minh:</strong>{' '}
              Khách hàng sẽ nhận được trong vòng 1 -2 ngày kể từ khi
              đơn hàng <strong>được xác nhận</strong> (trừ trường hợp
              đơn hàng dạng đặt trước hoặc chưa đủ tồn kho, Elysia
              Wear sẽ gửi đi từ kho vận hành khác tỉnh và CSKH của
              Elysia Wear sẽ thông báo cho khách hàng về vấn đề này).
              Thông thường có thể sớm hơn tuỳ thuộc vào thời gian
              khách hàng đặt{' '}
              <strong>(Không tính chủ nhật và ngày lễ)</strong>
            </p>
          </div>
        </div>
        <div className="w-full relative" style={{ height: 450 }}>
          <Image
            src="/location.jpg"
            alt="product"
            className="object-cover object-center align-middle m-h-auto h-full w-full"
            fill
            priority
          />
        </div>
        <div className="w-full">
          <p>
            <strong>Các khu vực khác: 2-5 ngày</strong> (thường là 2-4
            ngày), nếu sau 3 ngày kể từ khi đặt hàng mà Anh/Chị chưa
            nhận được cuộc gọi giao hàng của bưu tá thì vui lòng xin
            liên hệ Elysia Wear để được hỗ trợ (không bao gồm chủ nhật
            và ngày lễ).
          </p>
          <p>
            <strong className="uppercase">lưu ý:</strong> Trong trường
            hợp khách hàng <strong>cần nhận hàng gấp</strong> thì có
            thể liên hệ{' '}
            <strong>Hotline Elysia Wear 1900272737</strong> để được hỗ
            trợ.
          </p>
          <p>
            <strong>
              <Link href="/">Elysia Wear</Link>
            </strong>{' '}
            không cam kết có thể hỗ trợ các trường hợp khẩn cấp 100%,
            tuy nhiên Elysia Wear chắc chắn sẽ làm mọi cách có thể để
            giúp khách hàng giải quyết công việc của mình.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
