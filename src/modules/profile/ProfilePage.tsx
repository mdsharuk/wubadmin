import { useEffect, useState } from "react";
import { App, Button, Input } from "antd";
import { FiCheck } from "react-icons/fi";
import Breadcrumb from "@/components/common/Breadcrumb";
import CollapsibleField from "@/components/common/CollapsibleField";
import FeatureImagePicker from "@/components/common/FeatureImagePicker";
import InputField from "@/components/common/InputField";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateUser } from "@/modules/auth/authSlice";

const ProfilePage = () => {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!user) return;
    setFullName(user.name ?? "");
    setEmail(user.email ?? "");
    setMobile(user.mobile ?? "");
    setAddress(user.address ?? "");
    setPassword(user.password ?? "");
    setAvatar(user.avatar ?? "");
  }, [user]);

  const handleSave = () => {
    dispatch(
      updateUser({ name: fullName, email, mobile, address, password, avatar }),
    );
    message.success("Profile saved.");
  };

  return (
    <>
      <Breadcrumb />

      <h1 className="blog-editor__title">Profile</h1>

      <div className="profile-page">
        <div className="profile-page__main">
          <div className="profile-form">
            <h2 className="profile-card__title">Personal information</h2>
            <p className="profile-card__subtitle">
              Your changes are kept only in this browser tab.
            </p>

            <div className="form-grid">
              <InputField
                id="fullName"
                label="Full Name"
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <InputField
                id="mobile"
                label="Mobile"
                type="tel"
                autoComplete="tel"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
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
                    placeholder="Enter a new password"
                  />
                }
              />
              <InputField
                id="address"
                label="Address"
                fieldClassName="profile-form__full"
                control={
                  <Input.TextArea
                    id="address"
                    rows={4}
                    autoComplete="street-address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                }
              />
            </div>
          </div>
        </div>

        <div className="profile-page__side">
          <CollapsibleField title="Profile image">
            <p className="profile-card__subtitle">
              Select an image for your profile.
            </p>
            <FeatureImagePicker
              value={avatar}
              onChange={setAvatar}
              hint="Select profile image"
            />
          </CollapsibleField>

          <div className="profile-card">
            <h2 className="profile-card__title">Save profile</h2>
            <p className="profile-card__subtitle">
              Preview changes will appear in this tab.
            </p>
            <Button
              type="primary"
              block
              icon={<FiCheck />}
              onClick={handleSave}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

