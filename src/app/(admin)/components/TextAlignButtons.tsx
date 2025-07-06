// src/components/editor/buttons/TextAlignButtons.tsx
import { Editor } from "@tiptap/react";
import {
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
} from "react-icons/md";

export function TextAlignButtons({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const buttons = [
    { value: "left", icon: <MdFormatAlignLeft /> },
    { value: "center", icon: <MdFormatAlignCenter /> },
    { value: "right", icon: <MdFormatAlignRight /> },
    { value: "justify", icon: <MdFormatAlignJustify /> },
  ];

  return (
    <div className="flex gap-1">
      {buttons.map((btn) => (
        <button
          key={btn.value}
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign(btn.value as any)
              .run()
          }
          className={`p-1 rounded ${
            editor.isActive({ textAlign: btn.value })
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-200"
          }`}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
}
