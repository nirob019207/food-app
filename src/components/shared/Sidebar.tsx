import Link from "next/link";
import NavLink from "./NavLink";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { Button } from "../ui/button";

const navLinks = [
  { icon: <MdOutlineDashboard />, href: "/dashboard", label: "Dashboard" },
];

function Sidebar() {
  return (
    <div className="flex px-5 flex-col h-full bg-white">
      <div className="px-6 pb-6 pt-4">
        <Link href="/" className="flex items-center gap-2">
          <Image height={1000} width={1000} src={logo} alt="Logo" className="h-full w-full" />
          {/* <span className="font-semibold">Admin Panel</span> */}
        </Link>
      </div>
      <nav className="flex justify-between h-full mb-10 flex-col">
        <div className="flex-1 h-full flex flex-col gap-4 pb-4">
          <h4 className="text-[#817F9B] text-[16px] mb-3 font-normal leading-[15px]">MANAGEMENT</h4>
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <NavLink key={index} icon={link.icon} href={link.href}>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          {/* logout */}
          <Button className="flex items-center justify-start text-[#D00E11] w-[216px] p-[14px_16px] gap-2 rounded-[8px] dark:bg-[#fbe7e8] bg-[#fbe7e8]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M8.33325 2.5L4.25456 4.53934C3.68992 4.82167 3.33325 5.39877 3.33325 6.03006V13.9699C3.33325 14.6013 3.68992 15.1783 4.25456 15.4607L8.33325 17.5"
                stroke="#D00E11"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5833 7.91699L16.6666 10.0003L14.5833 12.0837M8.33325 10.0003H16.1593"
                stroke="#D00E11"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-[#D00E11]">Logout</p>
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
