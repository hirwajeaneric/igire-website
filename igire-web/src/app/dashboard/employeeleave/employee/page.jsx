'use client';

import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StatusCard = ({ title, value, icon }) => (
    <Card className="md:w-[calc(33.333%-0.75rem)]">
        <CardContent className="flex flex-col items-center justify-center gap-3 p-3">
            <div className="text-center">
                {icon && <div className="text-xl">{icon}</div>}
                <p className="text-[17px] text-muted-foreground">{title}</p>
                <CardTitle className="text-[24px] font-bold">{value}</CardTitle>
            </div>
        </CardContent>
    </Card>
);

const EmployeeDashboard = () => {
    return (
        <div className="p-2 sm:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-muted-foreground">
                    Good Morning, Jane Doe!
                </h1>
                <p className="text-lg text-muted-foreground">Here’s an overview of your current status and guidelines for leave requests.</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <StatusCard title="Available Leave" value="12" />
                <StatusCard title="Leave Pending" value="1" />
                <StatusCard title="Leave Taken" value="8" />
            </div>
            <div className="flex flex-col gap-4">
                <p className='text-muted-foreground'>Quick links:</p>
                <div className="flex flex-wrap gap-4 mb-8">
                    <a href='/dashboard/employeeleave/employee/sendleaverequest'><Button className="flex-1">Apply for Leave</Button></a>
                    <a href='/dashboard/employeeleave/employee/leavecancellation'><Button className="flex-1">Leave Cancellation</Button></a>
                    <a href='/dashboard/employeeleave/employee/faqs'><Button className="flex-1">FAQs</Button></a>
                    <a href='/dashboard/employeeleave/employee/myleaves'><Button className="flex-1">My leaves</Button></a>
                </div></div>

            <div className="flex flex-col gap-4 mb-8">
                <div className='text-muted-foreground'>
                    <div className='flex items-center justify-between'>
                        <p>FAQs:</p>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 '>
                    <div className="w-full md:w-1/2 bg-blue-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">How to Request Leave</h3>
                        <ul className="mt-3 space-y-2">
                            <li className="text-muted-foreground">1. Click on the "Apply for Leave" button on the dashboard.</li>
                            <li className="text-muted-foreground">2. Select the type of leave you are requesting (e.g., vacation, sick leave).</li>
                            <li className="text-muted-foreground">3. Choose the start and end dates for your leave.</li>
                            <li className="text-muted-foreground">4. Submit your request, and it will be reviewed by your manager.</li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/2 bg-green-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">What to Do if You Are Sick During Leave?</h3>
                        <ul className="mt-3 space-y-2">
                            <li className="text-muted-foreground">1. If you fall sick while on leave, immediately notify your manager.</li>
                            <li className="text-muted-foreground">2. Provide a doctor’s note or medical certificate, if required by your company.</li>
                            <li className="text-muted-foreground">3. Depending on company policy, your sick leave may be adjusted or converted to paid sick leave.</li>
                            <li className="text-muted-foreground">4. Your remaining leave days will be recalculated, and your schedule will be updated.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
