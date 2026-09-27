import { Button } from "antd";

export interface FilterActionsProps {
  onFilter?: () => void;
  onReset?: () => void;
  filterText?: string;
  resetText?: string;
  loading?: boolean;
}

const FilterActions = ({
  onFilter,
  onReset,
  filterText = "Filter",
  resetText = "Reset",
  loading = false,
}: FilterActionsProps) => (
  <div className="filter-actions">
    <Button type="primary" onClick={onFilter} loading={loading}>
      {filterText}
    </Button>
    <Button onClick={onReset}>{resetText}</Button>
  </div>
);

export default FilterActions;
