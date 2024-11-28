"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
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
      { day: "1", damaged: 2, stolen: 1 },
      { day: "2", damaged: 4, stolen: 0 },
      { day: "3", damaged: 1, stolen: 2 },
      { day: "4", damaged: 0, stolen: 0 },
      { day: "5", damaged: 3, stolen: 0 },
      { day: "6", damaged: 1, stolen: 1 },
      // ... more days
    ],
    "2024-02": [
      { day: "1", damaged: 3, stolen: 1 },
      { day: "2", damaged: 2, stolen: 3 },
      // ... more days
    ],
  };

  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("01");

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const filteredData = data[`${selectedYear}-${selectedMonth}`] || [];

  return (
    <div className="p-10 space-y-6">
      <div className="flex flex-row justify-between">
        <div>
          <p className="font-semibold text-2xl">Dashboard</p>
        </div>

        {/* Year and Month Selectors */}
        <div className="flex gap-2 items-center">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border p-2 rounded"
          > 
           <option value="2025">2023</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            
          </select>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border p-2 rounded"
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-12 ">
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

      {/* Overview and Recent Sales Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Products Overview</CardTitle>
            <CardDescription>
              {selectedYear} - {selectedMonth}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              width={500}
              height={300}
              data={filteredData}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="damaged" stroke="#ff7300" />
              <Line type="monotone" dataKey="stolen" stroke="#387908" />
            </LineChart>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current product categories</CardTitle>
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
