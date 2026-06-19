/**
 * Transfer Certificate list — Figma 6620:275739.
 * studentId in list rows may be STUD-0001; preview route uses canonical STU001.
 */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { certificateCardClass } from "./shared/certificateStyles";
import TransferCertificateDeleteModal from "./components/TransferCertificateDeleteModal";
import TransferCertificateListHeader from "./components/TransferCertificateListHeader";
import TransferCertificateTable from "./components/TransferCertificateTable";
import { buildTransferNavStateFromListRow } from "./transferCertificateFlow";
import {
  normalizeStudentId,
} from "./transferCertificateStorage";
import {
  deleteCertificate,
  fetchCertificates,
  getCertificateApiError,
} from "./certificateApi";

function TransferCertificate() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchCertificates({
        certificateType: "transfer",
        page: currentPage,
        limit: itemsPerPage,
        sortBy: "certificateNo",
        sortOrder: "asc",
      });
      setRecords(result.rows);
      setTotalRecords(result.pagination.total || 0);
    } catch (error) {
      setRecords([]);
      setTotalRecords(0);
      toast.error(getCertificateApiError(error, "Failed to load certificates"));
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    refreshRecords();
  }, [refreshRecords]);

  const handleView = (certificateRecord) => {
    const studentId = normalizeStudentId(certificateRecord.studentId);
    navigate(`/certificate/transfer_Certificate/${studentId}`, {
      state: buildTransferNavStateFromListRow(certificateRecord, "view"),
    });
  };

  const handleEdit = (certificateRecord) => {
    navigate("/certificate/transfer_Certificate/create", {
      state: buildTransferNavStateFromListRow(certificateRecord, "edit"),
    });
  };

  const handleDeleteClick = (certificateRecord) => {
    setDeleteTarget(certificateRecord);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCertificate(deleteTarget.id);
      setDeleteTarget(null);
      await refreshRecords();
      toast.success("Transfer certificate removed.");
    } catch (error) {
      toast.error(getCertificateApiError(error, "Could not delete certificate"));
    }
  };

  return (
    <div className={certificateCardClass}>
      <TransferCertificateListHeader
        onCreate={() => navigate("/certificate/transfer_Certificate/search")}
      />

      <TransferCertificateTable
        rows={isLoading ? [] : records}
        total={totalRecords}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(perPage) => {
          setItemsPerPage(perPage);
          setCurrentPage(1);
        }}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <TransferCertificateDeleteModal
        isOpen={Boolean(deleteTarget)}
        tcNo={deleteTarget?.tcNo}
        studentName={deleteTarget?.studentName}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default TransferCertificate;
