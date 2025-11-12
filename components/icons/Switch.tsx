import React from "react";

export default function SwitchIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="21"
            viewBox="0 0 40 21"
            fill="none"
            className={className}
        >
            <path
                d="M29.5625 0H10.3125C4.6255 0 0 4.6255 0 10.3125C0 15.9995 4.6255 20.625 10.3125 20.625H29.5625C35.2495 20.625 39.875 15.9995 39.875 10.3125C39.875 4.6255 35.2495 0 29.5625 0Z"
                fill="#3498DB"
            />
            <path
                d="M29.5625 17.1875C33.3595 17.1875 36.4375 14.1095 36.4375 10.3125C36.4375 6.51554 33.3595 3.4375 29.5625 3.4375C25.7655 3.4375 22.6875 6.51554 22.6875 10.3125C22.6875 14.1095 25.7655 17.1875 29.5625 17.1875Z"
                fill="#ECF0F1"
            />
        </svg>
    );
}
