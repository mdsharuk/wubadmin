import { useEffect, useState } from "react";
import { App, Button } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollapsibleField from "@/components/common/CollapsibleField";
import FeatureImagePicker from "@/components/common/FeatureImagePicker";
import InputField from "@/components/common/InputField";
import MediaPicker from "@/components/common/MediaPicker";
import RichTextEditor from "@/components/common/RichTextEditor";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Country, addCountry, updateCountry } from "./countriesSlice";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const NewCountryPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const country = useAppSelector((state) =>
    state.countries.items.find((item) => item.id === id),
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capital, setCapital] = useState("");
  const [language, setLanguage] = useState("");
  const [population, setPopulation] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [internationalStudents, setInternationalStudents] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [currency, setCurrency] = useState("");
  const [callingCode, setCallingCode] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [status, setStatus] = useState<Country["status"]>("Active");

  useEffect(() => {
    if (!country) return;
    setName(country.name);
    setDescription(country.description ?? "");
    setCapital(country.capital);
    setLanguage(country.language ?? "");
    setPopulation(country.population ?? "");
    setAreaSize(country.areaSize ?? "");
    setInternationalStudents(country.internationalStudents ?? "");
    setAcademicYear(country.academicYear ?? "");
    setCurrency(country.currency);
    setCallingCode(country.callingCode ?? "");
    setTimeZone(country.timeZone ?? "");
    setMetaTitle(country.metaTitle ?? "");
    setMetaDescription(country.metaDescription ?? "");
    setMetaKeywords(country.metaKeywords ?? "");
    setFeatureImage(country.featureImage ?? "");
    setBannerImage(country.bannerImage ?? "");
    setStatus(country.status);
  }, [country]);

  const handleSave = () => {
    const payload: Country = {
      id: country?.id ?? nanoid(),
      name: name || "Untitled Country",
      capital,
      currency,
      status,
      description,
      language,
      population,
      areaSize,
      internationalStudents,
      academicYear,
      callingCode,
      timeZone,
      metaTitle,
      metaDescription,
      metaKeywords,
      featureImage,
      bannerImage,
    };

    if (isEdit) {
      dispatch(updateCountry(payload));
      message.success("Country updated.");
    } else {
      dispatch(addCountry(payload));
      message.success("Country created.");
    }
    navigate("/locations/countries");
  };

  return (
    <>
      <Breadcrumb lastLabel={country?.name} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Country" : "New Country"}
      </h1>

      <div className="blog-editor">
        <div className="blog-editor__main">
          <div className="blog-editor__group">
            <InputField
              id="name"
              label="Country Name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <div className="form-item">
              <label>Description</label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Write a description for this country..."
                minHeight={300}
              />
            </div>

            <div className="form-grid">
              <InputField
                id="capital"
                label="Capital"
                value={capital}
                onChange={(event) => setCapital(event.target.value)}
              />
              <InputField
                id="language"
                label="Language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              />
              <InputField
                id="population"
                label="Population"
                value={population}
                onChange={(event) => setPopulation(event.target.value)}
              />
              <InputField
                id="areaSize"
                label="Area Size"
                placeholder="e.g. 243,610 km²"
                value={areaSize}
                onChange={(event) => setAreaSize(event.target.value)}
              />
              <InputField
                id="internationalStudents"
                label="International Students"
                placeholder="e.g. 500,000"
                value={internationalStudents}
                onChange={(event) =>
                  setInternationalStudents(event.target.value)
                }
              />
              <InputField
                id="academicYear"
                label="Academic Year"
                placeholder="e.g. September - June"
                value={academicYear}
                onChange={(event) => setAcademicYear(event.target.value)}
              />
              <InputField
                id="currency"
                label="Currency"
                placeholder="e.g. USD"
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              />
              <InputField
                id="callingCode"
                label="Calling Code"
                placeholder="e.g. +1"
                value={callingCode}
                onChange={(event) => setCallingCode(event.target.value)}
              />
              <InputField
                id="timeZone"
                label="Time Zone"
                placeholder="e.g. GMT+0"
                value={timeZone}
                onChange={(event) => setTimeZone(event.target.value)}
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
                onChange={(value) => setStatus(value as Country["status"])}
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
                Save Country
              </Button>
              <Button block onClick={() => navigate("/locations/countries")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>

          <CollapsibleField title="Banner Image">
            <MediaPicker
              value={bannerImage}
              onChange={setBannerImage}
              hint="Select banner image"
              aspectRatio="3 / 1"
            />
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

export default NewCountryPage;
