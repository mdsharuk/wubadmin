import { useEffect, useState } from "react";
import { App, Button } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollapsibleField from "@/components/common/CollapsibleField";
import DateField from "@/components/common/DateField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Ranking, addRanking, updateRanking } from "./rankingsSlice";

const universityOptions = [
  { value: "University of Oxford", label: "University of Oxford" },
  {
    value: "Massachusetts Institute of Technology",
    label: "Massachusetts Institute of Technology",
  },
  { value: "Stanford University", label: "Stanford University" },
  { value: "University of Cambridge", label: "University of Cambridge" },
  { value: "Harvard University", label: "Harvard University" },
  {
    value: "California Institute of Technology",
    label: "California Institute of Technology",
  },
  { value: "ETH Zurich", label: "ETH Zurich" },
  { value: "University of Toronto", label: "University of Toronto" },
  {
    value: "National University of Singapore",
    label: "National University of Singapore",
  },
  { value: "University of Melbourne", label: "University of Melbourne" },
];

const companyOptions = [
  {
    value: "QS World University Rankings",
    label: "QS World University Rankings",
  },
  { value: "Times Higher Education", label: "Times Higher Education" },
  { value: "ShanghaiRanking", label: "ShanghaiRanking" },
  { value: "U.S. News", label: "U.S. News" },
];

const typeOptions = [
  { value: "World University Rankings", label: "World University Rankings" },
  { value: "Subject Rankings", label: "Subject Rankings" },
  { value: "Regional Rankings", label: "Regional Rankings" },
  { value: "Business School Rankings", label: "Business School Rankings" },
];

const scopeOptions = [
  { value: "Global", label: "Global" },
  { value: "Regional", label: "Regional" },
  { value: "National", label: "National" },
  { value: "Subject", label: "Subject" },
];

const statusOptions = [
  { value: "Published", label: "Published" },
  { value: "Draft", label: "Draft" },
];

const NewRankingPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const ranking = useAppSelector((state) =>
    state.rankings.items.find((item) => item.id === id),
  );

  const [university, setUniversity] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [scope, setScope] = useState("");
  const [edition, setEdition] = useState("");
  const [rank, setRank] = useState("");
  const [overallScore, setOverallScore] = useState("");
  const [subject, setSubject] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [verifiedOn, setVerifiedOn] = useState<Dayjs | null>(null);
  const [verificationNote, setVerificationNote] = useState("");
  const [status, setStatus] = useState<Ranking["status"]>("Draft");

  useEffect(() => {
    if (!ranking) return;
    setUniversity(ranking.university);
    setCompany(ranking.company);
    setType(ranking.type);
    setScope(ranking.scope ?? "");
    setEdition(ranking.edition);
    setRank(ranking.rank);
    setOverallScore(ranking.overallScore ?? "");
    setSubject(ranking.subject ?? "");
    setSourceUrl(ranking.sourceUrl ?? "");
    setVerifiedOn(ranking.verifiedOn ? dayjs(ranking.verifiedOn) : null);
    setVerificationNote(ranking.verificationNote ?? "");
    setStatus(ranking.status);
  }, [ranking]);

  const handleSave = () => {
    const payload: Ranking = {
      id: ranking?.id ?? nanoid(),
      university: university || "Untitled University",
      company,
      type,
      scope,
      edition,
      rank,
      overallScore,
      subject,
      sourceUrl,
      verifiedOn: verifiedOn ? verifiedOn.format("YYYY-MM-DD") : "",
      verificationNote,
      status,
    };

    if (isEdit) {
      dispatch(updateRanking(payload));
      message.success("Ranking updated.");
    } else {
      dispatch(addRanking(payload));
      message.success("Ranking created.");
    }
    navigate("/rankings");
  };

  return (
    <>
      <Breadcrumb lastLabel={ranking?.university} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Ranking" : "New Ranking"}
      </h1>

      <div className="blog-editor">
        <div className="blog-editor__main">
          <CollapsibleField collapsible={false}>
            <div className="form-grid">
              <div className="form-item">
                <label htmlFor="university">
                  University
                  <span className="form-item__required">*</span>
                </label>
                <SelectField
                  id="university"
                  width="100%"
                  placeholder="Select an option"
                  value={university || undefined}
                  onChange={(value) => setUniversity((value as string) ?? "")}
                  options={universityOptions}
                />
              </div>
              <div className="form-item">
                <label htmlFor="company">Ranking Company</label>
                <SelectField
                  id="company"
                  width="100%"
                  placeholder="Select an option"
                  value={company || undefined}
                  onChange={(value) => setCompany((value as string) ?? "")}
                  options={companyOptions}
                />
              </div>
              <div className="form-item">
                <label htmlFor="type">Ranking Type</label>
                <SelectField
                  id="type"
                  width="100%"
                  placeholder="Select an option"
                  value={type || undefined}
                  onChange={(value) => setType((value as string) ?? "")}
                  options={typeOptions}
                />
              </div>
              <div className="form-item">
                <label htmlFor="scope">Scope</label>
                <SelectField
                  id="scope"
                  width="100%"
                  placeholder="Select an option"
                  value={scope || undefined}
                  onChange={(value) => setScope((value as string) ?? "")}
                  options={scopeOptions}
                />
              </div>
            </div>
          </CollapsibleField>

          <CollapsibleField collapsible={false}>
            <div className="form-grid">
              <InputField
                id="edition"
                label="Edition / Year"
                placeholder="e.g. 2026"
                value={edition}
                onChange={(event) => setEdition(event.target.value)}
              />
              <InputField
                id="rank"
                label="Rank"
                placeholder="e.g. #1"
                value={rank}
                onChange={(event) => setRank(event.target.value)}
              />
              <InputField
                id="overallScore"
                label="Overall Score"
                placeholder="e.g. 22, 22% or 22.2"
                value={overallScore}
                onChange={(event) => setOverallScore(event.target.value)}
              />
            </div>
          </CollapsibleField>

          <CollapsibleField collapsible={false}>
            <InputField
              id="subject"
              label="Subject"
              placeholder="e.g. Computer Science"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
          </CollapsibleField>

          <CollapsibleField collapsible={false}>
            <div className="form-grid">
              <InputField
                id="sourceUrl"
                label="Source URL"
                placeholder="https://example.com/rankings"
                value={sourceUrl}
                onChange={(event) => setSourceUrl(event.target.value)}
              />
              <div className="form-item">
                <label htmlFor="verifiedOn">Verified On</label>
                <DateField
                  id="verifiedOn"
                  style={{ width: "100%" }}
                  format="MM/DD/YYYY"
                  placeholder="mm/dd/yyyy"
                  value={verifiedOn}
                  onChange={(value) =>
                    setVerifiedOn((value as Dayjs | null) ?? null)
                  }
                />
              </div>
            </div>
            <TextAreaField
              id="verificationNote"
              label="Verification Note"
              rows={3}
              value={verificationNote}
              onChange={(event) => setVerificationNote(event.target.value)}
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
                onChange={(value) => setStatus(value as Ranking["status"])}
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
                Save Ranking
              </Button>
              <Button block onClick={() => navigate("/rankings")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>
        </div>
      </div>
    </>
  );
};

export default NewRankingPage;
