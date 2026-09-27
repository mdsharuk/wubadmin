import { useEffect, useState } from "react";
import { App, Button, Input } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollapsibleField from "@/components/common/CollapsibleField";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TextAreaField from "@/components/common/TextAreaField";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { User, addUser, updateUser } from "./usersSlice";

const roleOptions = [
  { value: "Administrator", label: "Administrator" },
  { value: "Editor", label: "Editor" },
  { value: "Author", label: "Author" },
  { value: "Manager", label: "Manager" },
  { value: "Subscriber", label: "Subscriber" },
];

const designationOptions = [
  { value: "Counsellor", label: "Counsellor" },
  { value: "Senior Counsellor", label: "Senior Counsellor" },
  { value: "Manager", label: "Manager" },
  { value: "Agent", label: "Agent" },
  { value: "Support", label: "Support" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const NewUserPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const user = useAppSelector((state) =>
    state.users.items.find((item) => item.id === id),
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Subscriber");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState<User["status"]>("Active");

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone ?? "");
    setAddress(user.address ?? "");
    setPassword(user.password ?? "");
    setConfirmPassword(user.password ?? "");
    setRole(user.role);
    setDesignation(user.designation ?? "");
    setStatus(user.status);
  }, [user]);

  const handleSave = () => {
    if (password !== confirmPassword) {
      message.error("Password and Confirm Password do not match.");
      return;
    }

    const payload: User = {
      id: user?.id ?? nanoid(),
      name: name || "Unnamed User",
      email,
      phone,
      address,
      password,
      role,
      designation,
      status,
    };

    if (isEdit) {
      dispatch(updateUser(payload));
      message.success("User updated.");
    } else {
      dispatch(addUser(payload));
      message.success("User created.");
    }
    navigate("/users");
  };

  return (
    <>
      <Breadcrumb lastLabel={user?.name} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit User" : "New User"}
      </h1>

      <div className="blog-editor">
        <div className="blog-editor__main">
          <div className="blog-editor__group">
            <div className="form-grid">
              <InputField
                id="name"
                label="Name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <InputField
                id="phone"
                label="Phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <InputField
                id="password"
                label="Password"
                control={
                  <Input.Password
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                }
              />
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                control={
                  <Input.Password
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                  />
                }
              />
              <div className="form-item">
                <label htmlFor="role">User Role</label>
                <SelectField
                  id="role"
                  width="100%"
                  placeholder="Select an option"
                  value={role || undefined}
                  onChange={(value) => setRole(value as string)}
                  options={roleOptions}
                />
              </div>
              <div className="form-item">
                <label htmlFor="designation">Designation</label>
                <SelectField
                  id="designation"
                  width="100%"
                  placeholder="Select an option"
                  value={designation || undefined}
                  onChange={(value) =>
                    setDesignation((value as string) ?? "")
                  }
                  options={designationOptions}
                />
              </div>
            </div>

            <TextAreaField
              id="address"
              label="Address"
              rows={3}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
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
                value={status}
                onChange={(value) => setStatus(value as User["status"])}
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
                Save User
              </Button>
              <Button block onClick={() => navigate("/users")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>
        </div>
      </div>
    </>
  );
};

export default NewUserPage;
