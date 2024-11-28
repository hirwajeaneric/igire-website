"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RequestDetails({ request, leaveBalance, lastRequest }) {
    const defaultRequest = {
        dateSubmitted: "2024-11-25",
        name: "John Doe",
        totalDays: 5,
        startDate: "2024-11-27",
        endDate: "2024-12-01",
        leaveType: "Annual Leave",
        status: "Pending",
    };

    const defaultLeaveBalance = {
        annual: 10,
        sick: 5,
    };

    const defaultLastRequest = {
        leaveType: "Sick Leave",
        startDate: "2023-10-15",
        endDate: "2023-10-17",
        status: "Approved",
    };

    const currentRequest = request || defaultRequest;
    const currentLeaveBalance = leaveBalance || defaultLeaveBalance;
    const currentLastRequest = lastRequest || defaultLastRequest;

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full p-6">
            <div className="w-full lg:w-2/3">
                
                <div className="border rounded-lg p-4 space-y-4 bg-white">
                    <h1 className="text-2xl font-semibold mb-6">Leave Request Details</h1>
                    <p>
                        <span className="font-semibold">Date Submitted:</span> {currentRequest.dateSubmitted}
                    </p>
                    <p>
                        <span className="font-semibold">Name:</span> {currentRequest.name}
                    </p>
                    <p>
                        <span className="font-semibold">Total Days:</span> {currentRequest.totalDays}
                    </p>
                    <p>
                        <span className="font-semibold">Start Date:</span> {currentRequest.startDate}
                    </p>
                    <p>
                        <span className="font-semibold">End Date:</span> {currentRequest.endDate}
                    </p>
                    <p>
                        <span className="font-semibold">Leave Type:</span> {currentRequest.leaveType}
                    </p>
                    <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                            className={
                                currentRequest.status === "Approved"
                                    ? "text-green-500"
                                    : currentRequest.status === "Declined"
                                        ? "text-red-500"
                                        : "text-yellow-500"
                            }
                        >
                            {currentRequest.status}
                        </span>
                    </p> 
                    <Button className="mt-6 bg-green-200 text-black">Approve</Button>
                    <Button className="mt-6 ml-3 bg-red-200 text-black">Decline</Button>
                </div>
               
            </div>

            <div className="w-full lg:w-1/3">
                <Card className="border rounded-lg p-4 mb-6 bg-green-100">
                    <h2 className="text-lg font-semibold mb-4">Leave Balance</h2>
                    <ul className="space-y-2">
                        <li>
                            <span className="font-semibold">Annual Leave:</span> {currentLeaveBalance.annual}
                        </li>
                        <li>
                            <span className="font-semibold">Sick Leave:</span> {currentLeaveBalance.sick}
                        </li>
                    </ul>
                </Card>

                <Card className="border rounded-lg p-4 bg-yellow-50">
                    <h2 className="text-lg font-semibold mb-4">Last Request</h2>
                    <ul className="space-y-2">
                        <li>
                            <span className="font-semibold">Leave Type:</span> {currentLastRequest.leaveType}
                        </li>
                        <li>
                            <span className="font-semibold">Start Date:</span> {currentLastRequest.startDate}
                        </li>
                        <li>
                            <span className="font-semibold">End Date:</span> {currentLastRequest.endDate}
                        </li>
                        <li>
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                                className={
                                    currentLastRequest.status === "Approved"
                                        ? "text-green-500"
                                        : currentLastRequest.status === "Declined"
                                            ? "text-red-500"
                                            : "text-yellow-500"
                                }
                            >
                                {currentLastRequest.status}
                            </span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}
