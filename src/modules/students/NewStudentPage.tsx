import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { App, Button, Checkbox, Upload } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { FiSave, FiTrash2, FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollapsibleField from "@/components/common/CollapsibleField";
import DateField from "@/components/common/DateField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TagsField from "@/components/common/TagsField";
import FeatureImagePicker from "@/components/common/FeatureImagePicker";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Student, addStudent, updateStudent } from "./studentsSlice";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const countryOptions = [
  { value: "bd", label: "Bangladesh" },
  { value: "in", label: "India" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "us", label: "United States" },
];

const NewStudentPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const student = useAppSelector((state) =>
    state.students.items.find((item) => item.id === id),
  );

  const [form, setForm] = useState<Record<string, string>>({});
  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const [destinations, setDestinations] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [educations, setEducations] = useState<string[]>([]);
  const [testScores, setTestScores] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);

  useEffect(() => {
    if (!student) return;
    const [firstName, ...rest] = student.name.split(" ");
    setForm((prev) => ({
      ...prev,
      firstName,
      lastName: rest.join(" "),
      email: student.email,
      contact: student.contact,
      status: student.status.toLowerCase(),
    }));
    setDestinations(student.destinations ? [student.destinations] : []);
    setLevels(student.studyLevels ? [student.studyLevels] : []);
  }, [student]);

  const text = (
    key: string,
    label: string,
    required = false,
    placeholder?: string,
  ) => (
    <InputField
      key={key}
      id={key}
      label={label}
      required={required}
      placeholder={placeholder}
      value={form[key] ?? ""}
      onChange={(event) => set(key, event.target.value)}
    />
  );

  const select = (
    key: string,
    label: string,
    required = false,
    options = countryOptions,
    placeholder = "Select…",
  ) => (
    <div className="form-item" key={key}>
      <label>
        {label}
        {required ? <span className="form-item__required">*</span> : null}
      </label>
      <SelectField
        width="100%"
        placeholder={placeholder}
        value={form[key]}
        onChange={(value) => set(key, value as string)}
        options={options}
      />
    </div>
  );

  const date = (key: string, label: string, required = false) => (
    <div className="form-item" key={key}>
      <label>
        {label}
        {required ? <span className="form-item__required">*</span> : null}
      </label>
      <DateField
        style={{ width: "100%" }}
        value={undefined}
        onChange={() => set(key, "set")}
      />
    </div>
  );

  const tags = (
    label: string,
    value: string[],
    onChange: (value: string[]) => void,
  ) => (
    <div className="form-item" key={label}>
      <label>{label}</label>
      <TagsField
        value={value}
        onChange={onChange}
        placeholder="Type and add"
        options={["United Kingdom", "Canada", "Australia", "Germany"]}
      />
    </div>
  );

  const section = (title: string, children: ReactNode, defaultOpen = true) => (
    <CollapsibleField key={title} title={title} defaultOpen={defaultOpen}>
      {children}
    </CollapsibleField>
  );

  const listSection = (
    title: string,
    items: string[],
    setItems: Dispatch<SetStateAction<string[]>>,
    fields: [string, string][],
    addLabel: string,
  ) => (
    <CollapsibleField key={title} title={title}>
      {items.map((item) => (
        <div key={item} className="student-list__item">
          <div className="form-grid">
            {fields.map(([key, label]) => text(`${key}-${item}`, label))}
          </div>
          <Button
            size="small"
            danger
            icon={<FiTrash2 />}
            onClick={() =>
              setItems((prev) => prev.filter((value) => value !== item))
            }
          >
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={() => setItems((prev) => [...prev, nanoid()])}>
        {addLabel}
      </Button>
    </CollapsibleField>
  );

  const docRow = (label: string) => (
    <div className="form-item" key={label}>
      <label>{label}</label>
      <div className="student-docs__row">
        <Upload beforeUpload={() => false} showUploadList={false}>
          <Button icon={<FiUpload />}>Choose file</Button>
        </Upload>
        <span className="form-item__hint">No file chosen</span>
        <SelectField
          width={100}
          placeholder="No"
          options={yesNoOptions}
          value={form[label]}
          onChange={(value) => set(label, value as string)}
        />
      </div>
    </div>
  );

  const handleSave = () => {
    const name = [form.firstName, form.lastName].filter(Boolean).join(" ");
    const payload: Student = {
      id: student?.id ?? nanoid(),
      name: name || student?.name || "Unnamed Student",
      email: form.email ?? student?.email ?? "",
      contact: form.contact ?? student?.contact ?? "",
      destinations: destinations.join(", ") || student?.destinations || "",
      studyLevels: levels.join(", ") || student?.studyLevels || "",
      status: (form.status
        ? (form.status.charAt(0).toUpperCase() +
            form.status.slice(1)) as Student["status"]
        : student?.status) ?? "Active",
    };

    if (isEdit) {
      dispatch(updateStudent(payload));
      message.success("Student updated.");
    } else {
      dispatch(addStudent(payload));
      message.success("Student saved.");
    }
    navigate("/students");
  };

  return (
    <>
      <Breadcrumb lastLabel={student?.name} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Student" : "Create New Student"}
      </h1>

      <div className="blog-editor">
        <div className="blog-editor__main">
          {section(
            "Personal Details",
            <div className="form-grid">
              {text("firstName", "First Name", true)}
              {text("middleName", "Middle Name")}
              {text("lastName", "Last Name", true)}
              {date("dob", "Date of Birth", true)}
              {select("gender", "Gender", true, genderOptions)}
              {select("callingCode", "Country calling code", true, [
                { value: "+880", label: "+880" },
                { value: "+91", label: "+91" },
                { value: "+44", label: "+44" },
                { value: "+1", label: "+1" },
              ])}
              {text("contact", "Contact number", true)}
              {text("email", "Email", true)}
              {select("country", "Country", true)}
              {text("state", "State", true)}
              {text("city", "City")}
              {text("address", "Address")}
              {text("zip", "Postal/Zip Code")}
              {text("nationality", "Nationality / citizenship")}
              {text("primaryLanguage", "Primary language")}
              {text("secondaryLanguage", "Secondary language")}
              {text("linkedin", "LinkedIn profile URL")}
              {select("veteran", "US Armed Forces veteran", false, yesNoOptions)}
              {text("timezone", "Timezone")}
              {select("marital", "Marital Status", false, [
                { value: "single", label: "Single" },
                { value: "married", label: "Married" },
              ])}
            </div>,
          )}

          {section(
            "Study Preferences",
            <div className="form-grid">
              {tags("Study destinations", destinations, setDestinations)}
              {tags("Intended study levels", levels, setLevels)}
              {tags("Subjects of interest", subjects, setSubjects)}
              {text("studyMode", "Study mode", false, "e.g. Full Time")}
              {select("intake", "Preferred intake", false, [
                { value: "spring", label: "Spring" },
                { value: "summer", label: "Summer" },
                { value: "fall", label: "Fall" },
              ])}
              {text("intakeYear", "Preferred intake year")}
              {date("startDate", "Preferred start date")}
              {text("studyFunding", "Study funding", false, "e.g. Personal funding")}
              {select("tuitionBudget", "Tuition budget (USD)", false, [
                { value: "0-10k", label: "0 - 10,000" },
                { value: "10k-25k", label: "10,000 - 25,000" },
                { value: "25k+", label: "25,000+" },
              ])}
              {text("interestedUniversity", "Interested University")}
              {select("status", "Status", false, [
                { value: "active", label: "Active" },
                { value: "enrolled", label: "Enrolled" },
                { value: "inactive", label: "Inactive" },
                { value: "graduated", label: "Graduated" },
              ])}
            </div>,
          )}

          {section(
            "Academic Overview",
            <>
              <div className="form-grid">
                {select("highestQualification", "Highest qualification", false, [
                  { value: "hsc", label: "HSC / A-Level" },
                  { value: "bachelor", label: "Bachelor" },
                  { value: "master", label: "Master" },
                ])}
                {text("subjectsStudied", "Subjects studied")}
                {text("gradingSystem", "Grading system")}
                {text("qualificationScore", "Qualification score")}
                {text("graduationYear", "Graduation year")}
                {text("averageGrade", "Average grade (%)")}
                {select(
                  "englishResults",
                  "English test results available?",
                  false,
                  yesNoOptions,
                )}
              </div>
            </>,
          )}

          {listSection(
            "Education Summary",
            educations,
            setEducations,
            [
              ["eduInstitution", "Institution"],
              ["eduDegree", "Degree"],
              ["eduField", "Field of study"],
              ["eduYear", "Graduation year"],
            ],
            "Add Education",
          )}

          {listSection(
            "Test Scores",
            testScores,
            setTestScores,
            [
              ["testName", "Test"],
              ["testScore", "Score"],
              ["testDate", "Date"],
            ],
            "Add Test Score",
          )}

          {section(
            "Work Overview",
            <div className="form-grid">
              {text("totalExperience", "Total work experience")}
              {text("postgradExperience", "Postgraduate work experience")}
              {text("industry", "Current industry")}
              {text("employer", "Current employer")}
            </div>,
          )}

          {listSection(
            "Experience",
            experiences,
            setExperiences,
            [
              ["expCompany", "Company"],
              ["expPosition", "Position"],
              ["expStart", "Start date"],
              ["expEnd", "End date"],
            ],
            "Add Experience",
          )}

          {section(
            "Additional Information",
            <>
              <div className="form-grid">
                {text("ecName", "Name", true)}
                {text("ecContact", "Contact", true)}
                {text("ecEmail", "Email", true)}
                {text("ecRelation", "Relation with Contact", true)}
              </div>

              <h3 className="student-form__subtitle">Mailing Address</h3>
              <div className="form-grid">
                {text("mailAddress", "Address", true)}
                {select("mailCountry", "Country", true)}
                {text("mailState", "State", true)}
                {text("mailCity", "City", true)}
                {text("mailZip", "Postal/Zip Code", true)}
              </div>
              <Checkbox>Same as Mailing Address</Checkbox>

              <h3 className="student-form__subtitle">Background Information</h3>
              <div className="form-grid">
                {select("refusedVisa", "Any Refused Visa", true, yesNoOptions)}
                {select("studyPermit", "Any Study Permit", false, yesNoOptions)}
                {text("backgroundDescription", "Description")}
              </div>
            </>,
          )}

          {section(
            "Documents",
            <div className="student-docs">
              {docRow("CV / résumé (maximum 5 MB)")}
              {docRow("Passport Information")}
              {docRow("SOP Information")}
              {docRow("LOR Information")}
              {docRow("Academic Transcript")}
              {docRow("Completion Certificate")}
              {docRow("English Test Report")}
            </div>,
          )}

          {section(
            "Data Sharing Consent",
            <>
              <div className="form-grid">
                {select("consentFrom", "Written data-sharing consent from", false, [
                  { value: "student", label: "Student" },
                  { value: "guardian", label: "Guardian" },
                ])}
                {date("consentRecordedOn", "Consent recorded on")}
                {text("consentWhere", "Where consent is recorded")}
              </div>
            </>,
          )}
        </div>

        <div className="blog-editor__side">
          <CollapsibleField title="Profile Image">
            <FeatureImagePicker
              value={image}
              onChange={setImage}
              hint="Select profile image"
            />
          </CollapsibleField>

          <div className="blog-editor__actions">
            <Button type="primary" block icon={<FiSave />} onClick={handleSave}>
              Save Student
            </Button>
            <Button block onClick={() => navigate("/students")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewStudentPage;
