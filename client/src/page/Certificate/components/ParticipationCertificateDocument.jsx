import React, { useState, useEffect } from "react";
import { DEFAULT_PARTICIPATION_CERTIFICATE_CONTENT } from "../shared/participationCertificateDefaults";

/**
 * Participation Certificate template matched to the Figma reference screenshot.
 * Uses the reference image's natural 1024x723 ratio so top/bottom polygons can
 * be positioned with direct pixel-like coordinates.
 */
function ParticipationCertificateDocument({ student, content, subtitle = "OF PARTICIPATION", signatureUrl }) {
  const [signatureError, setSignatureError] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Convert signature URL to data URL for PDF rendering (avoids CORS issues with html2canvas)
  useEffect(() => {
    if (!signatureUrl) {
      setSignatureDataUrl(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d").drawImage(img, 0, 0);
        setSignatureDataUrl(canvas.toDataURL("image/png"));
      } catch {
        setSignatureDataUrl(signatureUrl);
      }
    };
    img.onerror = () => {
      setSignatureError(true);
    };
    img.src = signatureUrl;
  }, [signatureUrl]);
  const studentName = student?.fullName || "Name Surname";
  const bodyLines = wrapText(getDisplayContent(student, content), 92);

  return (
    <div style={{ width: "100%", aspectRatio: "1024 / 723" }}>
      <svg
        viewBox="0 0 1024 723"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", display: "block" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width="1024" height="723" fill="#ffffff" />

        {/* Top artwork: black and gray bands overlap so no white seam appears. */}
        <polygon points="0,0 596,0 820,84 0,18" fill="#050505" />
        <polygon points="0,18 820,84 0,92" fill="#e8e8e8" />
        <polygon points="592,0 895,0 820,88" fill="#F8B641" />
        <polygon points="895,0 1024,0 864,86 820,88" fill="#050505" />

        {/* Bottom artwork: thin gray strip, continuous black footer, thin gold ribbon. */}
        <polygon points="0,612 548,654 1024,635 1024,656 546,676 0,648" fill="#eeeeee" />
        <polygon points="0,636 546,674 1024,690 1024,723 0,723" fill="#111513" />
        <polygon points="262,723 560,676 450,723" fill="#242424" opacity="0.75" />
        <polygon points="350,666 1024,638 1024,690 548,674" fill="#F8B641" />
        <polygon points="0,636 548,674 450,723 0,723" fill="#111513" />

        {/* Medal and ribbons: scalloped badge with two ribbon tails. */}
        <polygon points="805,122 832,128 812,184 802,154 782,174" fill="#F8B641" />
        <polygon points="838,128 865,122 888,174 868,154 858,184" fill="#F8B641" />
        <polygon
          points="835,58 845,64 857,64 864,74 874,82 872,95 877,106 869,116 866,128 854,132 845,140 835,136 824,140 815,132 803,128 800,116 792,106 797,95 795,82 806,74 813,64 825,64"
          fill="#F8B641"
        />
        <circle cx="835" cy="100" r="28" fill="#F8B641" stroke="#9F883A" strokeWidth="6" opacity="0.95" />
        <circle cx="835" cy="100" r="22" fill="#F8B641" />

        {/* Certificate text block. */}
        <text
          x="515"
          y="166"
          textAnchor="middle"
          fontSize="40"
          fontWeight="700"
          fill="#43504b"
          fontFamily="Arial, Helvetica, sans-serif"
          letterSpacing="15"
        >
          CERTIFICATE
        </text>

        <line x1="300" y1="188" x2="380" y2="188" stroke="#43504b" strokeWidth="3" />
        <text
          x="515"
          y="198"
          textAnchor="middle"
          fontSize="18"
          fill="#555c58"
          fontFamily="Arial, Helvetica, sans-serif"
          letterSpacing="3"
        >
          {subtitle}
        </text>
        <line x1="650" y1="188" x2="730" y2="188" stroke="#43504b" strokeWidth="3" />

        <text
          x="515"
          y="264"
          textAnchor="middle"
          fontSize="16"
          fill="#4d4d4d"
          fontFamily="Arial, Helvetica, sans-serif"
          fontStyle="italic"
          letterSpacing="6"
        >
          THIS CERTIFICATE IS PROUDLY PRESENTED TO
        </text>

        <text
          x="515"
          y="356"
          textAnchor="middle"
          fontSize="66"
          fill="#F8B641"
          fontFamily="'Brush Script MT', 'Segoe Script', Georgia, serif"
          fontStyle="italic"
          fontWeight="400"
        >
          {studentName}
        </text>

        <line x1="315" y1="385" x2="710" y2="385" stroke="#5f5f5f" strokeWidth="2" />

        {bodyLines.map((line, i) => (
          <text
            key={i}
            x="515"
            y={430 + i * 20}
            textAnchor="middle"
            fontSize="15"
            fill="#1f2933"
            fontFamily="Arial, Helvetica, sans-serif"
            fontStyle="italic"
            fontWeight="600"
            letterSpacing="1"
          >
            {line}
          </text>
        ))}

        {signatureDataUrl && !signatureError ? (
          <image
            href={signatureDataUrl}
            x="385"
            y="555"
            height="60"
            preserveAspectRatio="xMidYMid meet"
          />
        ) : null}
        <line x1="370" y1="595" x2="455" y2="595" stroke="#777777" strokeWidth="2" />
        <text
          x="465"
          y="600"
          textAnchor="start"
          fontSize="14"
          fill="#555555"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="600"
        >
          SIGNATURE
        </text>

        <text
          x="600"
          y="588"
          textAnchor="middle"
          fontSize="14"
          fill="#111111"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="600"
        >
          {dateStr}
        </text>
        <line x1="555" y1="595" x2="650" y2="595" stroke="#777777" strokeWidth="2" />
        <text
          x="660"
          y="600"
          textAnchor="start"
          fontSize="14"
          fill="#555555"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="600"
        >
          DATE
        </text>
      </svg>
    </div>
  );
}

function wrapText(text, maxChars) {
  if (!text) return [];
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function getDisplayContent(_student, content) {
  const trimmed = String(content || "").trim();
  return trimmed || DEFAULT_PARTICIPATION_CERTIFICATE_CONTENT;
}

export default ParticipationCertificateDocument;
