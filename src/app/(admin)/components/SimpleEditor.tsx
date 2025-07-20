'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';

import { Toolbar, ToolbarGroup, ToolbarSeparator } from './toolbar';
import {
  UndoRedoButtons,
  HeadingSelect,
  ListButtons,
  BoldButton,
  ItalicButton,
  CodeButton,
  StrikeButton,
  UnderlineButton,
  HighlightButton,
  LinkButton,
  SubSuperscriptButtons,
  ImageButton,
} from './buttons';
import { TextAlignButtons } from './TextAlignButtons';

interface Props {
  onChange?: (html: string) => void;
}

export default function SimpleEditor({ onChange }: Props) {
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
    content: '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

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
