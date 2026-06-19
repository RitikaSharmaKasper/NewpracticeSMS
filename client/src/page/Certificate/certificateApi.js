import api from "../../config/axiosInstance";

const CERTIFICATE_BASE = "/certificates";

export function getCertificateApiError(error, fallback = "Certificate request failed") {
  return error?.response?.data?.message || error?.message || fallback;
}

export async function fetchCertificateMeta() {
  const response = await api.get(`${CERTIFICATE_BASE}/meta`);
  return response.data?.data || {};
}

export async function fetchCertificateStudents(filters) {
  const response = await api.get(`${CERTIFICATE_BASE}/students`, {
    params: {
      academicYear: filters.academicYear,
      className: filters.className || filters.class,
      section: filters.section,
    },
  });
  return response.data?.data || [];
}

export async function fetchCertificateStudent(studentId) {
  const response = await api.get(`${CERTIFICATE_BASE}/students/${studentId}`);
  return response.data?.data || null;
}

export async function fetchCertificates(params = {}) {
  const response = await api.get(CERTIFICATE_BASE, { params });
  return {
    rows: response.data?.data || [],
    pagination: response.data?.pagination || {
      total: 0,
      page: params.page || 1,
      limit: params.limit || 10,
      totalPages: 0,
    },
  };
}

export async function fetchCertificateById(id) {
  const response = await api.get(`${CERTIFICATE_BASE}/${id}`);
  return response.data?.data || null;
}

export async function fetchCertificateByStudent(studentId, params = {}) {
  const response = await api.get(`${CERTIFICATE_BASE}/student/${studentId}`, {
    params,
  });
  return response.data?.data || null;
}

export async function createCertificate(payload) {
  const response = await api.post(CERTIFICATE_BASE, payload);
  return response.data?.data || null;
}

export async function updateCertificate(id, payload) {
  const response = await api.put(`${CERTIFICATE_BASE}/${id}`, payload);
  return response.data?.data || null;
}

export async function deleteCertificate(id) {
  const response = await api.delete(`${CERTIFICATE_BASE}/${id}`);
  return response.data;
}
