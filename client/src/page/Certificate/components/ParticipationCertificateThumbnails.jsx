import React from "react";

/**
 * Thumbnail SVG previews for Participation Certificate template selection.
 * Active template matches Figma 6620:276099 / 6620:276520.
 */

export function CertificateTemplate1Thumbnail({ subtitle = "OF PARTICIPATION" }) {
  return (
    <svg
      viewBox="0 0 1024 723"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="1024" height="723" fill="#FFFFFF" />

      <polygon points="0,0 596,0 820,84 0,18" fill="#050505" />
      <polygon points="0,18 820,84 0,92" fill="#e8e8e8" />
      <polygon points="592,0 895,0 820,88" fill="#F8B641" />
      <polygon points="895,0 1024,0 864,86 820,88" fill="#050505" />

      <polygon points="0,612 548,654 1024,635 1024,656 546,676 0,648" fill="#eeeeee" />
      <polygon points="0,636 546,674 1024,690 1024,723 0,723" fill="#111513" />
      <polygon points="262,723 560,676 450,723" fill="#242424" opacity="0.75" />
      <polygon points="350,666 1024,638 1024,690 548,674" fill="#F8B641" />
      <polygon points="0,636 548,674 450,723 0,723" fill="#111513" />

      <polygon points="805,122 832,128 812,184 802,154 782,174" fill="#F8B641" />
      <polygon points="838,128 865,122 888,174 868,154 858,184" fill="#F8B641" />
      <polygon
        points="835,58 845,64 857,64 864,74 874,82 872,95 877,106 869,116 866,128 854,132 845,140 835,136 824,140 815,132 803,128 800,116 792,106 797,95 795,82 806,74 813,64 825,64"
        fill="#F8B641"
      />
      <circle cx="835" cy="100" r="28" fill="#F8B641" stroke="#9F883A" strokeWidth="6" opacity="0.95" />
      <circle cx="835" cy="100" r="22" fill="#F8B641" />

      <text
        x="515"
        y="166"
        textAnchor="middle"
        fill="#43504b"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="40"
        fontWeight="700"
        letterSpacing="15"
      >
        CERTIFICATE
      </text>

      <line x1="300" y1="188" x2="380" y2="188" stroke="#43504b" strokeWidth="3" />
      <text x="515" y="198" textAnchor="middle" fill="#555c58" fontFamily="Arial, Helvetica, sans-serif" fontSize="18" letterSpacing="3">
        {subtitle}
      </text>
      <line x1="650" y1="188" x2="730" y2="188" stroke="#43504b" strokeWidth="3" />

      <text x="515" y="264" textAnchor="middle" fill="#4d4d4d" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fontStyle="italic" letterSpacing="6">
        THIS CERTIFICATE IS PROUDLY PRESENTED TO
      </text>

      <text
        x="515"
        y="356"
        textAnchor="middle"
        fill="#F8B641"
        fontFamily="'Brush Script MT', 'Segoe Script', Georgia, serif"
        fontSize="66"
        fontStyle="italic"
      >
        Name Surname
      </text>

      <line x1="315" y1="385" x2="710" y2="385" stroke="#5f5f5f" strokeWidth="2" />

      <text x="515" y="430" textAnchor="middle" fill="#1f2933" fontFamily="Arial, Helvetica, sans-serif" fontSize="15" fontStyle="italic" fontWeight="600" letterSpacing="1">
        Son/daughter of [Parent Name], student of Class (Class), Student ID [Student ID]
      </text>
      <text x="515" y="450" textAnchor="middle" fill="#1f2933" fontFamily="Arial, Helvetica, sans-serif" fontSize="15" fontStyle="italic" fontWeight="600" letterSpacing="1">
        participated in Annual day 2026 held on 05-01-2026 as 100m Race.
      </text>

      <line x1="382" y1="595" x2="458" y2="595" stroke="#777777" strokeWidth="2" />
      <text x="500" y="600" textAnchor="middle" fill="#111111" fontFamily="Arial, Helvetica, sans-serif" fontSize="10" fontWeight="600">SIGNATURE</text>
      <line x1="548" y1="595" x2="610" y2="595" stroke="#777777" strokeWidth="2" />
      <text x="580" y="590" textAnchor="middle" fill="#111111" fontFamily="Arial, Helvetica, sans-serif" fontSize="10" fontWeight="600">08/05/2018</text>
      <text x="642" y="600" textAnchor="middle" fill="#111111" fontFamily="Arial, Helvetica, sans-serif" fontSize="10" fontWeight="600">DATE</text>
    </svg>
  );
}
