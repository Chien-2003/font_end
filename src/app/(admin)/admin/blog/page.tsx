'use client';

import Editor from '@/components/editor/Editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCallback, useState } from 'react';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = useCallback(() => {
    console.log({ title, content });
    alert('Submit thành công! Kiểm tra console để xem nội dung.');
  }, [title, content]);

  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      <h1 className="text-3xl font-bold mb-6">Tạo bài viết</h1>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            placeholder="Nhập tiêu đề bài viết..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2 admin-blog">
          <Label>Nội dung</Label>
          <Editor content={content} setContent={setContent} />
        </div>

        <div className="pt-4">
          <Button onClick={handleSubmit} className="text-white">
            Đăng bài
          </Button>
        </div>
      </div>
    </div>
  );
}
