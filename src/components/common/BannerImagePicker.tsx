import MediaPicker, { MediaPickerProps } from "./MediaPicker";

const BannerImagePicker = (props: Omit<MediaPickerProps, "aspectRatio">) => (
  <MediaPicker aspectRatio="3 / 1" hint="Select banner image" {...props} />
);

export default BannerImagePicker;
