import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchCertificateMeta, getCertificateApiError } from "../certificateApi";

const EMPTY_SCHOOL = {
  name: "",
  address: "",
  contact: "",
};

const EMPTY_META = {
  academicYears: [],
  classes: [],
  sections: [],
  school: EMPTY_SCHOOL,
};

export function useCertificateMeta() {
  const [meta, setMeta] = useState(EMPTY_META);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadMeta() {
      setIsLoading(true);
      try {
        const data = await fetchCertificateMeta();
        if (!isActive) return;
        setMeta({
          academicYears: data.academicYears || [],
          classes: data.classes || [],
          sections: data.sections || [],
          school: {
            name: data.school?.name || "",
            address: data.school?.address || "",
            contact: data.school?.contact || "",
          },
        });
      } catch (error) {
        if (!isActive) return;
        setMeta(EMPTY_META);
        toast.error(getCertificateApiError(error, "Failed to load certificate filters"));
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadMeta();
    return () => {
      isActive = false;
    };
  }, []);

  return { ...meta, isLoading };
}
