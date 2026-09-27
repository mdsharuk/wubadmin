import { useEffect, useState } from "react";
import { App, Button } from "antd";
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
import type { Page } from "./pagesSlice";
import { addCountryPage, updateCountryPage } from "./countryPagesSlice";

const statusOptions = [
  { value: "Published", label: "Published" },
  { value: "Draft", label: "Draft" },
];

const regionOptions = [
  { value: "europe", label: "Europe" },
  { value: "north-america", label: "North America" },
  { value: "south-america", label: "South America" },
  { value: "asia", label: "Asia" },
  { value: "oceania", label: "Oceania" },
  { value: "middle-east", label: "Middle East" },
  { value: "africa", label: "Africa" },
];

const countryOptions = [
  { value: "united-kingdom", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
  { value: "united-states", label: "United States" },
  { value: "netherlands", label: "Netherlands" },
  { value: "ireland", label: "Ireland" },
  { value: "new-zealand", label: "New Zealand" },
  { value: "france", label: "France" },
  { value: "sweden", label: "Sweden" },
  { value: "japan", label: "Japan" },
  { value: "south-korea", label: "South Korea" },
  { value: "singapore", label: "Singapore" },
  { value: "united-arab-emirates", label: "United Arab Emirates" },
  { value: "malaysia", label: "Malaysia" },
];

const NewCountryPagePage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const page = useAppSelector((state) =>
    state.countryPages.items.find((item) => item.id === id),
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [status, setStatus] = useState<Page["status"]>("Draft");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [featureImage, setFeatureImage] = useState("");

  useEffect(() => {
    if (!page) return;
    setTitle(page.title);
    setDescription(page.description ?? "");
    setMetaTitle(page.metaTitle ?? "");
    setMetaDescription(page.metaDescription ?? "");
    setMetaKeywords(page.metaKeywords ?? "");
    setStatus(page.status ?? "Draft");
    setRegion(page.region ?? "");
    setCountry(page.country ?? "");
    setFeatureImage(page.featureImage ?? "");
  }, [page]);

  const handleSave = () => {
    const payload: Page = {
      id: page?.id ?? nanoid(),
      title: title || "Untitled Country Page",
      author: page?.author ?? "Preview Administrator",
      publishDate: page?.publishDate ?? dayjs().format("YYYY-MM-DD"),
      description,
      metaTitle,
      metaDescription,
      metaKeywords,
      status,
      region,
      country,
      featureImage,
    };

    if (isEdit) {
      dispatch(updateCountryPage(payload));
      message.success("Country page updated.");
    } else {
      dispatch(addCountryPage(payload));
      message.success("Country page created.");
    }
    navigate("/pages/country");
  };

  return (
    <>
      <Breadcrumb lastLabel={page?.title} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Country Page" : "New Country Page"}
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
                placeholder="Write your country page description here..."
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
              <Button block onClick={() => navigate("/pages/country")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>

          <CollapsibleField title="Page Attributes">
            <div className="form-item">
              <label htmlFor="region">Region</label>
              <SelectField
                id="region"
                width="100%"
                placeholder="Select region"
                value={region || undefined}
                onChange={(value) => setRegion((value as string) ?? "")}
                options={regionOptions}
              />
            </div>

            <div className="form-item">
              <label htmlFor="country">Country</label>
              <SelectField
                id="country"
                width="100%"
                placeholder="Select country"
                value={country || undefined}
                onChange={(value) => setCountry((value as string) ?? "")}
                options={countryOptions}
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

export default NewCountryPagePage;
