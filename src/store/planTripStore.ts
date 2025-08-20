/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { toISODateString } from "@/utils/dateUtils";

export type SelectOption = {
  name: string;
  flag: string;
};

type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type FormData = {
  budget: number | null;
  passport: SelectOption[]; // Changed to array for multiple selection
  visaType: SelectOption | null;
  departure: SelectOption | null;
  destination: SelectOption | null;
  dateRange: DateRange;
};

type FormStore = {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  setDropdownField: (
    field: keyof Pick<FormData, "visaType" | "departure" | "destination">,
    value: SelectOption | null
  ) => void;
  setPassportCountries: (countries: SelectOption[]) => void; // New method for passport
  updateDateRange: (range: Partial<DateRange>) => void;
  clearFormData: () => void;
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: {
        budget: null,
        passport: [], // Initialize as empty array
        visaType: null,
        departure: null,
        destination: null,
        dateRange: {
          start: null,
          end: null,
        },
      },
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setDropdownField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),
      setPassportCountries: (countries) =>
        set((state) => ({
          formData: { ...state.formData, passport: countries },
        })),
      updateDateRange: (range) =>
        set((state) => ({
          formData: {
            ...state.formData,
            dateRange: {
              ...state.formData.dateRange,
              ...range,
            },
          },
        })),
      clearFormData: () =>
        set({
          formData: {
            budget: null,
            passport: [],
            visaType: null,
            departure: null,
            destination: null,
            dateRange: {
              start: null,
              end: null,
            },
          },
        }),
    }),
    {
      name: "trip-form-storage",
      partialize: (state) => ({
        formData: {
          ...state.formData,
          passport: Array.isArray(state.formData.passport)
            ? state.formData.passport
            : [],
          dateRange: {
            start: toISODateString(state.formData.dateRange.start),
            end: toISODateString(state.formData.dateRange.end),
          },
        },
      }),
      storage: createJSONStorage(() => localStorage),
      //   serialize: (state: {
      //     formData: {
      //       dateRange: {
      //         start: { toISOString: () => any };
      //         end: { toISOString: () => any };
      //       };
      //     };
      //   }) => {
      //     const serialized = {
      //       ...state,
      //       formData: {
      //         ...state.formData,
      //         dateRange: {
      //           start: state.formData.dateRange.start?.toISOString() || null,
      //           end: state.formData.dateRange.end?.toISOString() || null,
      //         },
      //       },
      //     };
      //     return JSON.stringify(serialized);
      //   },
      //   deserialize: (str: string) => {
      //     const parsed = JSON.parse(str);
      //     return {
      //       ...parsed,
      //       formData: {
      //         ...parsed.formData,
      //         dateRange: {
      //           start: parsed.formData.dateRange.start
      //             ? new Date(parsed.formDate.dateRange.start)
      //             : null, // Fix typo here
      //           end: parsed.formData.dateRange.end
      //             ? new Date(parsed.formData.dateRange.end)
      //             : null,
      //         },
      //       },
      //     };
      //   },
    }
  )
);
