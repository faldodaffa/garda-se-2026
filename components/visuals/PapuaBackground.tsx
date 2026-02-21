import React from 'react';

export default function PapuaBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-10">
            <svg
                className="absolute inset-0 w-full h-full text-[#FEBD26]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="papua-pattern"
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        patternUnits="userSpaceOnUse"
                    >
                        {/* Placeholder geometric pattern inspired by traditional motifs */}
                        <path
                            d="M0 50 L50 0 L100 50 L50 100 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle cx="50" cy="50" r="10" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#papua-pattern)" />
            </svg>
        </div>
    );
}
