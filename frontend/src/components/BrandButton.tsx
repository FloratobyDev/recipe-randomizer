import React from "react";

type Props = {
  label: string;
  onClick: () => void;
};

function BrandButton({ label, onClick }: Props) {
  return (
    <div className="px-2 py-0.5 text-primary bg-background flex gap-x-2 text-sm rounded-md items-center select-none">
      <p className="capitalize">{label}</p>
      <svg
        className="cursor-pointer"
        onClick={onClick}
        width="10"
        height="10" 
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.89321 2.12371L9.41794 1.58783L8.36849 0.516077L7.84376 1.05195L5.02755 3.92802L2.21133 1.05195L1.6866 0.516077L0.637154 1.58783L1.16188 2.12371L3.9781 4.99978L1.16144 7.87629L0.636715 8.41217L1.68617 9.48392L2.21089 8.94804L5.02755 6.07153L7.8442 8.94804L8.36893 9.48392L9.41838 8.41217L8.89365 7.87629L6.077 4.99978L8.89321 2.12371Z"
          fill="#FEFFED"
        />
      </svg>
    </div>
  );
}

export default BrandButton;
