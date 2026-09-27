import { useEffect, useState } from "react";
import { App, Button } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { FiCheck } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollapsibleField from "@/components/common/CollapsibleField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  Designation,
  addDesignation,
  updateDesignation,
} from "./designationsSlice";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const NewDesignationPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const designation = useAppSelector((state) =>
    state.designations.items.find((item) => item.id === id),
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Designation["status"]>("Active");

  useEffect(() => {
    if (!designation) return;
    setName(designation.name);
    setDescription(designation.description);
    setStatus(designation.status);
  }, [designation]);

  const handleSave = () => {
    const payload: Designation = {
      id: designation?.id ?? nanoid(),
      name: name || "Untitled Designation",
      description,
      status,
    };

    if (isEdit) {
      dispatch(updateDesignation(payload));
      message.success("Designation updated.");
    } else {
      dispatch(addDesignation(payload));
      message.success("Designation created.");
    }
    navigate("/users/designations");
  };

  return (
    <>
      <Breadcrumb lastLabel={designation?.name} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Designation" : "New Designation"}
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
            <TextAreaField
              id="description"
              label="Description"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>

        <div className="blog-editor__side">
          <CollapsibleField title="Publishing">
            <div className="form-item">
              <label htmlFor="status">Status</label>
              <SelectField
                id="status"
                width="100%"
                placeholder="Select an option"
                value={status}
                onChange={(value) =>
                  setStatus(value as Designation["status"])
                }
                options={statusOptions}
              />
            </div>
          </CollapsibleField>

          <CollapsibleField title="Save record">
            <div className="blog-editor__actions">
              <Button
                type="primary"
                block
                icon={<FiCheck />}
                onClick={handleSave}
              >
                {isEdit ? "Save Designation" : "Create Designation"}
              </Button>
              <Button block onClick={() => navigate("/users/designations")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>
        </div>
      </div>
    </>
  );
};

export default NewDesignationPage;
