import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Empty,
  Image,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Segmented,
  Upload,
} from "antd";
import type { UploadProps } from "antd";
import { FiEye, FiSearch, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  addMedia,
  MediaItem,
  removeMedia,
  removeMediaMany,
} from "./mediaSlice";

const PAGE_SIZE = 12;

interface MediaLibraryProps {
  selectable?: boolean;
  multiple?: boolean;
  onSelectionChange?: (items: MediaItem[]) => void;
}

const MediaLibrary = ({
  selectable = false,
  multiple = true,
  onSelectionChange,
}: MediaLibraryProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.media.items);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "image">("all");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesType = typeFilter === "all" || item.type === typeFilter;
        const matchesQuery = item.name
          .toLowerCase()
          .includes(query.trim().toLowerCase());
        return matchesType && matchesQuery;
      }),
    [items, query, typeFilter],
  );

  const total = filtered.length;
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const notify = (ids: string[]) => {
    onSelectionChange?.(items.filter((item) => ids.includes(item.id)));
  };

  const toggleSelect = (id: string) => {
    if (!selectable) return;
    const next = selectedIds.includes(id)
      ? selectedIds.filter((value) => value !== id)
      : multiple
        ? [...selectedIds, id]
        : [id];
    setSelectedIds(next);
    notify(next);
  };

  const handleUpload: UploadProps["beforeUpload"] = (file) => {
    const url = URL.createObjectURL(file);
    dispatch(addMedia({ name: file.name, url, size: file.size, type: "image" }));
    return false;
  };

  const handleDelete = (id: string) => {
    dispatch(removeMedia(id));
    const next = selectedIds.filter((value) => value !== id);
    setSelectedIds(next);
    notify(next);
  };

  const handleDeleteSelected = () => {
    dispatch(removeMediaMany(selectedIds));
    setSelectedIds([]);
    notify([]);
  };

  return (
    <div className="media-library">
      <div className="media-library__toolbar">
        <Input
          className="media-library__search"
          prefix={<FiSearch />}
          placeholder="Search media"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          allowClear
        />

        <Segmented
          value={typeFilter}
          onChange={(value) => {
            setTypeFilter(value as "all" | "image");
            setPage(1);
          }}
          options={[
            { label: "All", value: "all" },
            { label: "Images", value: "image" },
          ]}
        />

        <div className="media-library__actions">
          {selectable && selectedIds.length > 0 ? (
            <Button danger icon={<FiTrash2 />} onClick={handleDeleteSelected}>
              Delete ({selectedIds.length})
            </Button>
          ) : null}

          <Upload
            accept="image/*"
            multiple
            showUploadList={false}
            beforeUpload={handleUpload}
          >
            <Button type="primary" icon={<FiUploadCloud />}>
              Upload
            </Button>
          </Upload>
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="media-library__empty">
          <Empty description="No media found" />
        </div>
      ) : (
        <div className="media-library__grid">
          {paged.map((item) => {
            const selected = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={[
                  "media-item",
                  selectable ? "media-item--selectable" : "",
                  selected ? "media-item--selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => toggleSelect(item.id)}
              >
                <div className="media-item__thumb">
                  {selectable ? (
                    <>
                      <img src={item.url} alt={item.name} />
                      <Checkbox
                        className="media-item__check"
                        checked={selected}
                        onChange={() => toggleSelect(item.id)}
                        onClick={(event) => event.stopPropagation()}
                      />
                      <Button
                        className="media-item__preview"
                        type="text"
                        size="small"
                        icon={<FiEye />}
                        onClick={(event) => {
                          event.stopPropagation();
                          setPreviewUrl(item.url);
                        }}
                      />
                    </>
                  ) : (
                    <Image src={item.url} alt={item.name} />
                  )}
                </div>

                <div className="media-item__meta">
                  <span className="media-item__name" title={item.name}>
                    {item.name}
                  </span>
                  <Popconfirm
                    title="Delete this item?"
                    okText="Delete"
                    okButtonProps={{ danger: true }}
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<FiTrash2 />}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </Popconfirm>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {total > PAGE_SIZE ? (
        <div className="media-library__pagination">
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            total={total}
            showSizeChanger={false}
            showTotal={(count) => `${count} items`}
            onChange={setPage}
          />
        </div>
      ) : null}

      <Modal
        open={Boolean(previewUrl)}
        footer={null}
        onCancel={() => setPreviewUrl(null)}
        centered
        width={720}
      >
        {previewUrl ? (
          <img className="media-preview__img" src={previewUrl} alt="" />
        ) : null}
      </Modal>
    </div>
  );
};

export default MediaLibrary;
