import { useEffect, useState } from "react";
import { Modal, Select } from "antd";

const agencyOptions = [
  { value: "example", label: "Example Education Agency" },
  { value: "global", label: "Global Study Abroad" },
  { value: "bright", label: "Bright Future Consultancy" },
  { value: "overseas", label: "Overseas Education Hub" },
  { value: "edwise", label: "Edwise International" },
  { value: "study-uk", label: "Study UK Advisors" },
];

interface ShareLeadsModalProps {
  open: boolean;
  leadCount?: number;
  onCancel: () => void;
  onShare?: (agencyIds: string[]) => void;
}

const ShareLeadsModal = ({
  open,
  leadCount = 0,
  onCancel,
  onShare,
}: ShareLeadsModalProps) => {
  const [agencies, setAgencies] = useState<string[]>([]);

  useEffect(() => {
    if (open) setAgencies([]);
  }, [open]);

  return (
    <Modal
      title="Share Leads"
      open={open}
      onCancel={onCancel}
      okText="Share"
      okButtonProps={{ disabled: agencies.length === 0 }}
      onOk={() => {
        onShare?.(agencies);
        setAgencies([]);
      }}
      destroyOnClose
    >
      <p className="share-modal__hint">
        Share {leadCount} selected {leadCount === 1 ? "lead" : "leads"} with one
        or more agencies.
      </p>

      <div className="leads-field">
        <label>Agencies</label>
        <Select
          mode="multiple"
          showSearch
          allowClear
          placeholder="Search and select agencies"
          style={{ width: "100%" }}
          value={agencies}
          onChange={(value) => setAgencies(value)}
          options={agencyOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            String(option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </div>
    </Modal>
  );
};

export default ShareLeadsModal;
