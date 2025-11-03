import React, { useState, useMemo, useRef, useEffect } from "react";
import type {
  ICodingGoodsListItem,
  ISearchableSelectProps,
} from "../types/apiTypes";

export const SearchableSelect: React.FC<ISearchableSelectProps> = ({
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

  const filteredOptions = useMemo(() => {
    if (!options || options.length === 0) return [];

    if (!searchTerm.trim()) return options;

    const searchLower = searchTerm.toLowerCase().trim();
    return options.filter((option) => {
      const titleMatch =
        option.Title?.toLowerCase().includes(searchLower) || false;
      const sharhMatch =
        option.sharhmahsolbarayefactor?.toLowerCase().includes(searchLower) ||
        false;
      return titleMatch || sharhMatch;
    });
  }, [options, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setHighlightedIndex(-1);
    setIsOpen(true); // همیشه dropdown را باز کن
  };

  const handleOptionSelect = (option: ICodingGoodsListItem) => {
    onChange(option);
    setSearchTerm("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClear = () => {
    onChange(null);
    setSearchTerm("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      className="relative w-full max-w-full md:max-w-[400px]"
      ref={dropdownRef}
    >
      <div className="relative flex items-center border-2 border-gray-300 rounded-lg bg-white transition-colors focus-within:border-[#0ead69] focus-within:ring-2 focus-within:ring-[#0ead69]/20">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm !== "" ? searchTerm : value?.Title || ""}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsOpen(true);
            if (!searchTerm && value?.Title) {
              setSearchTerm(value.Title);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 px-4 py-3 border-none outline-none text-base md:text-sm bg-transparent text-gray-800 placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          dir="rtl"
        />
        <div className="flex items-center pr-2">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="bg-transparent border-none text-lg text-gray-400 cursor-pointer px-2 py-1 rounded transition-all leading-none hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={disabled}
            >
              ×
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`bg-transparent border-none text-xs text-gray-600 cursor-pointer p-2 rounded transition-all ${
              isOpen ? "rotate-180" : "rotate-0"
            } hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={disabled}
          >
            ▼
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-[1000] max-h-[300px] overflow-hidden mt-1">
          {!options || options.length === 0 ? (
            <div className="p-4 text-center text-gray-400 text-sm italic">
              هیچ گزینه‌ای موجود نیست
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-4 text-center text-gray-400 text-sm italic">
              هیچ نتیجه‌ای یافت نشد
            </div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto scrollbar-thin">
              {filteredOptions.map((option, index) => (
                <div
                  key={option.ID}
                  className={`px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                    index === highlightedIndex
                      ? "bg-gray-100"
                      : "bg-white hover:bg-gray-50 active:bg-gray-200"
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="font-semibold text-gray-800 mb-1">
                    {option.Title}
                  </div>
                  {option.sharhmahsolbarayefactor && (
                    <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {option.sharhmahsolbarayefactor}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
