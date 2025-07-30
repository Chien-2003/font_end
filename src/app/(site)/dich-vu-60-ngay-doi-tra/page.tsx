import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

export const metadata = {
  title: 'Dịch vụ 60 ngày đổi trả',
  description:
    'Chính sách đổi trả miễn phí trong 60 ngày của Elysia Wear - đổi/trả đến khi bạn hài lòng, kể cả sản phẩm đã qua sử dụng.',
  keywords: [
    'đổi trả hàng',
    'chính sách đổi trả',
    'Elysia Wear',
    'đổi hàng 60 ngày',
    'dịch vụ khách hàng',
  ],
  openGraph: {
    title: 'Dịch vụ 60 ngày đổi trả',
    description:
      'Đổi trả miễn phí trong vòng 60 ngày, ngay cả khi bạn đã sử dụng sản phẩm - chỉ có tại Elysia Wear!',
    url: 'https://your-domain.com/dich-vu-60-ngay-doi-tra',
    type: 'website',
    images: [
      {
        url: 'https://mcdn.coolmate.me/image/August2023/mceclip0_61.jpg',
        width: 1200,
        height: 630,
        alt: 'Dịch vụ đổi trả 60 ngày Elysia Wear',
      },
    ],
  },
};

export default function page() {
  return (
    <Fragment>
      <div className="container lg:w-[1200px] py-4 lg:py-6 mx-auto">
        <div className="rich-html">
          <div className="page-header">
            <div className="container">
              <h1 className="pt-7 text-[2.625rem] leading-[41px] font-medium mb-3">
                Dịch vụ 60 ngày đổi trả
              </h1>
            </div>
          </div>
          <div className="w-full relative" style={{ height: 400 }}>
            <Image
              src="https://mcdn.coolmate.me/image/August2023/mceclip0_61.jpg"
              alt="product"
              className="rounded-2xl object-cover"
              fill
              priority
            />
          </div>
          <div className="section-main__content">
            <div className="rounded-2xl bg-blue-600 text-center py-8 mt-12">
              <h2 className="text-[5rem] text-[#f2fd5d] leading-[1em] font-medium">
                Đổi trả miễn phí
              </h2>
              <p className="text-white text-[2rem] m-0">
                Trong vòng 60 ngày
              </p>
            </div>
            <div className="grid grid-cols-2 mobile-grid--one-column justify-center py-12 h-full">
              <div className="box-border flex-1 m-0 min-h-[1px] p-3 relative align-top flex flex-col gap-4">
                <h3 className="font-medium text-[2rem]">
                  Đối với những sản phẩm bạn đã mua tại Elysia Wear
                </h3>
                <p>
                  Với những sản phẩm bạn đã mua tại Elysia Wear, 60
                  ngày kể từ khi bạn nhận sản phẩm, bạn sẽ được đổi
                  hàng và trả hàng với bất kỳ lý do gì, tối đa 3
                  lần/đơn đến khi ưng ý, bao gồm cả các sản phẩm đã
                  qua giặt và sử dụng.
                </p>
                <p>Một số lưu ý:</p>
                <ul className="flex flex-col gap-3">
                  <li className="pl-4">
                    Elysia Wear sẽ không áp dụng đổi trả với 1 số dòng
                    sản phẩm nhất định như: Outlet, Áo in theo yêu
                    cầu, Sản phẩm Săn Deal, Elysia Wear Basics và sản
                    phẩm được đóng gói theo Pack cố định.
                  </li>
                  <li className="pl-4">
                    Nếu các bạn mua sản phẩm ở các sàn TMĐT, thì
                    Elysia Wear sẽ áp dụng trước chính sách đổi/trả
                    của sàn TMĐT, nếu quá hạn của sàn TMĐT thì bạn có
                    thể yêu cầu hỗ trợ từ CSKH của Elysia Wear trực
                    tiếp!
                  </li>
                </ul>
                <p></p>
                <div>
                  <Link
                    href=""
                    className="inline-flex items-center justify-center px-[30px] h-[48px] dark:text-white border-2 hover:border-primary border-black dark:border-white dark:hover:border-primary rounded-lg text-sm font-medium uppercase no-underline cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white"
                  >
                    Đăng ký Đổi/Trả hàng
                  </Link>
                </div>
              </div>

              <div className="p-3 w-full box-border ml-0 mr-0 min-h-[1px] relative align-text-top h-[550px]">
                <Image
                  src="https://mcdn.coolmate.me/image/August2023/mceclip2_26.png"
                  alt="product"
                  className="w-full h-full align-middle"
                  fill
                />
              </div>
            </div>
            <div className="grid justify-center py-5 w-1/2 mx-auto">
              <div className="p-[10px] w-full box-border ml-0 mr-0 min-h-[1px] flex flex-col gap-4 relative align-top">
                <p>
                  <b>Elysia Wear Women:</b> Hy vọng bạn sẽ có trải
                  nghiệm mua sắm tuyệt vời với dòng sản phẩm mới này.
                  Để bạn luôn an tâm, chúng tôi vẫn áp dụng chính sách
                  đổi trả trong 60 ngày chung của Elysia Wear
                </p>
                <p>
                  <b>Lưu ý đổi hàng</b>
                </p>
                <ul className="flex flex-col gap-3">
                  <li className="pl-4">
                    <b className="mr-2">Điều kiện đổi hàng:</b>
                    Sản phẩm chưa sử dụng, chưa giặt là, còn nguyên
                    tem mác, bao bì. Không bị dơ bẩn, hư hại (rách,
                    sờn…), không dính mỹ phẩm hay ám mùi như nước hoa,
                    khói thuốc...
                  </li>
                  <li className="pl-4">
                    <b className="mr-2">Không áp dụng đổi trả:</b>
                    Đối với các sản phẩm Outlet, in theo yêu cầu,...
                    Mọi thắc mắc, vui lòng liên hệ chăm sóc khách hàng
                    để được tư vấn nhanh chóng!
                  </li>
                </ul>
                <p>
                  Quy trình đổi trả, xin vui lòng liên hệ CSKH hoặc
                  điền thông tin vào form bên dưới để được hỗ trợ.
                </p>
                <div>
                  <Link
                    href=""
                    className="inline-flex items-center justify-center px-[30px] h-[48px] dark:text-white border-2 hover:border-primary border-black dark:border-white dark:hover:border-primary rounded-lg text-sm font-medium uppercase no-underline cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white"
                  >
                    Đăng ký Đổi/Trả hàng
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-blue-600 text-center py-8 mt-12">
              <h4 className="text-[2rem] text-center text-white">
                3 Bước nhanh chóng để đổi trả
              </h4>
              <div className="px-4">
                <div className="box-border ml-0 mr-0 min-h-[1px] p-4 relative align-top grid grid-cols-3 gap-5">
                  <div className="rounded-2xl p-4 bg-white h-full text-gray-950 flex flex-col items-start">
                    <h5 className="text-[1.5rem] font-medium">
                      Bước 1
                    </h5>
                    <p className="text-start">
                      Điền thông tin Đổi/ Trả hàng, hoặc qua số
                      hotline
                      <span>
                        <Link
                          href="tel:0384265606"
                          className="ml-2 font-bold"
                        >
                          0384265606
                        </Link>
                      </span>
                    </p>
                    <Link
                      href="/"
                      target="_blank"
                      className="mt-[0.8rem] rounded-2xl bg-primary text-white border-0 px-[20px] py-[12px] inline-flex items-center justify-center cursor-pointer transition-all duration-200"
                    >
                      YÊU CẦU ĐỔI TRẢ
                    </Link>
                  </div>
                  <div className="rounded-2xl p-4 bg-white h-full text-gray-950 flex flex-col items-start">
                    <h5 className="text-[1.5rem] font-medium">
                      Bước 2
                    </h5>
                    <p className="text-start">
                      Nhận cuộc gọi xác nhận từ Elysia Wear về sản
                      phẩm và thời gian nhận hàng
                    </p>
                  </div>
                  <div className="rounded-2xl p-4 bg-white h-full text-gray-950 flex flex-col items-start">
                    <h5 className="text-[1.5rem] font-medium">
                      Bước 3
                    </h5>
                    <p className="text-start">
                      Ngay khi xác nhận chúng tôi sẽ gởi bạn đơn hàng
                      mới (hoặc lấy đơn hàng về), bạn chỉ cần gởi hàng
                      cần đổi/trả cho shipper là được.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
