import React from "react";

interface SearchInputProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  handleSearchChange,
  searchTerm,
  placeholder,
}) => {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2 size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};

export default SearchInput;
