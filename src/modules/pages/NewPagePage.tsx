import { useEffect, useState } from "react";
import { App, Button, InputNumber } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollapsibleField from "@/components/common/CollapsibleField";
import FeatureImagePicker from "@/components/common/FeatureImagePicker";
import InputField from "@/components/common/InputField";
import RichTextEditor from "@/components/common/RichTextEditor";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Page, addPage, updatePage } from "./pagesSlice";

const statusOptions = [
  { value: "Published", label: "Published" },
  { value: "Draft", label: "Draft" },
];

const NewPagePage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const page = useAppSelector((state) =>
    state.pages.items.find((item) => item.id === id),
  );
  const pages = useAppSelector((state) => state.pages.items);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [status, setStatus] = useState<Page["status"]>("Draft");
  const [parent, setParent] = useState("");
  const [order, setOrder] = useState(0);
  const [featureImage, setFeatureImage] = useState("");

  useEffect(() => {
    if (!page) return;
    setTitle(page.title);
    setDescription(page.description ?? "");
    setMetaTitle(page.metaTitle ?? "");
    setMetaDescription(page.metaDescription ?? "");
    setMetaKeywords(page.metaKeywords ?? "");
    setStatus(page.status ?? "Draft");
    setParent(page.parent ?? "");
    setOrder(page.order ?? 0);
    setFeatureImage(page.featureImage ?? "");
  }, [page]);

  const parentOptions = pages
    .filter((item) => item.id !== id)
    .map((item) => ({ value: item.id, label: item.title }));

  const handleSave = () => {
    const payload: Page = {
      id: page?.id ?? nanoid(),
      title: title || "Untitled Page",
      author: page?.author ?? "Preview Administrator",
      publishDate: page?.publishDate ?? dayjs().format("YYYY-MM-DD"),
      description,
      metaTitle,
      metaDescription,
      metaKeywords,
      status,
      parent,
      order,
      featureImage,
    };

    if (isEdit) {
      dispatch(updatePage(payload));
      message.success("Page updated.");
    } else {
      dispatch(addPage(payload));
      message.success("Page created.");
    }
    navigate("/pages");
  };

  return (
    <>
      <Breadcrumb lastLabel={page?.title} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Page" : "New Page"}
      </h1>

      <div className="blog-editor">
        <div className="blog-editor__main">
          <div className="blog-editor__group">
            <InputField
              id="title"
              label="Title"
              required
              placeholder="Add a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <div className="form-item">
              <label>Description</label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Write your page description here..."
                minHeight={400}
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
          <CollapsibleField title="Status">
            <div className="form-item">
              <label htmlFor="status">Status</label>
              <SelectField
                id="status"
                width="100%"
                value={status}
                onChange={(value) => setStatus(value as Page["status"])}
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
                Save Page
              </Button>
              <Button block onClick={() => navigate("/pages")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>

          <CollapsibleField title="Page Attributes">
            <div className="form-item">
              <label htmlFor="parent">Parent</label>
              <SelectField
                id="parent"
                width="100%"
                placeholder="No parent"
                value={parent || undefined}
                onChange={(value) => setParent((value as string) ?? "")}
                options={parentOptions}
              />
            </div>

            <div className="form-item">
              <label htmlFor="order">Order</label>
              <InputNumber
                id="order"
                style={{ width: "100%" }}
                min={0}
                value={order}
                onChange={(value) => setOrder(value ?? 0)}
              />
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

export default NewPagePage;
