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
import {
  RankingType,
  addRankingType,
  updateRankingType,
} from "./rankingTypesSlice";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const NewRankingTypePage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const rankingType = useAppSelector((state) =>
    state.rankingTypes.items.find((item) => item.id === id),
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<RankingType["status"]>("Active");

  useEffect(() => {
    if (!rankingType) return;
    setName(rankingType.name);
    setDescription(rankingType.description);
    setStatus(rankingType.status);
  }, [rankingType]);

  const handleSave = () => {
    const payload: RankingType = {
      id: rankingType?.id ?? nanoid(),
      name: name || "Untitled Ranking Type",
      description,
      status,
    };

    if (isEdit) {
      dispatch(updateRankingType(payload));
      message.success("Ranking type updated.");
    } else {
      dispatch(addRankingType(payload));
      message.success("Ranking type created.");
    }
    navigate("/rankings/types");
  };

  return (
    <>
      <Breadcrumb lastLabel={rankingType?.name} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Ranking Type" : "New Ranking Type"}
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
              <label>Description</label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Write a description for this ranking type..."
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
                onChange={(value) =>
                  setStatus(value as RankingType["status"])
                }
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
                Save Ranking Type
              </Button>
              <Button block onClick={() => navigate("/rankings/types")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>
        </div>
      </div>
    </>
  );
};

export default NewRankingTypePage;
