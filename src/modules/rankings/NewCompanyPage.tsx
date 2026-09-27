import { useEffect, useState } from "react";
import { App, Button } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollapsibleField from "@/components/common/CollapsibleField";
import InputField from "@/components/common/InputField";
import RichTextEditor from "@/components/common/RichTextEditor";
import SelectField from "@/components/common/SelectField";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Company, addCompany, updateCompany } from "./companiesSlice";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const NewCompanyPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const company = useAppSelector((state) =>
    state.companies.items.find((item) => item.id === id),
  );

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Company["status"]>("Active");

  useEffect(() => {
    if (!company) return;
    setName(company.name);
    setWebsite(company.website);
    setDescription(company.description ?? "");
    setStatus(company.status);
  }, [company]);

  const handleSave = () => {
    const payload: Company = {
      id: company?.id ?? nanoid(),
      name: name || "Untitled Company",
      website,
      description,
      status,
    };

    if (isEdit) {
      dispatch(updateCompany(payload));
      message.success("Company updated.");
    } else {
      dispatch(addCompany(payload));
      message.success("Company created.");
    }
    navigate("/rankings/companies");
  };

  return (
    <>
      <Breadcrumb lastLabel={company?.name} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Company" : "New Company"}
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
            <InputField
              id="website"
              label="Website"
              placeholder="https://example.com"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
            <div className="form-item">
              <label>Description</label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Write a description for this company..."
                minHeight={240}
              />
            </div>
          </div>
        </div>

        <div className="blog-editor__side">
          <CollapsibleField title="Publishing">
            <div className="form-item">
              <label htmlFor="status">Status</label>
              <SelectField
                id="status"
                width="100%"
                value={status}
                onChange={(value) => setStatus(value as Company["status"])}
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
                Save Company
              </Button>
              <Button block onClick={() => navigate("/rankings/companies")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>
        </div>
      </div>
    </>
  );
};

export default NewCompanyPage;
