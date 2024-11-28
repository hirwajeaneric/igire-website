"use client";

import React, { useState, useEffect } from "react";
import SideBar from "./(components)/Sidebar.jsx";
import "@/globals.css";
import { imb } from "@/utils/fonts";
import { Calendar } from "@/components/ui/calendar";
import Holidays from "date-holidays";

export default function RootLayout({ children }) {
  const [holidays, setHolidays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const handleMonthChange = (date) => {
    const newMonth = date.getMonth() + 1; 
    setCurrentMonth(newMonth);
  };

  useEffect(() => {
    const hd = new Holidays("RW"); 
    const allHolidays = hd.getHolidays(new Date().getFullYear());
    const monthHolidays = allHolidays.filter(
      (holiday) => new Date(holiday.date).getMonth() + 1 === currentMonth
    );
    setHolidays(monthHolidays);
  }, [currentMonth]);

  return (
    <html lang="en">
      <body className={`${imb}`}>
        <div className="flex h-screen overflow-hidden">
          <SideBar />

          <main className="md:ml-[15rem] ml-3  flex-grow p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6">
              <div className="bg-gray-50 h-screen  rounded-lg shadow-md">
                {children}
              </div>

              <div className="sticky top-6">
                <Calendar
                  onMonthChange={handleMonthChange} 
                />

                <h3 className="text-lg font-medium mt-6 text-gray-700">
                  Public Holidays
                </h3>
                <ul className="mt-2 space-y-2">
                  {holidays.length > 0 ? (
                    holidays.map((holiday) => (
                      <li
                        key={holiday.date}
                        className="flex justify-between items-center p-2 bg-green-100 rounded-md shadow-sm text-gray-800"
                      >
                        <span>{holiday.name}</span>
                        <span className="text-sm text-green-100">
                          {new Date(holiday.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No holidays this month.</li>
                  )}
                </ul>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
