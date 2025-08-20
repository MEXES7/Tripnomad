import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface DayObject {
  day: string;
  date: Date;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
}

interface Errors {
  departure: boolean;
  return: boolean;
}

interface PriceData {
  [key: string]: string;
}

interface DatePickerProps {
  width?: string;
  height?: string;
  dropdownWidth?: string;
  dropdownHeight?: string;
  className?: string;
  initialDeparture?: Date | null;
  initialReturn?: Date | null;
  onDatesChange: (departure: Date | null, returnDate: Date | null) => void;
}
const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date: Date | null): string => {
  // Add validation
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return "";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = days[date.getDay()];
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()].substring(0, 3);
  const year = date.getFullYear();
  return `${dayName}, ${day} ${month} ${year}`;
};

const DatePicker: React.FC<DatePickerProps> = ({
  width = "w-full max-w-lg",
  dropdownWidth = "w-full",
  dropdownHeight = "max-h-96",
  className = "",
  initialDeparture = null,
  initialReturn = null,
  onDatesChange,
}) => {
  const today = new Date();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [departureDate, setDepartureDate] = useState<Date | null>(
    initialDeparture
  );
  const [returnDate, setReturnDate] = useState<Date | null>(initialReturn);

  // Sync with external changes
  useEffect(() => {
    setDepartureDate(initialDeparture);
  }, [initialDeparture]);

  useEffect(() => {
    setReturnDate(initialReturn);
  }, [initialReturn]);

  const handleDateClick = (dayObj: DayObject, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;

    let newDeparture = departureDate;
    let newReturn = returnDate;

    if (activeInput === "departure") {
      newDeparture = dayObj.date;
      if (returnDate && returnDate <= dayObj.date) {
        newReturn = null;
      }
      setActiveInput("return");
    } else {
      if (departureDate && dayObj.date > departureDate) {
        newReturn = dayObj.date;
      }
    }

    setDepartureDate(newDeparture);
    setReturnDate(newReturn);
    onDatesChange(newDeparture, newReturn); // Notify parent
  };
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [activeInput, setActiveInput] = useState<"departure" | "return">(
    "departure"
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<Errors>({
    departure: false,
    return: false,
  });
  const [dropdownPosition, setDropdownPosition] = useState<"down" | "up">(
    "down"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const weekDays: string[] = ["m", "t", "w", "t", "f", "s", "s"];

  // Sample price data for demonstration
  const priceData: PriceData = {
    "2025-6-2": "573 - 905 Huf",
    "2025-6-15": "420 - 680 Huf",
    "2025-6-20": "350 - 590 Huf",
    "2025-7-5": "680 - 920 Huf",
    "2025-7-12": "445 - 720 Huf",
  };

  const calculateDropdownPosition = (): void => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 400; // Approximate dropdown height

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    // If there's not enough space below and more space above, show dropdown up
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      setDropdownPosition("up");
    } else {
      setDropdownPosition("down");
    }
  };

  const handleToggleDropdown = (): void => {
    if (!isOpen) {
      calculateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const getDaysInMonth = (date: Date): DayObject[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days: DayObject[] = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonth = new Date(year, month, 0);
      const prevDay = prevMonth.getDate() - firstDayOfWeek + i + 1;
      days.push({
        day: prevDay.toString().padStart(2, "0"),
        date: new Date(year, month - 1, prevDay),
        isCurrentMonth: false,
        isPrevMonth: true,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day: day.toString().padStart(2, "0"),
        date: new Date(year, month, day),
        isCurrentMonth: true,
        isPrevMonth: false,
      });
    }

    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day: day.toString().padStart(2, "0"),
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isPrevMonth: false,
      });
    }

    return days;
  };

  const navigateMonth = (direction: number): void => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isDateSelected = (date: Date): boolean => {
    if (!date) return false;
    const dateStr = date.toDateString();
    return Boolean(
      (departureDate && departureDate.toDateString() === dateStr) ||
        (returnDate && returnDate.toDateString() === dateStr)
    );
  };

  const isDateInRange = (date: Date): boolean => {
    if (!departureDate || !returnDate || !date) return false;
    return date > departureDate && date < returnDate;
  };

  const isDateDisabled = (dayObj: DayObject): boolean => {
    if (!dayObj || !dayObj.isCurrentMonth) return true;

    // For departure: disable dates before today
    if (activeInput === "departure") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateToCheck = new Date(dayObj.date);
      dateToCheck.setHours(0, 0, 0, 0);
      return dateToCheck < today;
    }

    // For return: disable dates before or equal to departure date
    if (activeInput === "return" && departureDate) {
      const departureDateOnly = new Date(departureDate);
      departureDateOnly.setHours(0, 0, 0, 0);
      const dateToCheck = new Date(dayObj.date);
      dateToCheck.setHours(0, 0, 0, 0);
      return dateToCheck <= departureDateOnly;
    }

    return false;
  };

  const getPriceForDate = (date: Date): string | undefined => {
    const key = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    return priceData[key];
  };

  const getDisplayText = (): string | React.ReactNode => {
    if (departureDate && returnDate) {
      return `${formatDate(departureDate)} - ${formatDate(returnDate)}`;
    } else if (departureDate) {
      return `${formatDate(departureDate)} - Return date`;
    } else {
      return (
        <div className="flex items-center gap-1  font-opensans px-2 py-1 text-[1rem] font-[400] text-[#DBDBDB]">
          Select date
        </div>
      );
    }
  };

  const renderCalendar = (monthOffset: number = 0) => {
    const displayMonth = new Date(currentMonth);
    displayMonth.setMonth(displayMonth.getMonth() + monthOffset);
    const days = getDaysInMonth(displayMonth);

    return (
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          {monthOffset === 0 && (
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          )}
          {monthOffset === 0 && <div className="w-6" />}

          <h3 className="text-sm font-medium text-gray-900">
            {months[displayMonth.getMonth()]} {displayMonth.getFullYear()}
          </h3>

          {monthOffset === 1 && <div className="w-6" />}
          {monthOffset === 1 && (
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="text-center text-xs text-gray-500 py-2 font-medium"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 relative">
          {days.map((dayObj, index) => {
            const isSelected = isDateSelected(dayObj.date);
            const isInRange = isDateInRange(dayObj.date);
            const hasPrice = getPriceForDate(dayObj.date);
            const isHovered =
              hoveredDate &&
              hoveredDate.toDateString() === dayObj.date.toDateString();
            const disabled = isDateDisabled(dayObj);

            return (
              <div key={index} className="relative pl-4">
                <button
                  onClick={() => handleDateClick(dayObj, dayObj.isCurrentMonth)}
                  onMouseEnter={() =>
                    dayObj.isCurrentMonth &&
                    !disabled &&
                    setHoveredDate(dayObj.date)
                  }
                  onMouseLeave={() => setHoveredDate(null)}
                  disabled={disabled}
                  type="button"
                  className={`
                    h-8 w-8 text-sm rounded-md flex  items-center justify-center relative
                    ${
                      dayObj.isCurrentMonth
                        ? disabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-900 hover:bg-gray-100 cursor-pointer"
                        : "text-gray-300"
                    }
                    ${
                      isSelected
                        ? "bg-[#064244] rounded-2xl text-white hover:bg-[#064244]"
                        : ""
                    }
                    ${isInRange ? "bg-blue-50" : ""}
                    transition-colors duration-150
                  `}
                >
                  {dayObj.day}
                </button>

                {/* Price tooltip */}
                {isHovered &&
                  hasPrice &&
                  dayObj.isCurrentMonth &&
                  !disabled && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 z-10">
                      <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {hasPrice}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-blue-500"></div>
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`${width} ${className}`}>
      {/* Travel Date Label */}
      {/* <label className="block text-sm font-medium text-gray-700 mb-2">
        Travel Date
      </label> */}

      {/* Main Dropdown Trigger */}
      <div className="relative" ref={dropdownRef}>
        <button
          ref={triggerRef}
          onClick={handleToggleDropdown}
          type="button"
          className={`${dropdownWidth} px-4 py-[1.5rem]  border-[1px] border-[#8E8E8E] rounded-lg text-left flex items-center justify-between hover:bg-gray-100 transition-colors ${
            errors.departure || errors.return
              ? "border-red-300 bg-red-50"
              : "border-[#8E8E8E] bg-transparent"
          }`}
        >
          <span
            className={`font-opensans text-[1.6rem]
              ${departureDate && returnDate ? "text-gray-900" : "text-gray-400"}

            `}
          >
            {getDisplayText()}
          </span>
          <ChevronDown
            className={`w-[2.5rem] h-[2.5rem] text-[#211408]  transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Calendar Dropdown */}
        {isOpen && (
          <div
            className={`
            absolute left-0 right-0 mt-2 bg-white border h-[35rem] border-gray-200 rounded-lg shadow-lg z-50 ${dropdownHeight} overflow-auto
            ${dropdownPosition === "up" ? "bottom-full mb-2 mt-0" : "top-full"}
          `}
          >
            {/* Date Input Fields */}
            <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div
                    onClick={() => setActiveInput("departure")}
                    className={`
                      px-3 py-2 border-[#C3E0FF] border-[0.1rem] w-[24.3rem] h-[5.2rem] rounded-md cursor-pointer text-sm relative
                      ${
                        activeInput === "departure"
                          ? "border-blue-500 bg-blue-50"
                          : errors.departure
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white"
                      }
                    `}
                  >
                    <label className="block text-[1rem] text-[#838383] font-opensans  mb-1">
                      Departure
                    </label>
                    <span
                      className={`text-[1.4rem] font-opensans
                        ${departureDate ? "text-[#2A2A2A]" : "text-red-500"}`}
                    >
                      {departureDate ? formatDate(departureDate) : "Required *"}
                    </span>
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => setActiveInput("return")}
                    className={`
                      px-3 py-2 border-[#C3E0FF] border-[0.1rem] w-[24.3rem] h-[5.2rem] rounded-md cursor-pointer text-sm relative
                      ${
                        activeInput === "return"
                          ? "border-blue-500 bg-blue-50"
                          : errors.return
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white"
                      }
                    `}
                  >
                    {" "}
                    <label className="block text-[1rem] text-[#838383] font-opensans mb-1">
                      Return
                    </label>
                    <span
                      className={`${
                        returnDate ? "text-[#2A2A2A]" : "text-red-500"
                      } text-[1.4rem] font-opensans`}
                    >
                      {returnDate ? formatDate(returnDate) : "Required *"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              <div className="flex gap-8 min-w-max">
                {renderCalendar(0)}
                {renderCalendar(1)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
