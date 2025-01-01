"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import React, { useState } from "react";

const Dashboard = () => {
  const stats = [
    { title: "Damaged products", value: "5", color: "bg-white", textColor: "text-red-900" },
    { title: "Stolen products", value: "1", color: "bg-white", textColor: "text-red-700" },
    { title: "Borrowed products", value: "2", color: "bg-white", textColor: "text-yellow-700" },
    { title: "Available products", value: "78", color: "bg-white", textColor: "text-green-900" },
  ];

  const sales = [
    { category: "furnitures", value: "39" },
    { category: "electronics", value: "42" },
    { category: "appliances", value: "29" },
    { category: "clothing", value: "57" },
    { category: "books", value: "18" },
    { category: "stationery", value: "34" },
  ];

  const data = {
    "2024-01": [
      { day: "01", damaged: 0, stolen: 0 },
      { day: "02", damaged: 4, stolen: 0 },
      { day: "03", damaged: 1, stolen: 2 },
      { day: "04", damaged: 0, stolen: 0 },
      { day: "05", damaged: 15, stolen: 0 },
      { day: "06", damaged: 1, stolen: 1 },
      { day: "07", damaged: 1, stolen: 0 },
      { day: "08", damaged: 1, stolen: 1 },
      { day: "09", damaged: 0, stolen: 0 },
      { day: "10", damaged: 1, stolen: 1 },
      { day: "11", damaged: 5, stolen: 2 },
      { day: "12", damaged: 1, stolen: 1 },
      { day: "13", damaged: 1, stolen: 1 },
      { day: "14", damaged: 1, stolen: 1 },
      { day: "15", damaged: 1, stolen: 1 },
      { day: "16", damaged: 0, stolen: 0 },
      { day: "17", damaged: 3, stolen: 0 },
      { day: "18", damaged: 1, stolen: 1 },
      { day: "19", damaged: 1, stolen: 0 },
      { day: "20", damaged: 1, stolen: 1 },
      { day: "21", damaged: 20, stolen: 0 },
      { day: "22", damaged: 2, stolen: 1 },
      { day: "23", damaged: 4, stolen: 0 },
      { day: "24", damaged: 1, stolen: 2 },
      { day: "25", damaged: 0, stolen: 0 },
      { day: "26", damaged: 3, stolen: 0 },
      { day: "27", damaged: 1, stolen: 1 },
      { day: "28", damaged: 1, stolen: 1 },
      { day: "29", damaged: 0, stolen: 0 },
      { day: "30", damaged: 3, stolen: 0 },
      { day: "31", damaged: 1, stolen: 1 },
    ],
  };

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState("01");

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const filteredData = data[`${selectedYear}-${selectedMonth}`] || [];

  return (
    <div className="p-10 space-y-6 font-ibm">
      <div className="flex flex-col md:flex-row items-center mt-10 md:mt-0 justify-between">
        <div>
          <p className="text-xl font-semibold">Dashboard</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0 items-center">
          <select value={selectedYear} onChange={handleYearChange} className="border p-2 rounded">
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <select value={selectedMonth} onChange={handleMonthChange} className="border p-2 rounded">
            <option value="01">January</option>
            <option value="02">February</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`${stat.color} ${stat.textColor} hover:shadow-lg p-2 transition-transform transform hover:scale-105 rounded-lg`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex justify-center font-semibold">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl flex justify-center font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row w-[100%] gap-4">
        <Card className=" w-full md:w-[60%]">
          <CardHeader>
            <CardTitle>Products Overview</CardTitle>
            <CardDescription>
              {selectedYear} - {selectedMonth}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData} margin={{ top: 20, right: 10, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: "Days", position: "insideBottomRight", offset: 0 , }} />
                <YAxis
                  // // interval="preserveStartEnd"
                  // domain={[0, 25]}
                  // // tickInterval={5}
                  label={{ value: "Products", angle: -90, position: "insideLeft" }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="damaged" stroke="#ff7300" />
                <Line type="monotone" dataKey="stolen" stroke="#387908" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className=" w-full md:w-[40%]">
          <CardHeader>
            <CardTitle className="text-lg">Current Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {sales.map((sale, index) => (
                <li
                  key={index}
                  className="flex justify-between text-gray-700 items-center py-2 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-medium">{sale.category}</p>
                  </div>
                  <p className="font-semibold">{sale.value}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
