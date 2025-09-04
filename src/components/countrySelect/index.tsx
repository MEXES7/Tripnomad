/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { Field, Listbox, ListboxButton } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import clsx from "clsx";
import { Checked, NotChecked } from "../icons/icons";

export type Country = {
  name: string;
  flag: string;
};

type CustomOption = {
  name: string;
  flag: string;
};

type SingleSelectProps = {
  multiple?: false;
  selected: Country | CustomOption | null;
  onChange: (value: Country | null) => void;
  customOptions?: CustomOption[];
};

type MultiSelectProps = {
  multiple: true;
  selected: Country[];
  onChange: (value: Country[]) => void;
  customOptions?: CustomOption[];
};

type Props = SingleSelectProps | MultiSelectProps;

export default function CountrySelector(props: Props) {
  const { multiple = false, selected, onChange, customOptions = [] } = props;
  const [countries, setCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags"
      );

      const data = await res.json();
      const mapped: Country[] = data.map((c: any) => ({
        name: c.name.common,
        flag: c.flags.svg,
      }));
      const sorted = mapped.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(sorted);
      setLoading(false);
    };

    fetchCountries();
  }, []);

  const filtered = useMemo(() => {
    return query === ""
      ? countries
      : countries.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );
  }, [query, countries]);

  const renderSelectedLabel = () => {
    if (multiple) {
      if (Array.isArray(selected) && selected.length > 0) {
        return (
          <div className="flex  gap-2">
            {selected.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-1 bg-[#2C2C2C] text-white px-6 py-4 text-sm rounded-md"
              >
                <span className="text-[1.6rem] font-opensans">{c.name}</span>
                {/* ❌ Cancel button */}
                <span
                  className="ml-1 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();

                    if (props.multiple && Array.isArray(selected)) {
                      const newSelection = selected.filter(
                        (item) => item.name !== c.name
                      );
                      props.onChange(newSelection); // ✅ TS is now satisfied
                    }
                  }}
                >
                  {/* × */}&times;
                </span>
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1  font-opensans px-2 py-1 text-[1.6rem] font-[400] text-[#DBDBDB]">
          Select countries
        </div>
      );
    }

    if (selected && !Array.isArray(selected)) {
      return (
        <div
          key={selected.name}
          className="flex items-center gap-1  font-opensans px-2 py-1 text-[1rem] font-[400]"
        >
          <Image src={selected.flag} alt="flag" width={16} height={16} />
          <span className="text-[1.6rem] font-opensans text-[#000000]">
            {selected.name}
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1  font-opensans px-2 py-1 text-[1.6rem] font-[400] text-[#DBDBDB]">
        Select country
      </div>
    );
  };

  // if (loading) return <renderSelectedLabel />;

  return (
    <div className="w-full ">
      <Field>
        <Listbox
          value={selected}
          onChange={onChange}
          multiple={multiple}
          // customoptions={customOptions}
        >
          {({}) => (
            <div className="relative">
              <ListboxButton
                className="w-full h-[5.5rem] border-[0.1rem] border-[#8E8E8E] rounded-lg p-2 text-left bg-[#f8f8f8] "
                as="button"
                type="button"
              >
                {renderSelectedLabel()}
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-[2rem] right-2.5 size-[2.5rem] fill-black/60 "
                  aria-hidden="true"
                />
              </ListboxButton>

              <Listbox.Options
                as="div"
                className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg border max-h-64 overflow-auto"
              >
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-md bg-[#f8f8f8] border-[0.1rem] border-[#0A4665]"
                    placeholder="Search country..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                {/* List */}
                <ul>
                  {/* Custom Options */}
                  {customOptions.map((opt) => (
                    <Listbox.Option key={opt.name} value={opt} as={Fragment}>
                      {({ active, selected: isSelected }) => (
                        <li
                          className={clsx(
                            "cursor-pointer flex items-center gap-2 p-2",
                            active && "bg-blue-100",
                            isSelected && "font-medium"
                          )}
                        >
                          {" "}
                          {/* ✅ Custom Checkbox Icon */}
                          {/* <Image
                            src={
                              isSelected
                                ? "/assets/checkboxFilled.svg"
                                : "/assets/checkboxEmpty.svg"
                            }
                            width={12}
                            height={12}
                            alt="check icon"
                            className="w-5 h-5"
                          /> */}
                          {isSelected ? <Checked /> : <NotChecked />}
                          <img
                            src={opt.flag}
                            alt="opt"
                            className="w-[1.6rem] h-[1.6rem] rounded-full size-[1.6rem] border-[0.1rem]"
                          />
                          <span className="text-[#6E6E6E] font-opensans text-[1.6rem]">
                            {opt.name}
                          </span>
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                  {filtered.map((country) => (
                    <Listbox.Option
                      key={country.name}
                      value={country}
                      as={Fragment}
                    >
                      {({ active, selected: isSelected }) => (
                        <li
                          className={clsx(
                            "cursor-pointer flex items-center gap-2 p-2",
                            active && "bg-blue-100",
                            isSelected && "font-medium"
                          )}
                        >
                          {/* ✅ Custom Checkbox Icon */}
                          <Image
                            src={
                              isSelected
                                ? "/assets/checkboxFilled.svg"
                                : "/assets/checkboxEmpty.svg"
                            }
                            width={12}
                            height={12}
                            alt="check icon"
                            className="w-5 h-5"
                          />
                          <Image
                            src={country.flag}
                            alt={country.name}
                            width={16}
                            height={16}
                            className="rounded-full size-[1.6rem] border-[0.1rem]"
                          />
                          <span className="text-[#6E6E6E] font-opensans text-[1.6rem]">
                            {country.name}
                          </span>
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </ul>
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      </Field>
    </div>
  );
}
