import { useMemo, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import MediaLibraryModal from "@/modules/media/MediaLibraryModal";
import tinymce from "tinymce";
import type { Editor as TinyMCEEditor } from "tinymce";
import "tinymce/models/dom";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/plugins/wordcount";

if (typeof window !== "undefined") {
  (window as unknown as { tinymce: typeof tinymce }).tinymce = tinymce;
}

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  error?: boolean;
  className?: string;
  minHeight?: number;
  /** Override the toolbar (TinyMCE toolbar string). */
  toolbar?: string;
}

const TOOLBAR =
  "blocks | bold italic underline strikethrough | forecolor backcolor | superscript subscript | numlist bullist | align | outdent indent |  blockquote code | link mediaimage table codesample";
const PLUGINS =
  "advlist autoresize lists code codesample image link table wordcount";

const CONTENT_STYLE = `
  body {
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #222f3e;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table, th, td {
    border: 1px solid #d9d9d9;
  }
  th, td {
    padding: 6px 10px;
  }
  th {
    background-color: #fafafa;
    font-weight: 600;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 12px 20px 12px 12px;
    border-radius: 8px;
  }
`;

const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Write something...",
  readOnly = false,
  error = false,
  className,
  minHeight = 220,
  toolbar = TOOLBAR,
}: RichTextEditorProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [mediaOpen, setMediaOpen] = useState(false);

  const init = useMemo(
    () => ({
      skin: false,
      content_css: false,
      menubar: false,
      statusbar: true,
      elementpath: false,
      branding: false,
      promotion: false,
      resize: false,
      min_height: minHeight,
      max_height: 0,
      highlight_on_focus: true,
      plugins: PLUGINS,
      toolbar,
      toolbar_mode: "wrap" as const,
      placeholder,
      content_style: CONTENT_STYLE,
      table_default_styles: {
        "border-collapse": "collapse",
        width: "100%",
      },
      table_default_attributes: {
        border: "1",
      },
      paste_data_images: true,
      setup: (editor: TinyMCEEditor) => {
        editorRef.current = editor;

        // Image button opens the project media library instead of the
        // default "Insert/Edit Image" dialog.
        editor.ui.registry.addButton("mediaimage", {
          icon: "image",
          tooltip: "Insert image from media library",
          onAction: () => setMediaOpen(true),
        });

        // Convert tab-separated clipboard data (Excel / Google Sheets)
        // into a real table instead of a single line of text.
        editor.on("paste", (event) => {
          const clipboard = (event as unknown as ClipboardEvent).clipboardData;
          if (!clipboard) return;

          const text = clipboard.getData("text/plain");
          const html = clipboard.getData("text/html");

          if (!text || !text.includes("\t")) return;
          // If the clipboard already carries a real table, let TinyMCE handle it.
          if (html && /<table[\s>]/i.test(html)) return;

          event.preventDefault();

          const escape = (value: string) =>
            value
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

          const rows = text
            .replace(/\r/g, "")
            .split("\n")
            .filter((row) => row.trim() !== "")
            .map((row) => row.split("\t"));

          const body = rows
            .map((cells, rowIndex) => {
              const tag = rowIndex === 0 ? "th" : "td";
              const cellHtml = cells
                .map((cell) => `<${tag}>${escape(cell.trim())}</${tag}>`)
                .join("");
              return `<tr>${cellHtml}</tr>`;
            })
            .join("");

          editor.insertContent(
            `<table><tbody>${body}</tbody></table><p>&nbsp;</p>`,
          );
        });
      },
    }),
    [placeholder, minHeight, toolbar],
  );

  return (
    <div
      className={[
        "rich-editor",
        error ? "rich-editor--error" : "",
        readOnly ? "rich-editor--readonly" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Editor
        value={value}
        onEditorChange={(content) => onChange?.(content)}
        init={init}
        disabled={readOnly}
      />

      <MediaLibraryModal
        open={mediaOpen}
        multiple={false}
        onCancel={() => setMediaOpen(false)}
        onSelect={(items) => {
          const url = items[0]?.url;
          if (url && editorRef.current) {
            editorRef.current.insertContent(
              `<img src="${url}" alt="" style="max-width: 100%;" />`,
            );
          }
          setMediaOpen(false);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
