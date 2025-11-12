import React from "react";

export default function User({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="22"
      viewBox="0 0 16 22"
      fill="none"
      className={className}
    >
      <path
        d="M7.565 9.62C7.465 9.61 7.345 9.61 7.235 9.62C4.855 9.54 2.965 7.59 2.965 5.19C2.965 2.74 4.945 0.75 7.405 0.75C9.855 0.75 11.845 2.74 11.845 5.19C11.835 7.59 9.945 9.54 7.565 9.62Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.565 13.31C0.145 14.93 0.145 17.57 2.565 19.18C5.315 21.02 9.825 21.02 12.575 19.18C14.995 17.56 14.995 14.92 12.575 13.31C9.835 11.48 5.325 11.48 2.565 13.31Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
