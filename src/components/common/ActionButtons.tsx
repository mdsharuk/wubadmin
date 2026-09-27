import { Button, Popconfirm, Space } from 'antd';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  deleteTitle?: string;
  size?: 'small' | 'middle';
}

const ActionButtons = ({
  onView,
  onEdit,
  onDelete,
  deleteTitle = 'Are you sure you want to delete this item?',
  size = 'small',
}: ActionButtonsProps) => (
  <Space size="middle">
    {onView ? (
      <Button
        type="text"
        size={size}
        icon={<FiEye />}
        onClick={onView}
        aria-label="View"
      />
    ) : null}
    {onEdit ? (
      <Button
        type="text"
        size={size}
        icon={<FiEdit />}
        onClick={onEdit}
        aria-label="Edit"
      />
    ) : null}
    {onDelete ? (
      <Popconfirm title={deleteTitle} onConfirm={onDelete}>
        <Button
          type="text"
          size={size}
          danger
          icon={<FiTrash2 />}
          aria-label="Delete"
        />
      </Popconfirm>
    ) : null}
  </Space>
);

export default ActionButtons;
