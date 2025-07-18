'use client';

import { useCallback, useState } from 'react';

type FileWithPreview = {
  id: string;
  file: File;
  preview: string;
};

export function useFileUpload({ accept = '*' }: { accept?: string }) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const openFileDialog = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = () => {
      const selectedFile = input.files?.[0];
      if (selectedFile) {
        const filePreview: FileWithPreview = {
          id: crypto.randomUUID(),
          file: selectedFile,
          preview: URL.createObjectURL(selectedFile),
        };
        setFiles([filePreview]);
      }
    };
    input.click();
  }, [accept]);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const getInputProps = () => ({
    type: 'file',
    accept,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        const filePreview: FileWithPreview = {
          id: crypto.randomUUID(),
          file: selectedFile,
          preview: URL.createObjectURL(selectedFile),
        };
        setFiles([filePreview]);
      }
    },
  });

  return [
    { files },
    { openFileDialog, removeFile, getInputProps },
  ] as const;
}
