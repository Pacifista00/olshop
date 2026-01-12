import Icon from "@mdi/react";
import {
  mdiAccountGroup,
  mdiPackageVariant,
  mdiArrowUpBold,
  mdiArrowDownBold,
} from "@mdi/js";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Customers */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Icon
            path={mdiAccountGroup}
            size={1}
            className="text-gray-800 dark:text-white/90"
          />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>

          <Badge color="success" className="flex items-center gap-1">
            <Icon path={mdiArrowUpBold} size={0.8} />
            11.01%
          </Badge>
        </div>
      </div>

      {/* Orders */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Icon
            path={mdiPackageVariant}
            size={1}
            className="text-gray-800 dark:text-white/90"
          />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>

          <Badge color="error" className="flex items-center gap-1">
            <Icon path={mdiArrowDownBold} size={0.8} />
            9.05%
          </Badge>
        </div>
      </div>
    </div>
  );
}
