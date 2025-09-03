'use client';

import { Button } from '@/components/ui/button';
import { getModalContent } from '@/data/cskh';
import { X } from 'lucide-react';

interface CustomerPolicyModalProps {
  isOpen: boolean;
  selectedItem: {
    title: string;
    desc: string;
    imgSrc: string;
    href: string;
  } | null;
  onClose: () => void;
}

export default function PolicyModal({
  isOpen,
  selectedItem,
  onClose,
}: CustomerPolicyModalProps) {
  if (!isOpen || !selectedItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-xl shadow max-w-lg max-h-[90%] w-full mx-4 animate-in zoom-in-95 duration-300 overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-hide">
        <div className="bg-gradient-to-r from-blue to-blue/80 p-3 text-white relative">
          <Button
            size="sm"
            variant="default"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 bg-primary hover:bg-primary/90 text-white"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              {getModalContent(selectedItem.title).icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {selectedItem.title}
              </h2>
              <p className="text-white/80">{selectedItem.desc}</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-gray/70 leading-relaxed">
            {getModalContent(selectedItem.title).content}
          </p>
          {getModalContent(selectedItem.title).features.length >
            0 && (
            <div>
              <h3 className="font-semibold text-gray mb-3">
                Tính năng nổi bật:
              </h3>
              <div className="space-y-2">
                {getModalContent(selectedItem.title).features.map(
                  (feature: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-blue rounded-full"></div>
                      <span className="text-gray/80">{feature}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
            <p className="text-sm text-gray mb-2">
              <strong className="text-gray">Cần hỗ trợ thêm?</strong>
            </p>
            <p className="text-sm text-gray">
              Liên hệ hotline:{' '}
              <span className="font-semibold text-blue">
                0834 265 606
              </span>{' '}
              hoặc email:{' '}
              <span className="font-semibold text-blue">
                cskh@elysiawear.com
              </span>
            </p>
          </div>
        </div>
        <div className="p-6 pt-0">
          <Button
            size="xl"
            onClick={onClose}
            variant="default"
            className="w-full bg-gradient-to-r from-blue/90 to-blue/70 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-105"
          >
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}
