import { useEffect, useState } from "react";
import { App, Button } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollapsibleField from "@/components/common/CollapsibleField";
import FeatureImagePicker from "@/components/common/FeatureImagePicker";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import ShortDescriptionEditor from "@/components/common/ShortDescriptionEditor";
import TextAreaField from "@/components/common/TextAreaField";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Region, addRegion, updateRegion } from "./regionsSlice";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const NewRegionPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const region = useAppSelector((state) =>
    state.regions.items.find((item) => item.id === id),
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [status, setStatus] = useState<Region["status"]>("Active");

  useEffect(() => {
    if (!region) return;
    setName(region.name);
    setDescription(region.description);
    setMetaTitle(region.metaTitle ?? "");
    setMetaDescription(region.metaDescription ?? "");
    setMetaKeywords(region.metaKeywords ?? "");
    setFeatureImage(region.featureImage ?? "");
    setStatus(region.status);
  }, [region]);

  const handleSave = () => {
    const payload: Region = {
      id: region?.id ?? nanoid(),
      name: name || "Untitled Region",
      description,
      metaTitle,
      metaDescription,
      metaKeywords,
      featureImage,
      status,
    };

    if (isEdit) {
      dispatch(updateRegion(payload));
      message.success("Region updated.");
    } else {
      dispatch(addRegion(payload));
      message.success("Region created.");
    }
    navigate("/locations/regions");
  };

  return (
    <>
      <Breadcrumb lastLabel={region?.name} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Region" : "New Region"}
      </h1>

      <div className="blog-editor">
        <div className="blog-editor__main">
          <div className="blog-editor__group">
            <InputField
              id="name"
              label="Name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <div className="form-item">
              <label>Short Description</label>
              <ShortDescriptionEditor
                value={description}
                onChange={setDescription}
                placeholder="A short summary for this region"
              />
            </div>
          </div>

          <CollapsibleField title="Meta Information">
            <InputField
              id="meta-title"
              label="Meta Title"
              placeholder="Meta title"
              value={metaTitle}
              onChange={(event) => setMetaTitle(event.target.value)}
            />
            <TextAreaField
              id="meta-description"
              label="Meta Description"
              placeholder="Meta description"
              value={metaDescription}
              onChange={(event) => setMetaDescription(event.target.value)}
              rows={3}
            />
            <TextAreaField
              id="meta-keywords"
              label="Meta Keywords"
              placeholder="Meta keywords"
              value={metaKeywords}
              onChange={(event) => setMetaKeywords(event.target.value)}
              rows={2}
            />
          </CollapsibleField>
        </div>

        <div className="blog-editor__side">
          <CollapsibleField title="Publishing">
            <div className="form-item">
              <label htmlFor="status">Status</label>
              <SelectField
                id="status"
                width="100%"
                value={status}
                onChange={(value) => setStatus(value as Region["status"])}
                options={statusOptions}
              />
            </div>

            <div className="blog-editor__actions">
              <Button
                type="primary"
                block
                icon={<FiSave />}
                onClick={handleSave}
              >
                Save Region
              </Button>
              <Button block onClick={() => navigate("/locations/regions")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>

          <CollapsibleField title="Featured Image">
            <FeatureImagePicker
              value={featureImage}
              onChange={setFeatureImage}
              hint="Select featured image"
            />
          </CollapsibleField>
        </div>
      </div>
    </>
  );
};

export default NewRegionPage;
