import { EmptyPlaceholder } from '@/components/shared/EmptyPlaceholder';
import { getPrivacyPolicy } from '@/services/policyApi';

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPrivacyPolicy('information');

  return {
    title: data?.title || 'Chính sách bảo mật thông tin cá nhân',
    description:
      data?.content?.replace(/<[^>]*>/g, '').slice(0, 150) ||
      'Xem chi tiết chính sách bảo mật thông tin cá nhân.',
  };
}

export default async function Page() {
  const data = await getPrivacyPolicy('information');
  if (!data) {
    return (
      <div className="mx-auto md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-4">
        <EmptyPlaceholder description="Không có chính sách bảo mật." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] flex flex-col gap-3.5 md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-4">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}
