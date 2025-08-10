'use client';
import { Editor } from '@tiptap/react';
import { Fragment, useRef } from 'react';
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdHighlight,
  MdImage,
  MdLink,
  MdRedo,
  MdStrikethroughS,
  MdSubscript,
  MdSuperscript,
  MdUndo,
} from 'react-icons/md';

export function BoldButton({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return (
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={`p-1 rounded cursor-pointer ${
        editor.isActive('bold') ? 'bg-blue-100 text-blue-600' : ''
      }`}
    >
      <MdFormatBold />
    </button>
  );
}

export function ItalicButton({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return (
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`p-1 rounded cursor-pointer ${
        editor.isActive('italic') ? 'bg-blue-100 text-blue-600' : ''
      }`}
    >
      <MdFormatItalic />
    </button>
  );
}

export function CodeButton({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return (
    <button
      onClick={() => editor.chain().focus().toggleCode().run()}
      className={`p-1 rounded cursor-pointer ${
        editor.isActive('code') ? 'bg-blue-100 text-blue-600' : ''
      }`}
    >
      <MdCode />
    </button>
  );
}

export function StrikeButton({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return (
    <button
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={`p-1 rounded cursor-pointer ${
        editor.isActive('strike') ? 'bg-blue-100 text-blue-600' : ''
      }`}
    >
      <MdStrikethroughS />
    </button>
  );
}

export function UnderlineButton({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return (
    <button
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      className={`p-1 rounded cursor-pointer ${
        editor.isActive('underline')
          ? 'bg-blue-100 text-blue-600'
          : ''
      }`}
    >
      <MdFormatUnderlined />
    </button>
  );
}

export function HighlightButton({ editor }: { editor: Editor }) {
  if (!editor) return null;
  return (
    <button
      onClick={() => editor.chain().focus().toggleHighlight().run()}
      className={`p-1 rounded cursor-pointer ${
        editor.isActive('highlight')
          ? 'bg-yellow-100 text-yellow-800'
          : ''
      }`}
    >
      <MdHighlight />
    </button>
  );
}

export function LinkButton({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const handleLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <button
      onClick={handleLink}
      className={`p-1 rounded cursor-pointer ${
        editor.isActive('link') ? 'bg-blue-100 text-blue-600' : ''
      }`}
    >
      <MdLink />
    </button>
  );
}

export function SubSuperscriptButtons({
  editor,
}: {
  editor: Editor;
}) {
  if (!editor) return null;

  return (
    <div className="flex gap-1">
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={`p-1 rounded cursor-pointer ${
          editor.isActive('subscript')
            ? 'bg-blue-100 text-blue-600'
            : ''
        }`}
      >
        <MdSubscript />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleSuperscript().run()
        }
        className={`p-1 rounded cursor-pointer ${
          editor.isActive('superscript')
            ? 'bg-blue-100 text-blue-600'
            : ''
        }`}
      >
        <MdSuperscript />
      </button>
    </div>
  );
}

export function ImageButton({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'image',
            attrs: {
              src: result,
              style:
                'width: 400px; height: auto; display: block; margin: 0 auto;',
            },
          })
          .run();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Fragment>
      <button
        onClick={handleClick}
        className="p-1 rounded cursor-pointer"
        title="Chèn ảnh"
      >
        <MdImage />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Fragment>
  );
}

export function UndoRedoButtons({ editor }: { editor: Editor }) {
  if (!editor) return null;

  return (
    <div className="flex gap-1">
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-1 rounded cursor-pointer"
      >
        <MdUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-1 rounded cursor-pointer"
      >
        <MdRedo />
      </button>
    </div>
  );
}

export function HeadingSelect({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const levels = [1, 2, 3, 4, 5, 6] as const;
  const activeLevel =
    levels.find((lvl) =>
      editor.isActive('heading', { level: lvl }),
    ) ?? 0;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(e.target.value, 10);
    editor
      .chain()
      .focus()
      .toggleHeading({ level: level as any })
      .run();
  };

  return (
    <select
      onChange={handleChange}
      value={activeLevel}
      className="p-1 rounded border text-sm text-white bg-gray-800 cursor-pointer"
    >
      <option value={0}>Normal</option>
      {levels.map((lvl) => (
        <option key={lvl} value={lvl}>
          H{lvl}
        </option>
      ))}
    </select>
  );
}

export function ListButtons({ editor }: { editor: Editor }) {
  if (!editor) return null;

  return (
    <div className="flex gap-1">
      <button
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className={`p-1 rounded cursor-pointer ${
          editor.isActive('bulletList')
            ? 'bg-blue-100 text-blue-600'
            : ''
        }`}
      >
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
        className={`p-1 rounded cursor-pointer ${
          editor.isActive('orderedList')
            ? 'bg-blue-100 text-blue-600'
            : ''
        }`}
      >
        <MdFormatListNumbered />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
        className={`p-1 rounded cursor-pointer ${
          editor.isActive('blockquote')
            ? 'bg-blue-100 text-blue-600'
            : ''
        }`}
      >
        <MdFormatQuote />
      </button>
    </div>
  );
}
