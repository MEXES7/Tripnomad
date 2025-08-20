import { Button } from "@headlessui/react";
import { useModalStore } from "@/store/modalStore";
import styles from "./styles.module.scss";
import { useState } from "react";
import CountrySelector from "@/components/countrySelect";
import DatePicker from "@/components/dateRangePicker";
import { SelectOption, useFormStore } from "@/store/planTripStore";
import { useRouter } from "next/navigation";
import { CloseIcon } from "@/components/icons/icons";

const PlanTrip = () => {
  const {
    formData,
    setDropdownField,
    setPassportCountries,
    setFormData,
    updateDateRange,
  } = useFormStore();
  const router = useRouter();
  const closeModal = useModalStore((state) => state.closeModal);
  const clearForm = useFormStore((state) => state.clearFormData);
  const handleClose = () => {
    closeModal();
    clearForm();
  };
  // Robust handler that guarantees array output
  const handlePassportChange = (selected: unknown) => {
    let countries: SelectOption[] = [];

    if (Array.isArray(selected)) {
      countries = selected;
    } else if (
      selected &&
      typeof selected === "object" &&
      "name" in selected &&
      "flag" in selected
    ) {
      countries = [selected as SelectOption];
    }

    setPassportCountries(countries);
  };

  const handleDatesChange = (
    departure: Date | null,
    returnDate: Date | null
  ) => {
    updateDateRange({
      start: departure,
      end: returnDate,
    });
  };

  const [value, setValue] = useState<number | "">(formData.budget || "");

  const max = 5000000;
  const percent = typeof value === "number" ? (value / max) * 100 : 0;

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    if (val === "" || (typeof val === "number" && val <= max)) {
      setValue(val);
      setFormData({ budget: val === "" ? null : val });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/travel-pick");
    closeModal();
  };
  console.log(formData);
  return (
    <div className="">
      <div className={styles.header}>
        <div className="text-white font-[400]">
          <h1 className="font-montserrat text-[20px]">
            Start Planning Your Trip
          </h1>
          <p className="font-opensans text-[14px]">
            Provide a few details and we will find the best options for you.
          </p>
        </div>
        <button
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          onClick={closeModal}
        >
          <CloseIcon />
        </button>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="px-[2.25rem] py-[2.06rem] space-y-[20px] border-b-[1px] border-[#D6D6D6]">
            {/* Budget Input */}
            <div className="space-y-[6px]">
              <label className="block font-opensans font-[400] text-[1.4rem]">
                What is your total trip budget range*
              </label>
              <div className="flex-col items-center space-y-[4px]">
                <input
                  type="number"
                  placeholder="$00.00"
                  value={value}
                  onChange={handleBudgetChange}
                  className="w-full h-[5.5rem] bg-[#f8f8f8] border-[1px] border-[#8E8E8E] rounded-md text-start font-opensans text-[1.6rem] text-[#211408] placeholder-[#DBDBDB]
                  appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                  [&::-webkit-outer-spin-button]:appearance-none"
                />
                <input
                  type="range"
                  min={0}
                  max={max}
                  value={value === "" ? 0 : value}
                  readOnly
                  className={styles.slider}
                  style={{
                    background: `linear-gradient(to right, #05393A ${percent}%, #E5E5E5 ${percent}%)`,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* Passport Country */}
            <div>
              <label className="text-[1.4rem] font-medium font-opensans space-y-[0.6rem]">
                What passport do you hold*{" "}
              </label>
              <CountrySelector
                multiple
                selected={
                  Array.isArray(formData.passport) ? formData.passport : []
                }
                onChange={handlePassportChange}
              />
            </div>

            {/* Visa Country */}
            <div>
              <h2 className="text-[1.4rem] font-medium font-opensans space-y-[0.6rem]">
                What countrys visa do you already have?
              </h2>
              <CountrySelector
                selected={formData.visaType}
                onChange={(value) => setDropdownField("visaType", value)}
              />
            </div>

            {/* Departure Country */}
            <div>
              <h2 className="text-[1.4rem] font-medium font-opensans space-y-[0.6rem]">
                Where are you leaving from*
              </h2>
              <CountrySelector
                selected={formData.departure}
                onChange={(value) => setDropdownField("departure", value)}
              />
            </div>

            {/* Destination Country */}
            <div>
              <h2 className="text-[1.4rem] font-medium font-opensans space-y-[0.6rem]">
                Where are you travelling to?
              </h2>
              <CountrySelector
                selected={formData.destination}
                onChange={(value) => setDropdownField("destination", value)}
                customOptions={[
                  {
                    name: "Anywhere",
                    flag: "/assets/globe.svg",
                  },
                ]}
              />
            </div>

            {/* Travel Dates */}
            <div>
              <h2 className="text-[1.4rem] font-medium font-opensans space-y-[0.6rem]">
                Travel Date
              </h2>
              <DatePicker
                width="w-[65rem]"
                height="py-[5.5rem]"
                dropdownHeight="h-[5.5rem]"
                dropdownWidth="w-[63rem]"
                initialDeparture={
                  formData.dateRange.start
                    ? new Date(formData.dateRange.start) // Convert string to Date
                    : null
                }
                initialReturn={
                  formData.dateRange.end
                    ? new Date(formData.dateRange.end) // Convert string to Date
                    : null
                }
                onDatesChange={handleDatesChange}
              />
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-center p-[2.4rem] bg-[#FFFFFF] w-[70.3rem]">
            <div className="flex gap-[1.6rem]">
              <Button
                type="button"
                onClick={handleClose}
                className="border-[1px] border-[#3AA5A8] w-[29.2rem] rounded px-[7.56rem] py-4 text-[1.6rem] font-semibold text-[#3AA5A8] font-urbanist"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded bg-[#3AA5A8] px-[6.34rem] w-[29.2rem] py-4 text-[1.6rem] font-semibold text-white font-urbanist"
                onClick={handleSubmit}
              >
                Plan My Trip
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanTrip;
