"use client";

import { useEffect, useState } from "react";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export default function AnimatedLogo({ size = 40, className = "" }: AnimatedLogoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animated-logo ${mounted ? "animated-logo--active" : ""} ${className}`}
      aria-label="Creole Knowledge Portal Logo"
    >
      <defs>
        {/* Gradient for the book */}
        <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8A020" />
          <stop offset="100%" stopColor="#D4891A" />
        </linearGradient>

        {/* Gradient for the knowledge network */}
        <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8A020">
            <animate attributeName="stop-color" values="#E8A020;#F0B840;#E8A020" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#D4891A">
            <animate attributeName="stop-color" values="#D4891A;#E8A020;#D4891A" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Gradient for the wreath leaves */}
        <linearGradient id="leafGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#40916C" />
        </linearGradient>
        <linearGradient id="leafGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#40916C" />
        </linearGradient>

        {/* Feather gradients */}
        <linearGradient id="featherLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D1408" />
          <stop offset="100%" stopColor="#6B1E14" />
        </linearGradient>
        <linearGradient id="featherRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3D1408" />
          <stop offset="100%" stopColor="#6B1E14" />
        </linearGradient>

        {/* Glow filter for the knowledge center */}
        <filter id="knowledgeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft shadow for the book */}
        <filter id="bookShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#3D1408" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* === WREATH - Left Leaf Arc === */}
      <g className="logo-leaf logo-leaf--left">
        <path
          d="M30 85 C15 70, 12 50, 20 35 C25 28, 28 22, 35 18"
          stroke="url(#leafGradientLeft)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Leaf shapes along the left arc */}
        <ellipse cx="22" cy="72" rx="8" ry="4" fill="url(#leafGradientLeft)" transform="rotate(-30 22 72)" opacity="0.9" />
        <ellipse cx="17" cy="58" rx="8" ry="4" fill="url(#leafGradientLeft)" transform="rotate(-50 17 58)" opacity="0.85" />
        <ellipse cx="18" cy="44" rx="7" ry="3.5" fill="url(#leafGradientLeft)" transform="rotate(-65 18 44)" opacity="0.8" />
        <ellipse cx="24" cy="32" rx="7" ry="3.5" fill="url(#leafGradientLeft)" transform="rotate(-80 24 32)" opacity="0.75" />
        <ellipse cx="34" cy="22" rx="6" ry="3" fill="url(#leafGradientLeft)" transform="rotate(-100 34 22)" opacity="0.7" />
      </g>

      {/* === WREATH - Right Leaf Arc === */}
      <g className="logo-leaf logo-leaf--right">
        <path
          d="M90 85 C105 70, 108 50, 100 35 C95 28, 92 22, 85 18"
          stroke="url(#leafGradientRight)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="98" cy="72" rx="8" ry="4" fill="url(#leafGradientRight)" transform="rotate(30 98 72)" opacity="0.9" />
        <ellipse cx="103" cy="58" rx="8" ry="4" fill="url(#leafGradientRight)" transform="rotate(50 103 58)" opacity="0.85" />
        <ellipse cx="102" cy="44" rx="7" ry="3.5" fill="url(#leafGradientRight)" transform="rotate(65 102 44)" opacity="0.8" />
        <ellipse cx="96" cy="32" rx="7" ry="3.5" fill="url(#leafGradientRight)" transform="rotate(80 96 32)" opacity="0.75" />
        <ellipse cx="86" cy="22" rx="6" ry="3" fill="url(#leafGradientRight)" transform="rotate(100 86 22)" opacity="0.7" />
      </g>

      {/* === LEFT FEATHER === */}
      <g className="logo-feather logo-feather--left">
        <path
          d="M42 18 C38 12, 32 8, 28 15 C24 22, 30 28, 36 24 C32 18, 38 14, 42 18Z"
          fill="url(#featherLeft)"
          opacity="0.9"
        />
        <path
          d="M42 18 L45 10 C43 6, 38 4, 35 8 L42 18Z"
          fill="#3D1408"
          opacity="0.7"
        />
      </g>

      {/* === RIGHT FEATHER === */}
      <g className="logo-feather logo-feather--right">
        <path
          d="M78 18 C82 12, 88 8, 92 15 C96 22, 90 28, 84 24 C88 18, 82 14, 78 18Z"
          fill="url(#featherRight)"
          opacity="0.9"
        />
        <path
          d="M78 18 L75 10 C77 6, 82 4, 85 8 L78 18Z"
          fill="#3D1408"
          opacity="0.7"
        />
      </g>

      {/* === OPEN BOOK === */}
      <g className="logo-book" filter="url(#bookShadow)">
        {/* Left page */}
        <path
          d="M36 72 L36 90 C36 92, 38 94, 40 94 L58 94 L58 76 C58 74, 56 72, 54 72 L36 72Z"
          fill="url(#bookGradient)"
          opacity="0.95"
        />
        {/* Right page */}
        <path
          d="M62 76 L62 94 L80 94 C82 94, 84 92, 84 90 L84 72 L66 72 C64 72, 62 74, 62 76Z"
          fill="url(#bookGradient)"
          opacity="0.85"
        />
        {/* Book spine */}
        <path
          d="M58 76 L60 72 L62 76 L60 94 L58 94Z"
          fill="#D4891A"
          opacity="0.6"
        />
        {/* Page lines - left */}
        <line x1="40" y1="78" x2="54" y2="78" stroke="#FFF9F0" strokeWidth="0.8" opacity="0.4" />
        <line x1="40" y1="82" x2="54" y2="82" stroke="#FFF9F0" strokeWidth="0.8" opacity="0.3" />
        <line x1="40" y1="86" x2="54" y2="86" stroke="#FFF9F0" strokeWidth="0.8" opacity="0.25" />
        {/* Page lines - right */}
        <line x1="66" y1="80" x2="80" y2="80" stroke="#FFF9F0" strokeWidth="0.8" opacity="0.4" />
        <line x1="66" y1="84" x2="80" y2="84" stroke="#FFF9F0" strokeWidth="0.8" opacity="0.3" />
        <line x1="66" y1="88" x2="80" y2="88" stroke="#FFF9F0" strokeWidth="0.8" opacity="0.25" />
      </g>

      {/* === KNOWLEDGE NETWORK (Neural/Molecule pattern) === */}
      <g className="logo-network" filter="url(#knowledgeGlow)">
        {/* Central node */}
        <circle cx="60" cy="48" r="3.5" fill="url(#networkGradient)">
          <animate attributeName="r" values="3.5;4.2;3.5" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Surrounding nodes */}
        <circle cx="48" cy="38" r="2.5" fill="#E8A020" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="72" cy="38" r="2.5" fill="#E8A020" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="44" cy="52" r="2" fill="#E8A020" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="76" cy="52" r="2" fill="#E8A020" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.45;0.8" dur="2.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="52" cy="58" r="2" fill="#E8A020" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.35;0.7" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="68" cy="58" r="2" fill="#E8A020" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="56" cy="32" r="1.8" fill="#E8A020" opacity="0.75">
          <animate attributeName="opacity" values="0.75;0.35;0.75" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="64" cy="32" r="1.8" fill="#E8A020" opacity="0.75">
          <animate attributeName="opacity" values="0.75;0.4;0.75" dur="2.9s" repeatCount="indefinite" />
        </circle>

        {/* Connection lines */}
        <line x1="60" y1="48" x2="48" y2="38" stroke="#E8A020" strokeWidth="1" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="48" x2="72" y2="38" stroke="#E8A020" strokeWidth="1" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.65;0.4" dur="2.3s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="48" x2="44" y2="52" stroke="#E8A020" strokeWidth="0.8" opacity="0.35">
          <animate attributeName="opacity" values="0.35;0.6;0.35" dur="2.6s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="48" x2="76" y2="52" stroke="#E8A020" strokeWidth="0.8" opacity="0.35">
          <animate attributeName="opacity" values="0.35;0.55;0.35" dur="2.4s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="48" x2="52" y2="58" stroke="#E8A020" strokeWidth="0.8" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2.8s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="48" x2="68" y2="58" stroke="#E8A020" strokeWidth="0.8" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.55;0.3" dur="2.1s" repeatCount="indefinite" />
        </line>
        <line x1="48" y1="38" x2="56" y2="32" stroke="#E8A020" strokeWidth="0.6" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="72" y1="38" x2="64" y2="32" stroke="#E8A020" strokeWidth="0.6" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3.3s" repeatCount="indefinite" />
        </line>
        <line x1="56" y1="32" x2="64" y2="32" stroke="#E8A020" strokeWidth="0.6" opacity="0.25">
          <animate attributeName="opacity" values="0.25;0.45;0.25" dur="2.5s" repeatCount="indefinite" />
        </line>
        {/* Cross connections */}
        <line x1="48" y1="38" x2="44" y2="52" stroke="#E8A020" strokeWidth="0.5" opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3.5s" repeatCount="indefinite" />
        </line>
        <line x1="72" y1="38" x2="76" y2="52" stroke="#E8A020" strokeWidth="0.5" opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3.1s" repeatCount="indefinite" />
        </line>
      </g>

      {/* === LIGHT BURST from book center === */}
      <g className="logo-burst" opacity="0.3">
        <path d="M60 68 L55 45 L65 45 Z" fill="#FFF9F0" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.3;0.15" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M60 68 L50 50 L55 48 Z" fill="#FFF9F0" opacity="0.1">
          <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3.5s" repeatCount="indefinite" />
        </path>
        <path d="M60 68 L70 50 L65 48 Z" fill="#FFF9F0" opacity="0.1">
          <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3.2s" repeatCount="indefinite" />
        </path>
      </g>

      {/* === CIRCULAR BORDER === */}
      <circle
        cx="60"
        cy="56"
        r="52"
        stroke="url(#leafGradientLeft)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.15"
        className="logo-border"
      />
    </svg>
  );
}
