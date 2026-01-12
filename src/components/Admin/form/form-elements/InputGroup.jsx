import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import PhoneInput from "../group-input/PhoneInput";

// ✅ MDI
import Icon from "@mdi/react";
import { mdiEmailOutline } from "@mdi/js";

export default function InputGroup() {
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];

  const handlePhoneNumberChange = (phoneNumber) => {
    console.log("Updated phone number:", phoneNumber);
  };

  return (
    <ComponentCard title="Input Group">
      <div className="space-y-6">
        {/* EMAIL INPUT */}
        <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="text"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <Icon path={mdiEmailOutline} size={1.2} />
            </span>
          </div>
        </div>

        {/* PHONE INPUT (SELECT START) */}
        <div>
          <Label>Phone</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>

        {/* PHONE INPUT (SELECT END) */}
        <div>
          <Label>Phone</Label>
          <PhoneInput
            selectPosition="end"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
