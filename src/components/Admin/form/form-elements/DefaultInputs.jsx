import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import DatePicker from "../date-picker";

// ✅ MDI
import Icon from "@mdi/react";
import {
  mdiEye,
  mdiEyeOff,
  mdiClockOutline,
  mdiCreditCardOutline,
} from "@mdi/js";

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);

  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <ComponentCard title="Default Inputs">
      <div className="space-y-6">
        {/* TEXT INPUT */}
        <div>
          <Label htmlFor="inputx">Input</Label>
          <Input type="text" id="inputx" />
        </div>

        {/* PLACEHOLDER INPUT */}
        <div>
          <Label htmlFor="inputTwo1">Input with Placeholder</Label>
          <Input type="text" id="inputTwo1" placeholder="info@gmail.com" />
        </div>

        {/* SELECT */}
        <div>
          <Label>Select Input</Label>
          <Select
            options={options}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
            >
              <Icon
                path={showPassword ? mdiEye : mdiEyeOff}
                size={1}
                className="text-gray-500 dark:text-gray-400"
              />
            </button>
          </div>
        </div>

        {/* DATE PICKER */}
        <div>
          <DatePicker
            id="date-picker1"
            label="Date Picker Input"
            placeholder="Select a date"
            onChange={(dates, currentDateString) => {
              console.log({ dates, currentDateString });
            }}
          />
        </div>

        {/* TIME PICKER */}
        <div>
          <Label htmlFor="tm">Time Picker Input</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <Icon path={mdiClockOutline} size={1.1} />
            </span>
          </div>
        </div>

        {/* PAYMENT INPUT */}
        <div>
          <Label>Input with Payment</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Card number"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
              <Icon path={mdiCreditCardOutline} size={1.2} />
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
