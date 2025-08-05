'use client';

import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { useEffect } from 'react';
import {
  BoldButton,
  CodeButton,
  HeadingSelect,
  HighlightButton,
  ImageButton,
  ItalicButton,
  LinkButton,
  ListButtons,
  StrikeButton,
  SubSuperscriptButtons,
  UnderlineButton,
  UndoRedoButtons,
} from './buttons';
import { TextAlignButtons } from './TextAlignButtons';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from './toolbar';

interface Props {
  onChange?: (html: string) => void;
  initialContent?: string;
}

export default function SimpleEditor({
  onChange,
  initialContent = '',
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image,
      Subscript,
      Superscript,
      Placeholder.configure({
        placeholder: 'Viết nội dung bài viết...',
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });
  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent || '');
    }
  }, [initialContent, editor]);
  if (!editor) return null;

  return (
    <div className="border shadow-sm">
      <Toolbar>
        <ToolbarGroup>
          <UndoRedoButtons editor={editor} />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <HeadingSelect editor={editor} />
          <ListButtons editor={editor} />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <BoldButton editor={editor} />
          <ItalicButton editor={editor} />
          <CodeButton editor={editor} />
          <StrikeButton editor={editor} />
          <UnderlineButton editor={editor} />
          <HighlightButton editor={editor} />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <LinkButton editor={editor} />
          <SubSuperscriptButtons editor={editor} />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <TextAlignButtons editor={editor} />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <ImageButton editor={editor} />
        </ToolbarGroup>
      </Toolbar>

      <EditorContent
        editor={editor}
        className="prose p-4 min-h-[500px] focus:outline-none prose max-w-full [&_img]:border-0 [&_img]:outline-none [&_img]:shadow-none"
      />
    </div>
  );
}
