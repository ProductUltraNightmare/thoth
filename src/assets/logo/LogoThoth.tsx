// LogoThoth.tsx
import React from 'react';
const ThothLogo: React.FC<{ width?: number; height?: number; className?: string }> = ({ width, height, className }) => (
  <svg width={width} height={height} viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8.33789 12H8.32789" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M19.1706 16.9326C19.1706 16.9326 15.5209 18.5875 13.0322 18.5875C4.99544 18.5875 2.72709 9.72763 8.71407 8.11734C13.6311 6.79485 18.8797 17.025 21.3281 20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="9.82812" cy="4.5" r="2.5" stroke="black" stroke-width="2" fill="none"/>
    <path d="M14.3281 18.5V22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M10.3281 18.5V22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M14.3281 6C14.3281 6 13.3281 7 12.3281 7C11.3281 7 8.32812 7 7.32812 7C6.32813 7 5.32812 6 5.32812 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M2.32824 13.9996C2.32824 13.9996 2.32824 12.0003 4.20448 12.0003" stroke="black" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>
);
export default ThothLogo;
