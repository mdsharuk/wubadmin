import { useEffect, useState } from "react";
import { App, Button, Checkbox } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addPost, updatePost } from "./blogSlice";
import Breadcrumb from "@/components/common/Breadcrumb";
import InputField from "@/components/common/InputField";
import SlugField from "@/components/common/SlugField";
import RichTextEditor from "@/components/common/RichTextEditor";
import ShortDescriptionEditor from "@/components/common/ShortDescriptionEditor";
import TextAreaField from "@/components/common/TextAreaField";
import SelectField from "@/components/common/SelectField";
import FeatureImagePicker from "@/components/common/FeatureImagePicker";
import TagsField from "@/components/common/TagsField";
import SearchInput from "@/components/common/SearchInput";
import DateField from "@/components/common/DateField";
import CollapsibleField from "@/components/common/CollapsibleField";

const allCategories = [
  { value: "art", label: "Art & Digital Media" },
  { value: "automotive", label: "Automotive" },
  { value: "entertainment", label: "Entertainment" },
  { value: "finance", label: "Finance" },
  { value: "pet", label: "Pet Business" },
  { value: "travel", label: "Travel" },
  { value: "business", label: "Business & Management" },
  { value: "engineering", label: "Engineering" },
  { value: "health", label: "Health & Medicine" },
  { value: "law", label: "Law" },
  { value: "it", label: "IT & Computer Science" },
  { value: "science", label: "Science" },
  { value: "education", label: "Education & Teaching" },
  { value: "design", label: "Design" },
  { value: "scholarships", label: "Scholarships" },
  { value: "admissions", label: "Admissions" },
  { value: "student-life", label: "Student Life" },
  { value: "career", label: "Career Advice" },
  { value: "uncategorized", label: "Uncategorized" },
];

const mostUsedCategories = ["art", "automotive", "entertainment", "finance"];

const NewBlogPostPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const post = useAppSelector((state) =>
    state.blog.posts.find((item) => item.id === id),
  );

  const [categoryTab, setCategoryTab] = useState<"all" | "most">("all");
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "art",
    "automotive",
    "entertainment",
  ]);
  const [primaryCategory, setPrimaryCategory] = useState("art");

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [featured, setFeatured] = useState("");

  const existingTags = ["Rankings", "Admissions", "Scholarship", "Visa", "IELTS", "Budget"];

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setTags(post.tags ? post.tags.split(", ") : []);
    }
  }, [post]);

  const handleSave = () => {
    if (isEdit && post) {
      dispatch(
        updatePost({ ...post, title, content, tags: tags.join(", ") }),
      );
      message.success("Post updated.");
    } else {
      dispatch(
        addPost({
          id: nanoid(),
          title,
          content,
          tags: tags.join(", "),
          author: "Example Author",
          categories: "Uncategorized",
          publishDate: "",
          status: "Draft",
        }),
      );
      message.success("Post created.");
    }
    navigate("/blog");
  };

  return (
    <>
      <Breadcrumb lastLabel={post?.title} />

      <h1 className="blog-editor__title">
        {isEdit ? "Edit Blog Post" : "New Blog Post"}
      </h1>

      <div className="blog-editor">
        <div className="blog-editor__main">
          <div className="blog-editor__group">
            <InputField
              id="title"
              label="Title"
              placeholder="Add a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <SlugField value={slug} onChange={setSlug} source={title} label="Slug" />

            <div className="form-item">
              <label>Short Description</label>
              <ShortDescriptionEditor
                value={excerpt}
                onChange={setExcerpt}
                placeholder="A short summary for post listings"
              />
            </div>

            <div className="form-item">
              <label>Description</label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your post description here..."
                minHeight={500}
              />
            </div>
          </div>

          <CollapsibleField title="Discussion">
            <Checkbox>Not allow comments</Checkbox>
          </CollapsibleField>

          <CollapsibleField title="SEO metadata">
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
          <CollapsibleField title="Publish">
            <div className="form-item">
              <label>Status</label>
              <SelectField
                width="100%"
                defaultValue="draft"
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "published", label: "Published" },
                  { value: "scheduled", label: "Scheduled" },
                ]}
              />
            </div>

            <div className="form-item">
              <label>Visibility</label>
              <SelectField
                width="100%"
                defaultValue="public"
                options={[
                  { value: "public", label: "Public" },
                  { value: "private", label: "Private" },
                ]}
              />
            </div>

            <div className="form-item">
              <label>Publish Date</label>
              <DateField style={{ width: "100%" }} />
            </div>

            <div className="blog-editor__actions">
              <Button type="primary" block icon={<FiSave />} onClick={handleSave}>
                Save Post
              </Button>
              <Button block onClick={() => navigate("/blog")}>
                Cancel
              </Button>
            </div>
          </CollapsibleField>

          <CollapsibleField title="Author">
            <SelectField
              width="100%"
              placeholder="Example Author"
              options={[{ value: "example", label: "Example Author" }]}
            />
            <Button
              type="link"
              className="blog-editor__link"
              onClick={() => navigate("/blog/authors")}
            >
              Create New Author
            </Button>
          </CollapsibleField>

          <CollapsibleField title="Categories">
            <div className="blog-categories">
              <div className="blog-categories__tabs">
                <button
                  type="button"
                  className={
                    categoryTab === "all"
                      ? "blog-categories__tab blog-categories__tab--active"
                      : "blog-categories__tab"
                  }
                  onClick={() => setCategoryTab("all")}
                >
                  All Categories
                </button>
                <button
                  type="button"
                  className={
                    categoryTab === "most"
                      ? "blog-categories__tab blog-categories__tab--active"
                      : "blog-categories__tab"
                  }
                  onClick={() => setCategoryTab("most")}
                >
                  Most Used
                </button>
              </div>

              <SearchInput
                placeholder="Search categories"
                value={categorySearch}
                onChange={(event) => setCategorySearch(event.target.value)}
              />

              <div className="blog-categories__list">
                {allCategories
                  .filter(
                    (category) =>
                      categoryTab === "all" ||
                      mostUsedCategories.includes(category.value),
                  )
                  .filter((category) =>
                    category.label
                      .toLowerCase()
                      .includes(categorySearch.trim().toLowerCase()),
                  )
                  .map((category) => {
                    const checked = selectedCategories.includes(category.value);
                    return (
                      <div key={category.value} className="blog-categories__item">
                        <Checkbox
                          checked={checked}
                          onChange={() => toggleCategory(category.value)}
                        >
                          {category.label}
                        </Checkbox>
                        {checked ? (
                          primaryCategory === category.value ? (
                            <span className="blog-categories__primary">
                              Primary
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="blog-categories__make-primary"
                              onClick={() => setPrimaryCategory(category.value)}
                            >
                              Make primary
                            </button>
                          )
                        ) : null}
                      </div>
                    );
                  })}
              </div>
            </div>

            <Button
              type="link"
              className="blog-editor__link"
              onClick={() => navigate("/blog/categories/create")}
            >
              Create New Category
            </Button>
          </CollapsibleField>

          <CollapsibleField title="Tags">
            <TagsField
              value={tags}
              onChange={setTags}
              placeholder="e.g. Rankings, Admissions"
              options={existingTags}
              mostUsed={existingTags}
            />
          </CollapsibleField>

          <CollapsibleField title="Featured image">
            <FeatureImagePicker value={featured} onChange={setFeatured} />
          </CollapsibleField>
        </div>
      </div>
    </>
  );
};

export default NewBlogPostPage;
