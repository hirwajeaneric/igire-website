"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const Dashboard = () => {
  const stats = [
    { title: "New products", value: "20", color: "bg-white", textColor: "text-green-900" },
    { title: "Used products", value: "80", color: "bg-white", textColor: "text-yellow-700" },
    { title: "Damaged products", value: "10", color: "bg-white", textColor: "text-red-700" },
  ];

  const sales = [
    { category: "furnitures", value: "39" },
    { category: "electronics", value: "42" },
    { category: "appliances", value: "29" },
    { category: "clothing", value: "57" },
    { category: "books", value: "18" },
    { category: "stationery", value: "34" },
  ];

  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: "Products",
    },
  };

  const DateTimeComponent = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date()); // Update the time every minute
      }, 60000); // 60,000 ms = 1 minute

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div className="flex flex-row gap-2 text-xl font-semibold border rounded border-1 p-1 border-black items-center">
        <div className="flex items-center">
          <MdDateRange style={{ marginRight: "8px" }} />
          <span>{currentTime.toLocaleDateString()}</span>
        </div>
        <div className="time-container">
          <span>{formattedTime}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-10 space-y-6">
      <div className="flex flex-row justify-between">
        <div>
          <p className="font-semibold text-2xl">Dashboard</p>
        </div>
        <DateTimeComponent />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
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
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="desktop" radius={8}>
                  <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                </Bar>
              </BarChart>
            </ChartContainer>
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
