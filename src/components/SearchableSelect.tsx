import React, { useState, useMemo, useRef, useEffect } from "react";
import type { ICodingGoodsListItem } from "../types/apiTypes";
import "./SearchableSelect.css";

interface SearchableSelectProps {
  options: ICodingGoodsListItem[];
  value: ICodingGoodsListItem | null;
  onChange: (option: ICodingGoodsListItem | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "جستجو و انتخاب کنید...",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;

    return options.filter((option) =>
      option.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(-1);
    if (!isOpen) setIsOpen(true);
  };

  // Handle option selection
  const handleOptionSelect = (option: ICodingGoodsListItem) => {
    onChange(option);
    setSearchTerm("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Handle clear selection
  const handleClear = () => {
    onChange(null);
    setSearchTerm("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="searchable-select" ref={dropdownRef}>
      <div className="select-input-container">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm || value?.Title || ""}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="select-input"
        />
        <div className="select-actions">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
              disabled={disabled}
            >
              ×
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`dropdown-button ${isOpen ? "open" : ""}`}
            disabled={disabled}
          >
            ▼
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {filteredOptions.length === 0 ? (
            <div className="no-options">
              {searchTerm ? "هیچ نتیجه‌ای یافت نشد" : "هیچ گزینه‌ای موجود نیست"}
            </div>
          ) : (
            <div className="options-list">
              {filteredOptions.map((option, index) => (
                <div
                  key={option.ID}
                  className={`option ${
                    index === highlightedIndex ? "highlighted" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {option.Title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
