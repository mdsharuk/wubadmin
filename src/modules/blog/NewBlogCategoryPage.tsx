import { useEffect, useState } from "react";
import { App, Button } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addCategory, updateCategory } from "./blogCategoriesSlice";
import Breadcrumb from "@/components/common/Breadcrumb";
import InputField from "@/components/common/InputField";
import SlugField from "@/components/common/SlugField";
import RichTextEditor from "@/components/common/RichTextEditor";
import TextAreaField from "@/components/common/TextAreaField";
import SelectField from "@/components/common/SelectField";
import FeatureImagePicker from "@/components/common/FeatureImagePicker";
import CollapsibleField from "@/components/common/CollapsibleField";

const NewBlogCategoryPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const category = useAppSelector((state) =>
    state.blogCategories.items.find((item) => item.id === id),
  );

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
      setDescription(category.description);
    }
  }, [category]);

  const handleSave = () => {
    if (isEdit && category) {
      dispatch(updateCategory({ ...category, name, slug, description }));
      message.success("Category updated.");
    } else {
      dispatch(
        addCategory({
          id: nanoid(),
          name,
          slug,
          description,
          count: 0,
        }),
      );
      message.success("Category created.");
    }
    navigate("/blog/categories");
  };

  return (
    <>
      <Breadcrumb lastLabel={category?.name} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Category" : "Create New Category"}
      </h1>

      <div className="blog-editor">
        <div className="blog-editor__main">
          <CollapsibleField title="Category">
            <InputField
              id="name"
              label="Name"
              placeholder="Category name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <SlugField
              value={slug}
              onChange={setSlug}
              source={name}
              label="Slug"
            />

            <div className="form-item">
              <label>Parent Category</label>
              <SelectField
                width="100%"
                placeholder="None"
                options={[
                  { value: "none", label: "None" },
                  { value: "art", label: "Art & Digital Media" },
                  { value: "automotive", label: "Automotive" },
                  { value: "business", label: "Business & Management" },
                  { value: "engineering", label: "Engineering" },
                  { value: "finance", label: "Finance" },
                  { value: "travel", label: "Travel" },
                ]}
              />
            </div>

            <div className="form-item">
              <label>Description</label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Describe this category..."
                minHeight={320}
              />
            </div>
          </CollapsibleField>

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
          <CollapsibleField title="Featured image">
            <FeatureImagePicker value={featured} onChange={setFeatured} />
          </CollapsibleField>

          <div className="blog-editor__actions">
            <Button type="primary" block icon={<FiSave />} onClick={handleSave}>
              Save Category
            </Button>
            <Button block onClick={() => navigate("/blog/categories")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBlogCategoryPage;
