import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Giỏ hàng | Elysia Wear',
  description:
    'Xem và quản lý các sản phẩm trong giỏ hàng của bạn tại Elysia Wear.',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <div>{children}</div>
    </Fragment>
  );
}
