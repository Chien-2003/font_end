'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { AnimatePresence, motion } from 'framer-motion';

interface OtherReceiverProps {
  otherReceiver: boolean;
  setOtherReceiver: (val: boolean) => void;
}

export default function OtherReceiver({
  otherReceiver,
  setOtherReceiver,
}: OtherReceiverProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="other-receiver"
          checked={otherReceiver}
          onCheckedChange={(val) => setOtherReceiver(!!val)}
        />
        <Label
          htmlFor="other-receiver"
          className="text-primary font-semibold cursor-pointer"
        >
          Gọi người khác nhận hàng (nếu có)
        </Label>
      </div>
      <AnimatePresence initial={false}>
        {otherReceiver && (
          <motion.div
            key="other-receiver-info"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded p-4 space-y-4 bg-neutral-100 dark:bg-gray"
          >
            <RadioGroup
              defaultValue="nu"
              className="flex items-center gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nam" id="r-nam" />
                <label
                  htmlFor="r-nam"
                  className="text-sm font-medium leading-none"
                >
                  Nam
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nu" id="r-nu" />
                <label
                  htmlFor="r-nu"
                  className="text-sm font-medium leading-none"
                >
                  Nữ
                </label>
              </div>
            </RadioGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                type="text"
                className="rounded-full h-11 px-4 bg-white dark:bg-gray dark:border-white"
                placeholder="Họ và tên người nhận"
              />
              <Input
                type="number"
                className="rounded-full h-11 px-4 bg-white dark:bg-gray dark:border-white"
                placeholder="Số điện thoại người nhận"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
