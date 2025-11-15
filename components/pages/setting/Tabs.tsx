import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs() {
  const location = usePathname();

  const tabs = [
    {
      name: "Personal Info",
      href: "/dashboard/setting",
    },
    {
      name: "Security Settings",
      href: "/dashboard/setting/security",
    },
    // {
    //   name: 'Billings',
    //   href: '/dashboard/setting/billing',
    // },
    // {
    //   name: 'Notification',
    //   href: '/dashboard/setting/notification',
    // }
  ];

  return (
    <div className="flex items-center gap-4 mb-6 overflow-x-auto tabs_wrapper">
      {tabs.map((tab, index) => (
        <Link
          key={index}
          href={tab.href}
          className={`py-[10px] px-4 text-xs sm:text-sm font-medium pb-1 whitespace-nowrap border-b transition-all duration-300 ${
            location === tab.href
              ? "border-primary-color"
              : "border-transparent"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}
