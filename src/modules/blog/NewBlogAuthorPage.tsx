import { useEffect, useState } from "react";
import { App, Button, Input } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addAuthor, updateAuthor } from "./blogAuthorsSlice";
import Breadcrumb from "@/components/common/Breadcrumb";
import InputField from "@/components/common/InputField";
import SlugField from "@/components/common/SlugField";
import RichTextEditor from "@/components/common/RichTextEditor";
import TextAreaField from "@/components/common/TextAreaField";
import FeatureImagePicker from "@/components/common/FeatureImagePicker";
import CollapsibleField from "@/components/common/CollapsibleField";

const NewBlogAuthorPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const author = useAppSelector((state) =>
    state.blogAuthors.items.find((item) => item.id === id),
  );

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  useEffect(() => {
    if (author) {
      setName(author.displayName);
      setUsername(author.username);
      setEmail(author.email);
    }
  }, [author]);

  const handleSave = () => {
    if (isEdit && author) {
      dispatch(
        updateAuthor({ ...author, displayName: name, username, email }),
      );
      message.success("Author updated.");
    } else {
      dispatch(
        addAuthor({
          id: nanoid(),
          displayName: name,
          username,
          email,
          role: "Author",
          posts: 0,
        }),
      );
      message.success("Author created.");
    }
    navigate("/blog/authors");
  };

  return (
    <>
      <Breadcrumb lastLabel={author?.displayName} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Author" : "Create New Author"}
      </h1>

      <div className="blog-editor">
        <div className="blog-editor__main">
          <div className="blog-editor__group">
            <InputField
              id="name"
              label="Name"
              placeholder="Display name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <SlugField
              value={username}
              onChange={setUsername}
              source={name}
              label="Username"
            />
          </div>

          <div className="blog-editor__group">
            <div className="blog-editor__row">
              <InputField
                id="email"
                label="Email"
                required
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <InputField
                label="Password"
                required
                control={
                  <Input.Password
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                }
              />
            </div>
          </div>

          <div className="blog-editor__group">
            <div className="form-item">
              <label>Bio</label>
              <RichTextEditor
                value={bio}
                onChange={setBio}
                placeholder="Write a short bio..."
                minHeight={320}
              />
            </div>
          </div>

          <CollapsibleField title="Meta information">
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
          <CollapsibleField title="Profile Image">
            <FeatureImagePicker
              value={avatar}
              onChange={setAvatar}
              hint="Select profile image"
            />
          </CollapsibleField>

          <div className="blog-editor__actions">
            <Button type="primary" block icon={<FiSave />} onClick={handleSave}>
              Save Author
            </Button>
            <Button block onClick={() => navigate("/blog/authors")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBlogAuthorPage;
