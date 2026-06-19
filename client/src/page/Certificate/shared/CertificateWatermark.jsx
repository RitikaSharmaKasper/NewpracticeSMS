import { certificateHeaderLogoUrl } from "../../../data/certificateAssets";
import {
  certDocWatermarkImgClass,
  certDocWatermarkWrapClass,
} from "./certificateStyles";

/** Watermark — real img tag so html2canvas captures it in PDF */
export default function CertificateWatermark() {
  return (
    <div className={certDocWatermarkWrapClass} aria-hidden>
      <img
        src={certificateHeaderLogoUrl}
        alt=""
        className={certDocWatermarkImgClass}
      />
    </div>
  );
}
