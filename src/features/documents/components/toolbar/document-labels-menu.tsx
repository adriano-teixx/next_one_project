import { Plus, Settings } from "lucide-react";

type DocumentLabelsMenuProps = {
  items: string[];
  showNoSelectionHint: boolean;
};

export function DocumentLabelsMenu({
  items,
  showNoSelectionHint,
}: DocumentLabelsMenuProps) {
  return (
    <div className="documents-labels-menu">
      {showNoSelectionHint ? <DocumentLabelsNoSelection /> : null}
      <ul className="documents-labels-menu-list">
        {items.map((item) => (
          <li className="documents-labels-menu-item" key={item}>
            {item === "Gerenciar etiquetas" ? (
              <a
                className="documents-labels-menu-action"
                href="https://app.qive.com.br/tag/list"
                rel="noreferrer"
                target="_blank"
              >
                <Settings aria-hidden size={24} />
                <span>{item}</span>
              </a>
            ) : (
              <button className="documents-labels-menu-action" type="button">
                <Plus aria-hidden size={24} />
                <span>{item}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DocumentLabelsNoSelection() {
  return (
    <div className="documents-labels-no-selection">
      <TagNoSelectionIcon />
      <h4>Procurando suas etiquetas?</h4>
      <p>Primeiro, selecione algum documento da sua listagem.</p>
    </div>
  );
}

function TagNoSelectionIcon() {
  return (
    <svg
      fill="none"
      height="64"
      viewBox="0 0 64 64"
      width="64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#tag-no-selected_svg__a)">
        <rect
          fill="url(#tag-no-selected_svg__b)"
          height="28"
          rx="6"
          width="64"
          y="3"
        />
        <rect
          fill="url(#tag-no-selected_svg__c)"
          height="28"
          rx="6"
          width="64"
          y="33"
        />
        <rect
          fill="#fff"
          height="24"
          opacity="0.5"
          rx="7"
          width="24"
          x="2"
          y="5"
        />
        <rect fill="#fff" height="20" rx="6" width="20" x="4" y="7" />
        <rect fill="#6E8AFB" height="16" rx="4.8" width="16" x="6" y="9" />
        <path
          clipRule="evenodd"
          d="M16.966 14.834a.8.8 0 0 1 0 1.132l-3.2 3.2a.8.8 0 0 1-1.132 0l-1.6-1.6a.8.8 0 0 1 1.132-1.132L13.2 17.47l2.634-2.635a.8.8 0 0 1 1.132 0"
          fill="#fff"
          fillRule="evenodd"
        />
        <rect
          fill="#fff"
          height="14.8"
          rx="4.2"
          width="14.8"
          x="6.6"
          y="39.6"
        />
        <rect
          height="14.8"
          rx="4.2"
          stroke="#ABBCFF"
          strokeWidth="1.2"
          width="14.8"
          x="6.6"
          y="39.6"
        />
        <rect
          fill="#ABBCFC"
          height="4"
          opacity="0.5"
          rx="2"
          width="24"
          x="28"
          y="15"
        />
        <rect
          fill="#ABBCFC"
          height="4"
          opacity="0.5"
          rx="2"
          width="24"
          x="28"
          y="45"
        />
        <path
          d="m29.896 32.87 4.33-1.54 1.41-.5-1.312-.722-14-7.698-1.375-.756.4 1.518 4.082 15.446.383 1.448.828-1.248 2.54-3.828 3.085 3.948.414.53.53-.414 1.654-1.292.53-.414-.415-.53z"
          fill="#6E8AFB"
          stroke="#fff"
          strokeWidth="1.345"
        />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="tag-no-selected_svg__b"
          x1="0"
          x2="64"
          y1="17"
          y2="17"
        >
          <stop offset="0.43" stopColor="#EDF0FF" />
          <stop offset="1" stopColor="#EDF0FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="tag-no-selected_svg__c"
          x1="0"
          x2="64"
          y1="47"
          y2="47"
        >
          <stop offset="0.43" stopColor="#EDF0FF" />
          <stop offset="1" stopColor="#EDF0FF" stopOpacity="0" />
        </linearGradient>
        <clipPath id="tag-no-selected_svg__a">
          <path d="M0 0h64v64H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
