import { Ban, Plus, SquarePen, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify";

const TimetableSettings = () => {
  const queryClient = useQueryClient();
  const [editingPeriodIndex, setEditingPeriodIndex] = useState(null);
  const [editingBreakIndex, setEditingBreakIndex] = useState(null);

  const [timeErrors, setTimeErrors] = useState({});

  const isBefore = (start, end) => {
    if (!start || !end) return true;
    return start < end;
  };
  const [periods, setPeriods] = useState([
    {
      period: "Period 1",
      startTime: "",
      endTime: "",
      duration: "",
    },
  ]);

  const [breakPeriods, setBreakPeriods] = useState([
    {
      afterPeriod: "",
      startTime: "",
      endTime: "",
      duration: "",
    },
  ]);

  const handleAddPeriod = () => {
    const last = periods[periods.length - 1];

    const newPeriod = {
      period: `Period ${periods.length + 1}`,
      startTime: last?.endTime || "",
      endTime: "",
      duration: "",
    };

    setPeriods((prev) => [...prev, newPeriod]);
    setEditingPeriodIndex(periods.length);
  };

  const handleBreakChange = (index, field, value) => {
    const updatedBreaks = [...breakPeriods];
    updatedBreaks[index][field] = value;

    const currentBreak = updatedBreaks[index];

    const selectedPeriodIndex = periods.findIndex(
      (p) => p.period === currentBreak.afterPeriod,
    );

    const selectedPeriod = periods[selectedPeriodIndex];
    const nextPeriod = periods[selectedPeriodIndex + 1];

    const errors = { ...timeErrors };

    delete errors[`break-${index}`];

    if (currentBreak.startTime && currentBreak.endTime) {
      if (!isBefore(currentBreak.startTime, currentBreak.endTime)) {
        errors[`break-${index}`] =
          "Lunch end time must be greater than lunch start time.";
      }
    }

    if (selectedPeriod && currentBreak.startTime) {
      if (currentBreak.startTime !== selectedPeriod.endTime) {
        errors[`break-${index}`] =
          `Lunch start time must be same as ${selectedPeriod.period} end time (${selectedPeriod.endTime}).`;
      }
    }

    if (nextPeriod && currentBreak.endTime) {
      if (nextPeriod.startTime !== currentBreak.endTime) {
        errors[`period-${selectedPeriodIndex + 1}`] =
          `${nextPeriod.period} start time must be same as lunch end time (${currentBreak.endTime}).`;
      } else {
        delete errors[`period-${selectedPeriodIndex + 1}`];
      }
    }

    updatedBreaks[index].duration = calculateDuration(
      currentBreak.startTime,
      currentBreak.endTime,
    );

    setTimeErrors(errors);
    setBreakPeriods(updatedBreaks);
  };

  const handleAddBreakPeriod = () => {
    const newIndex = breakPeriods.length;

    const newBreak = {
      afterPeriod: "",
      startTime: "",
      endTime: "",
      duration: "",
    };

    setBreakPeriods((prev) => [...prev, newBreak]);

    // 👇 auto open edit mode
    setEditingBreakIndex(newIndex);
  };

  const handleChange = (index, field, value) => {
    const updated = [...periods];

    updated[index][field] = value;

    // Recalculate current duration
    updated[index].duration = calculateDuration(
      updated[index].startTime,
      updated[index].endTime,
    );

    // Auto update next period start time
    if (field === "endTime" && updated[index + 1]) {
      updated[index + 1].startTime = value;

      updated[index + 1].duration = calculateDuration(
        updated[index + 1].startTime,
        updated[index + 1].endTime,
      );
    }

    const errors = {};

    updated.forEach((period, i) => {
      if (
        period.startTime &&
        period.endTime &&
        period.endTime <= period.startTime
      ) {
        errors[`period-${i}`] =
          `${period.period}: End time must be greater than start time`;
      }

      if (i > 0) {
        const prev = updated[i - 1];

        const breakAfterPrev = breakPeriods.find(
          (brk) => brk.afterPeriod === prev.period,
        );

        const expectedStartTime = breakAfterPrev?.endTime || prev.endTime;

        if (
          period.startTime &&
          expectedStartTime &&
          period.startTime !== expectedStartTime
        ) {
          errors[`period-${i}`] =
            `${period.period}: Start time should be ${expectedStartTime}`;
        }
      }
    });

    setTimeErrors(errors);
    setPeriods(updated);
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "";

    const start = new Date(`2024-01-01T${startTime}`);
    const end = new Date(`2024-01-01T${endTime}`);

    if (end <= start) return "";

    const diff = end - start;
    const minutes = diff / 1000 / 60;

    return minutes.toFixed(0);
  };

  //   hadleSaveSittingsc
  const saveSettingsMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post(
        "/timetable/create-TimeTableSettings",
        payload,
      );

      return res.data;
    },

    onSuccess: (data) => {
      // console.log("Saved Successfully", data);
      toast.success(data?.message || "Saved successfully");

      queryClient.invalidateQueries({
        queryKey: ["timetable-settings"],
      });
    },

    onError: (error) => {
      console.log("Save Error", error);
    },
  });

  // update
  const updateSettingsMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.put("/timetable/update-TimeTableSettings", payload);

      return res.data;
    },

    onSuccess: (data) => {
      // console.log("Updated Successfully", data);
      toast.success(data?.message || "Saved successfully");

      queryClient.invalidateQueries({
        queryKey: ["timetable-settings"],
      });
    },

    onError: (error) => {
      console.log("Update Error", error);
    },
  });

  const deletePeriodMutation = useMutation({
    mutationFn: async (index) => {
      const res = await api.delete(`/timetable/delete-period/${index}`);
      return res.data;
    },
  });

  const handleDeletePeriod = (index) => {
    const updatedPeriods = periods.filter((_, i) => i !== index);

    setPeriods(updatedPeriods);

    deletePeriodMutation.mutate(index);

    // reset edit state to avoid wrong row being in edit mode
    setEditingPeriodIndex(null);
  };

  const deleteBreakMutation = useMutation({
    mutationFn: async (index) => {
      const res = await api.delete(`/timetable/delete-break/${index}`);
      return res.data;
    },

    onSuccess: () => {
      toast.error(data?.message || "Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["timetable-settings"],
      });
    },
  });

  const handleDeleteBreak = (index) => {
    const updatedBreaks = breakPeriods.filter((_, i) => i !== index);

    setBreakPeriods(updatedBreaks);

    deleteBreakMutation.mutate(index);

    setEditingBreakIndex(null);
  };

  // get data
  const { data, isLoading } = useQuery({
    queryKey: ["timetable-settings"],

    queryFn: async () => {
      const res = await api.get("/timetable/get-TimeTableSettings");
      return res.data;
    },
  });
  useEffect(() => {
    if (data?.data) {
      setPeriods(
        data.data.periods.map((p) => {
          const startTime = p.startTime?.slice(0, 5) || "";
          const endTime = p.endTime?.slice(0, 5) || "";

          return {
            ...p,
            startTime,
            endTime,
            duration: calculateDuration(startTime, endTime),
          };
        }),
      );

      setBreakPeriods(
        (data.data.breakPeriods || []).map((b) => ({
          ...b,
          startTime: b.startTime ? b.startTime.slice(0, 5) : "",
          endTime: b.endTime ? b.endTime.slice(0, 5) : "",
        })),
      );
    }
  }, [data]);

  return (
    <div className="border border-[#E6E6E6] rounded-xl p-4">
      <div>
        <p className="text-[#1C1C1C] text-lg font-semibold">
          Timetable Settings
        </p>
        <span className="text-md text-[#9C9C9C]">
          Configure school timing and structure
        </span>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Room Type</p>
          <button
            type="button"
            onClick={handleAddPeriod}
            className="bg-[#0B3142] py-2 px-4 text-white font-semibold rounded-md flex gap-2"
          >
            <Plus /> Add Period
          </button>
        </div>
        <div className="mt-6 overflow-x-auto scrollbar-hide border border-[#E6E6E6] rounded-2xl">
          <table className="w-full border-collapse">
            {/* TABLE HEADER */}
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  Period
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  Start Time
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  End Time
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  Duration
                </th>

                <th className="text-right px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  Action
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {periods.map((item, index) => {
                const isEditing = editingPeriodIndex === index;
                return (
                  <>
                    <tr
                      key={index}
                      className="border-t border-[#E6E6E6] hover:bg-[#FAFAFA] transition"
                    >
                      <td className="px-6 py-4 text-sm  text-[#1C1C1C]">
                        {isEditing ? (
                          <input
                            className="border border-[#97A3D0] w-40 h-9 rounded-lg px-4 py-2 outline-none"
                            type="text"
                            value={item.period}
                            onChange={(e) =>
                              handleChange(index, "period", e.target.value)
                            }
                          />
                        ) : (
                          <p>{item.period}</p>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#696969]">
                        {isEditing ? (
                          <input
                            className="border border-[#97A3D0] h-9 rounded-lg px-4 py-2 outline-none"
                            type="time"
                            // disabled
                            value={item.startTime}
                            onChange={(e) =>
                              handleChange(index, "startTime", e.target.value)
                            }
                          />
                        ) : (
                          <p>
                            {item.startTime ? item.startTime.slice(0, 5) : "--"}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#696969]">
                        {" "}
                        {isEditing ? (
                          <input
                            className="border border-[#97A3D0] h-9 rounded-lg px-4 py-2 outline-none"
                            type="time"
                            value={item.endTime}
                            onChange={(e) =>
                              handleChange(index, "endTime", e.target.value)
                            }
                          />
                        ) : (
                          <p>
                            {item.endTime ? item.endTime.slice(0, 5) : "--"}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#696969]">
                        {" "}
                        <p>{item.duration} Min</p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          <div className="flex justify-end gap-3">
                            <SquarePen
                              onClick={() => {
                                if (isEditing) {
                                  updateSettingsMutation.mutate({
                                    periods,
                                    breakPeriods,
                                  });
                                  setEditingPeriodIndex(null);
                                } else {
                                  setEditingPeriodIndex(index);
                                }
                              }}
                              className="text-[#9C9C9C] h-5 w-5 cursor-pointer"
                            />

                            <Trash2
                              onClick={() => handleDeletePeriod(index)}
                              className="text-[#FF4B4B] h-5 w-5 cursor-pointer"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    {timeErrors[`period-${index}`] && (
                      <div className="flex items-center gap-2 text-[#DC2626] px-3 mb-2">
                        <Ban size={14} />
                        <span className="text-xs">
                          {timeErrors[`period-${index}`]}
                        </span>
                      </div>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-5 text-[16px] font-semibold">
          <p>Lunch Time</p>
        </div>

        <div className="mt-6 overflow-x-auto scrollbar-hide border border-[#E6E6E6] rounded-2xl">
          <table className="w-full border-collapse">
            {/* TABLE HEADER */}
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  After Period
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  Start Time
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  End Time
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  Duration
                </th>

                <th className="text-right px-6 py-4 text-sm font-semibold text-[#1C1C1C]">
                  Action
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {breakPeriods.map((item, index) => {
                const isEditing = editingBreakIndex === index;

                return (
                  <>
                    <tr
                      key={index}
                      className="border-t border-[#E6E6E6] hover:bg-[#FAFAFA] transition"
                    >
                      {/* AFTER PERIOD */}
                      <td className="px-6 py-4 text-sm text-[#1C1C1C]">
                        {isEditing ? (
                          <select
                            className="border border-[#97A3D0] w-40 h-9 rounded-lg px-4 py-2 outline-none"
                            value={item.afterPeriod}
                            onChange={(e) =>
                              handleBreakChange(
                                index,
                                "afterPeriod",
                                e.target.value,
                              )
                            }
                          >
                            <option value="">Select Period</option>

                            {periods.map((periodItem, periodIndex) => (
                              <option
                                key={periodIndex}
                                value={periodItem.period}
                              >
                                {periodItem.period}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <p>{item.afterPeriod}</p>
                        )}
                      </td>

                      {/* START TIME */}
                      <td className="px-6 py-4 text-sm text-[#696969]">
                        {isEditing ? (
                          <input
                            className="border border-[#97A3D0] h-9 rounded-lg px-4 py-2 outline-none"
                            type="time"
                            // disabled
                            value={item.startTime}
                            onChange={(e) =>
                              handleBreakChange(
                                index,
                                "startTime",
                                e.target.value,
                              )
                            }
                          />
                        ) : (
                          <p>
                            {item.startTime ? item.startTime.slice(0, 5) : "--"}
                          </p>
                        )}
                      </td>

                      {/* END TIME */}
                      <td className="px-6 py-4 text-sm text-[#696969]">
                        {isEditing ? (
                          <input
                            className="border border-[#97A3D0] h-9 rounded-lg px-4 py-2 outline-none"
                            type="time"
                            value={item.endTime}
                            onChange={(e) =>
                              handleBreakChange(
                                index,
                                "endTime",
                                e.target.value,
                              )
                            }
                          />
                        ) : (
                          <p>
                            {item.endTime ? item.endTime.slice(0, 5) : "--"}
                          </p>
                        )}
                      </td>

                      {/* DURATION */}
                      <td className="px-6 py-4 text-sm text-[#696969]">
                        <p>{item.duration} Min</p>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <SquarePen
                            onClick={() => {
                              if (isEditing) {
                                updateSettingsMutation.mutate({
                                  periods,
                                  breakPeriods,
                                });

                                setEditingBreakIndex(null);
                              } else {
                                setEditingBreakIndex(index);
                              }
                            }}
                            className="text-[#9C9C9C] h-5 w-5 cursor-pointer"
                          />

                          <Trash2
                            onClick={() => handleDeleteBreak(index)}
                            className="text-[#FF4B4B] h-5 w-5 cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                    {timeErrors[`break-${index}`] && (
                      <div className="flex items-center gap-2 text-[#DC2626] px-3 mb-2">
                        <Ban size={14} />
                        <span className="text-xs">
                          {timeErrors[`break-${index}`]}
                        </span>
                      </div>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={handleAddBreakPeriod}
          className="bg-[#118AB2] py-2 px-4 mt-4 text-white font-semibold rounded-md flex gap-2"
        >
          <Plus />
          Add Break Period
        </button>
        <button
          type="button"
          onClick={() => {
            if (Object.keys(timeErrors).length > 0) {
              toast.error("Please fix timetable timing errors first");
              return;
            }
            saveSettingsMutation.mutate(
              {
                periods,
                breakPeriods,
              },
              {
                onSuccess: () => {
                  setEditingPeriodIndex(null);
                  setEditingBreakIndex(null);
                },
              },
            );
          }}
          className="bg-[#0B3142] w-full py-2 px-4 mt-10 text-white font-semibold rounded-md flex items-center justify-center gap-2"
        >
          <Plus />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default TimetableSettings;
