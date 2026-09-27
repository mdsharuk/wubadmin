import { KeyboardEvent, useState } from "react";
import { AutoComplete, Button, Tag } from "antd";

export interface TagsFieldProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  /** Existing tags used for the autocomplete dropdown. */
  options?: string[];
  /** Tags shown under "Choose from the most used tags". */
  mostUsed?: string[];
  placeholder?: string;
  hint?: string;
}

const TagsField = ({
  value = [],
  onChange,
  options = [],
  mostUsed = [],
  placeholder = "Add tags...",
  hint = "Separate tags with commas",
}: TagsFieldProps) => {
  const [input, setInput] = useState("");
  const [showMostUsed, setShowMostUsed] = useState(false);

  const exists = (tag: string) =>
    value.some((item) => item.toLowerCase() === tag.toLowerCase());

  const addTag = (raw: string) => {
    const tag = raw.trim().replace(/,+$/, "");
    setInput("");
    if (!tag || exists(tag)) return;
    onChange?.([...value, tag]);
  };

  const removeTag = (tag: string) => {
    onChange?.(value.filter((item) => item !== tag));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();
      addTag(input);
    } else if (event.key === "Backspace" && !input && value.length) {
      removeTag(value[value.length - 1]);
    }
  };

  const suggestions = options
    .filter((option) => !exists(option))
    .filter((option) =>
      option.toLowerCase().includes(input.trim().toLowerCase()),
    )
    .map((option) => ({ value: option }));

  return (
    <div className="tags-field">
      <div className="tags-field__row">
        <AutoComplete
          className="tags-field__input"
          value={input}
          options={input ? suggestions : []}
          placeholder={placeholder}
          onChange={(next) => setInput(next)}
          onSelect={(next) => addTag(next)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={() => addTag(input)}>Add</Button>
      </div>

      {hint ? <div className="tags-field__hint">{hint}</div> : null}

      {value.length ? (
        <div className="tags-field__list">
          {value.map((tag) => (
            <Tag key={tag} closable onClose={() => removeTag(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
      ) : null}

      {mostUsed.length ? (
        <>
          <button
            type="button"
            className="tags-field__link"
            onClick={() => setShowMostUsed((open) => !open)}
          >
            Choose from the most used tags
          </button>

          {showMostUsed ? (
            <div className="tags-field__most-used">
              {mostUsed
                .filter((tag) => !exists(tag))
                .map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="tags-field__suggestion"
                    onClick={() => addTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default TagsField;
