import React from "react";

export default function SocialIcon({ kind }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      {kind === "instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </>
      ) : kind === "steam" ? (
        <>
          <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
          <g stroke="var(--bg)">
            <circle cx="16" cy="8.5" r="3.5" />
            <circle cx="16" cy="8.5" r="1.8" />
            <circle cx="8" cy="16" r="3" />
            <path d="m2.5 12.5 6 3.5m1.5-2 3.5-3m-3 6 5-5" />
          </g>
        </>
      ) : (
        <path
          fill="currentColor"
          stroke="none"
          d="M12 1a11 11 0 0 0-3.48 21.44c.55.1.75-.24.75-.53v-2.05c-3.06.66-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.61-1.22-1.61-1-.69.07-.67.07-.67 1.11.08 1.69 1.13 1.69 1.13.98 1.69 2.58 1.2 3.21.92.1-.71.38-1.2.7-1.47-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.51.22 2.63.11 2.91.71.77 1.13 1.75 1.13 2.95 0 4.23-2.57 5.15-5.02 5.43.39.34.75 1.02.75 2.05v3.02c0 .29.2.64.76.53A11 11 0 0 0 12 1Z"
        />
      )}
    </svg>
  );
}
