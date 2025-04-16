"use client"; // Required for Next.js to ensure proper execution in the client environment

import { useState, ReactNode, ReactElement } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface SelectProps {
  onValueChange: (value: string) => void;
  children: ReactElement<SelectItemProps>[]; // Ensures only SelectItem components are allowed
  className?: string;
  value?: string; // Allows controlled usage
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

export function Select({ onValueChange, children, className = "", value }: SelectProps) {
  const initialSelectedValue = children.length > 0 ? children[0].props.value : ""; // Ensures valid default
  const [selectedValue, setSelectedValue] = useState(value || initialSelectedValue);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <Listbox value={selectedValue} onChange={handleChange}>
      <div className={`relative w-full ${className}`}>
        <Listbox.Button className="flex justify-between items-center w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none">
          {children.find((child) => child.props.value === selectedValue)?.props.children || selectedValue}
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {children}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export function SelectItem({ value, children }: SelectItemProps) {
  return (
    <Listbox.Option
      value={value}
      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
    >
      {children}
    </Listbox.Option>
  );
}

// ✅ Example Usage (Test in a React Component)
export default function App() {
  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">Select a Value</h2>
      <Select onValueChange={(val) => console.log("Selected:", val)}>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </Select>
    </div>
  );
}
