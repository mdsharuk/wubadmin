import MediaPicker, { MediaPickerProps } from "./MediaPicker";

const FeatureImagePicker = (props: Omit<MediaPickerProps, "aspectRatio">) => (
  <MediaPicker aspectRatio="16 / 10" hint="Select featured image" {...props} />
);

export default FeatureImagePicker;
