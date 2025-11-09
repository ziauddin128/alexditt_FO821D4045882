import React from "react";

interface IconProps {
    className?: string;
    size?: number | string;
}

export default function PlusIcon({ className, size = 24 }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
            <path d="M6.75 0.75V12.75M12.75 6.75L0.75 6.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}