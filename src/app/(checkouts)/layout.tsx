import { Fragment } from 'react';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <main className="w-full min-h-screen mx-auto">{children}</main>
    </Fragment>
  );
}
