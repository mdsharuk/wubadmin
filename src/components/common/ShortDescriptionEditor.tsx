import RichTextEditor, { RichTextEditorProps } from "./RichTextEditor";

/** Reduced toolbar for short descriptions. */
const SHORT_TOOLBAR =
  "blocks | bold italic underline strikethrough | forecolor backcolor | numlist bullist | align";

const ShortDescriptionEditor = ({
  minHeight = 220,
  ...props
}: RichTextEditorProps) => (
  <RichTextEditor minHeight={minHeight} {...props} toolbar={SHORT_TOOLBAR} />
);

export default ShortDescriptionEditor;
