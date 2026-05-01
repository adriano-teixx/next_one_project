type DocumentLabelSearchFieldProps = {
  onChange: (value: string) => void;
  value: string;
};

export function DocumentLabelSearchField({
  onChange,
  value,
}: DocumentLabelSearchFieldProps) {
  return (
    <div className="documents-label-search-wrap">
      <div className="documents-label-search-field">
        <input
          autoComplete="off"
          maxLength={30}
          name="searchTagValue"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar etiquetas"
          value={value}
        />
        <div className="documents-label-search-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="documents-label-search-svg"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M10.5 4.25C7.04822 4.25 4.25 7.04822 4.25 10.5C4.25 13.9518 7.04822 16.75 10.5 16.75C11.9556 16.75 13.295 16.2524 14.3573 15.418L18.4697 19.5303C18.7626 19.8232 19.2374 19.8232 19.5303 19.5303C19.8232 19.2374 19.8232 18.7626 19.5303 18.4697L15.418 14.3573C16.2524 13.295 16.75 11.9556 16.75 10.5C16.75 7.04822 13.9518 4.25 10.5 4.25ZM5.75 10.5C5.75 7.87665 7.87665 5.75 10.5 5.75C13.1234 5.75 15.25 7.87665 15.25 10.5C15.25 13.1234 13.1234 15.25 10.5 15.25C7.87665 15.25 5.75 13.1234 5.75 10.5Z" />
    </svg>
  );
}
