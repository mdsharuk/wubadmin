import { CSSProperties, useState } from "react";
import { Button } from "antd";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import MediaLibraryModal from "@/modules/media/MediaLibraryModal";

export interface MediaPickerProps {
  value?: string;
  onChange?: (url: string) => void;
  hint?: string;
  /** CSS aspect-ratio, e.g. "16 / 10" or "3 / 1". */
  aspectRatio?: string;
  className?: string;
}

const MediaPicker = ({
  value,
  onChange,
  hint = "Select image",
  aspectRatio,
  className,
}: MediaPickerProps) => {
  const [open, setOpen] = useState(false);

  const style = aspectRatio
    ? ({ "--media-picker-ratio": aspectRatio } as CSSProperties)
    : undefined;

  return (
    <div
      className={["media-picker", className ?? ""].filter(Boolean).join(" ")}
      style={style}
    >
      {value ? (
        <div className="media-picker__preview">
          <img src={value} alt="" />
          <div className="media-picker__overlay">
            <Button size="small" onClick={() => setOpen(true)}>
              Change
            </Button>
            <Button
              size="small"
              danger
              icon={<FiTrash2 />}
              onClick={() => onChange?.("")}
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="media-picker__empty"
          onClick={() => setOpen(true)}
        >
          <span className="media-picker__icon">
            <FiPlus />
          </span>
          <span className="media-picker__hint">{hint}</span>
        </button>
      )}

      <MediaLibraryModal
        open={open}
        multiple={false}
        onCancel={() => setOpen(false)}
        onSelect={(items) => {
          if (items[0]) onChange?.(items[0].url);
          setOpen(false);
        }}
      />
    </div>
  );
};

export default MediaPicker;
