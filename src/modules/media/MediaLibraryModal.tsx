import { useEffect, useState } from "react";
import { Modal } from "antd";
import MediaLibrary from "./MediaLibrary";
import { MediaItem } from "./mediaSlice";

interface MediaLibraryModalProps {
  open: boolean;
  multiple?: boolean;
  onCancel: () => void;
  onSelect: (items: MediaItem[]) => void;
}

const MediaLibraryModal = ({
  open,
  multiple = false,
  onCancel,
  onSelect,
}: MediaLibraryModalProps) => {
  const [selected, setSelected] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (open) setSelected([]);
  }, [open]);

  return (
    <Modal
      className="media-modal"
      title="Media Library"
      open={open}
      width={1120}
      okText={multiple ? `Select (${selected.length})` : "Select"}
      okButtonProps={{ disabled: selected.length === 0 }}
      onCancel={onCancel}
      onOk={() => onSelect(selected)}
      destroyOnClose
    >
      <MediaLibrary
        selectable
        multiple={multiple}
        onSelectionChange={setSelected}
      />
    </Modal>
  );
};

export default MediaLibraryModal;
