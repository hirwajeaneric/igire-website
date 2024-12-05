"use client";

import {
  LayoutDashboard,
  User,
  Clipboard,
  SlidersHorizontal,
  Archive,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import logo from "@/favicon.ico";
import { RiSendPlaneFill } from "react-icons/ri";
import { BiSolidLeftDownArrowCircle } from "react-icons/bi";

const SidebarLink = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center px-8 py-4 hover:text-white hover:bg-green-200 gap-3 transition-colors ${isActive ? "bg-green-200 text-red" : ""
          }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span className="font-medium text-gray-700">{label}</span>
      </div>
    </Link>
  );
};

const DropdownLink = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="cursor-pointer flex items-center px-8 py-4 gap-3 hover:text-white hover:bg-green-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Archive className="w-6 h-6 !text-gray-700" />
        <span className="font-medium text-gray-700">{label}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-700 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        />
      </div>
      {isOpen && (
        <div className="pl-6">
          {options.map((option) => (
            <SidebarLink
              key={option.href}
              href={option.href}
              icon={option.icon}
              label={option.label}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-200 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <LayoutDashboard className="w-6 h-6 text-gray-800" />
      </button>

      <div
        className={`fixed left-0 top-0 flex flex-col z-40 h-full bg-white shadow-md transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-64`}
      >
        <div>
          <div className="flex flex-col  ">
            <div className="flex gap-3 items-center justify-start px-8 py-6">
              <Image src={logo} alt="logo" width={50} height={50} />
              <h1 className="text-2xl font-extrabold">Leave Hub</h1>
            </div>
            <div>
              <h3 className="flex items-center gap-3 text-md underline underline-offset-4 text-green-700 justify-start px-8 pb-6">
                Employee
              </h3>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <SidebarLink
            href="/dashboard/employeeleave/employee"
            icon={LayoutDashboard}
            label="Dashboard"
          />
          <DropdownLink
            label="Leave Request"
            options={[
              {
                href: "/dashboard/employeeleave/employee/leaverequest/sendleaverequest",
                icon: RiSendPlaneFill,
                label: "Send Leave Request",
              },
              {
                href: "/dashboard/employeeleave/employee/leaverequest/receivedleaverequest",
                icon: BiSolidLeftDownArrowCircle,
                label: "Received Leave Request",
              },
            ]}
          />
          <DropdownLink
            label="Leave Cancelation"
            options={[
              {
                href: "/dashboard/employeeleave/employee/leavecancellation/sendleavecancelation",
                icon: RiSendPlaneFill,
                label: "Send Leave Cancelation",
              },
              {
                href: "/dashboard/employeeleave/employee/leavecancellation/receivedleavecancelation",
                icon: BiSolidLeftDownArrowCircle,
                label: "Received Leave Cancelation",
              },
            ]}
          />
          <SidebarLink href="/dashboard/employeeleave/employee/users" icon={User} label="Users" />
          <SidebarLink
            href="/dashboard/employeeleave/employee/faqs"
            icon={Clipboard}
            label="FAQs"
          />
          <SidebarLink href="/dashboard/employeeleave/employee/myleaves" icon={User} label="My Leaves" />
          <SidebarLink
            href="/dashboard/employeeleave/employee/profile"
            icon={SlidersHorizontal}
            label="Profile"
          />
        </div>
        <div className="px-8 mb-10 text-xs text-gray-500">
          &copy; 2024 igire rwanda org
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SideBar;
