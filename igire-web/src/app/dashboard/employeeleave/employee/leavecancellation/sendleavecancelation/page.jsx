'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LeaveCancellation = () => {
    const [leaveData, setLeaveData] = useState({
        leaveType: "Casual Leave",
        totalLeaveDays: 10,
        usedLeaveDays: 0,
        remainingLeaveDays: 10,
    });

    const [cancellationMessage, setCancellationMessage] = useState('');
    const [cancelRequestSent, setCancelRequestSent] = useState(Array(10).fill(false)); 

    useEffect(() => {
        const savedLeaveData = JSON.parse(localStorage.getItem("leaveData"));
        const savedCancelRequestSent = JSON.parse(localStorage.getItem("cancelRequestSent"));

        if (savedLeaveData) {
            setLeaveData(savedLeaveData);
        }

        if (savedCancelRequestSent) {
            setCancelRequestSent(savedCancelRequestSent);
        }

        setLeaveData((prevData) => ({
            ...prevData,
            remainingLeaveDays: prevData.totalLeaveDays - prevData.usedLeaveDays,
        }));

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            if (currentTime.getHours() === 0 && currentTime.getMinutes() === 0) {
                markLeaveAsUsed();
            }
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const markLeaveAsUsed = () => {
        if (leaveData.remainingLeaveDays > 0) {
            setLeaveData((prevData) => ({
                ...prevData,
                usedLeaveDays: prevData.usedLeaveDays + 1,
            }));
        }
    };

    const handleCancelLeave = () => {
        if (leaveData.remainingLeaveDays > 0) {
            setLeaveData((prevData) => ({
                ...prevData,
                remainingLeaveDays: 0,
            }));
            setCancellationMessage("Your leave has been canceled successfully.");
        } else {
            setCancellationMessage("No leave days remaining to cancel.");
        }
    };

    const handleCancelDay = (index) => {
        if (!cancelRequestSent[index]) {
            setCancelRequestSent((prev) => {
                const newCancelRequestSent = [...prev];
                newCancelRequestSent[index] = true;
                localStorage.setItem("cancelRequestSent", JSON.stringify(newCancelRequestSent)); // Save to localStorage
                return newCancelRequestSent;
            });

            setLeaveData((prevData) => {
                const newUsedLeaveDays = prevData.usedLeaveDays + 1;
                const newRemainingLeaveDays = prevData.totalLeaveDays - newUsedLeaveDays;

                const newLeaveData = {
                    ...prevData,
                    usedLeaveDays: newUsedLeaveDays,
                    remainingLeaveDays: newRemainingLeaveDays,
                };

                localStorage.setItem("leaveData", JSON.stringify(newLeaveData));

                return newLeaveData;
            });
        }
    };

    return (
        <div className="p-6">
            <div className='flex flex-col lg:flex-row items-center justify-between'>
                <h1 className="text-2xl font-bold mb-4 lg:mb-0">Leave Cancellation</h1>
                <div className="mb-4 lg:mb-0">
                    <Button onClick={handleCancelLeave} className="">
                        Cancel All Remaining Days
                    </Button>
                </div>
            </div>

            <div className="space-y-4 mt-6">
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className="flex-1 mb-4 md:mb-0">
                        <Label className="block text-sm font-medium mb-2">Leave Type</Label>
                        <p className="text-sm">{leaveData.leaveType}</p>
                    </div>

                    <div className="flex-1 mb-4 md:mb-0">
                        <Label className="block text-sm font-medium mb-2">Total Leave Days</Label>
                        <p className="text-sm">{leaveData.totalLeaveDays}</p>
                    </div>

                    <div className="flex-1 mb-4 md:mb-0">
                        <Label className="block text-sm font-medium mb-2">Used Leave Days</Label>
                        <p className="text-sm">{leaveData.usedLeaveDays}</p>
                    </div>

                    <div className="flex-1">
                        <Label className="block text-sm font-medium mb-2">Remaining Leave Days</Label>
                        <p className="text-sm">{leaveData.remainingLeaveDays}</p>
                    </div>
                </div>

                {cancellationMessage && (
                    <div className="mt-4">
                        <p className="text-sm text-green-600">{cancellationMessage}</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                {[...Array(leaveData.totalLeaveDays)].map((_, index) => {
                    const isUsed = index < leaveData.usedLeaveDays;
                    const isCancelRequested = cancelRequestSent[index];
                    const status = isCancelRequested
                        ? "Unused"
                        : isUsed
                            ? "Used"
                            : leaveData.remainingLeaveDays === 0
                                ? "Unused"
                                : "Confirmed";

                    return (
                        <div key={index} className="border p-4 rounded-lg">
                            <p className="font-semibold">Day {index + 1}</p>
                            <p className="text-sm mb-2">{status}</p>
                            {status === "Used" && <input type="checkbox" checked readOnly />}
                            {status === "Confirmed" && !isCancelRequested && (
                                <Button onClick={() => handleCancelDay(index)} className="mt-2">
                                    Cancel Day
                                </Button>
                            )}
                            {status === "Unused" && !isCancelRequested && (
                                <Button onClick={() => handleCancelDay(index)} className="mt-2">
                                    Cancel Day
                                </Button>
                            )}
                            {isCancelRequested && (
                                <p className="mt-2 text-sm text-gray-600">Cancel Day Request Sent</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LeaveCancellation;
