/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from "next/link";
import NavLink from "./NavLink";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { 
  MdOutlineDashboard, 
  MdCategory, 
  MdFastfood, 
  MdShoppingCart, 
  MdPerson, 
  MdDriveFileMoveOutline
} from "react-icons/md";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logout, setUser } from "@/redux/features/authSlice";
import { useEffect, useState } from 'react';

interface DecodedToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPERADMIN';
  iat: number;
  exp: number;
}

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState<string | null>(null);

  // Decode JWT token to get user role
  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error('Failed to decode token:', error);
        setUserRole(null);
      }
    }
  }, []);

  // Define navLinks with specific icons
  const navLinks = [
    { icon: <MdOutlineDashboard className="w-5 h-5" />, href: "/dashboard", label: "Dashboard", roles: ['ADMIN', 'SUPERADMIN'] },
    { icon: <MdCategory className="w-5 h-5" />, href: "/category", label: "Categories", roles: ['ADMIN', 'SUPERADMIN'] },
    { icon: <MdFastfood className="w-5 h-5" />, href: "/product", label: "Products", roles: ['ADMIN', 'SUPERADMIN'] },
    { icon: <MdShoppingCart className="w-5 h-5" />, href: "/allOrder", label: "Orders", roles: ['ADMIN', 'SUPERADMIN'] },
        { icon: <MdDriveFileMoveOutline className="w-5 h-5" />, href: "/allDelivery", label: "Delivery Fee", roles: ['ADMIN', 'SUPERADMIN'] },

    { icon: <MdPerson className="w-5 h-5" />, href: "/myorder", label: "My Orders", roles: ['USER', ] },
  ];

  // Handle logout
  const handleLogout = () => {
    Cookies.remove('accessToken');
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="flex px-5 flex-col h-full bg-white">
      <div className="px-6 pb-6 pt-4">
        <Link href="/" className="flex items-center gap-2">
          <Image height={1000} width={1000} src="https://nyc3.digitaloceanspaces.com/smtech-space/files/d330a925-4680-435a-92b2-ecad3674ab9b.png" alt="Logo" className="h-full w-full" />
        </Link>
      </div>
      <nav className="flex justify-between h-full mb-10 flex-col">
        <div className="flex-1 h-full flex flex-col gap-4 pb-4">
          <h4 className="text-[#817F9B] text-[16px] mb-3 font-normal leading-[15px]">MANAGEMENT</h4>
          <div className="flex flex-col gap-1">
            {navLinks
              .filter(link => userRole && link.roles.includes(userRole))
              .map((link, index) => (
                <NavLink key={index} icon={link.icon} href={link.href}>
                  <span>{link.label}</span>
                </NavLink>
              ))}
          </div>
        </div>
        <div>
          <Button 
            onClick={handleLogout}
            className="flex items-center justify-start text-[#D00E11] w-[216px] p-[14px_16px] gap-2 rounded-[8px] dark:bg-[#fbe7e8] bg-[#fbe7e8]"
          >
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