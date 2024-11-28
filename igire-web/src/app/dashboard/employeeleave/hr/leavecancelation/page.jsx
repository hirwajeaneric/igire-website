'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function LeaveCancellationRequest({ request }) {
    if (!request) return <p className="p-6 text-md">No request details available.</p>;

    const handleApprove = () => {
        console.log("Leave request approved.");
        // Implement approval logic
    };

    const handleDecline = () => {
        console.log("Leave request declined.");
        // Implement decline logic
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="max-w-lg w-full">
                <CardHeader>
                    <CardTitle>Leave Cancellation Request</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form>
                        <FormField>
                            <FormItem>
                                <FormLabel>Date of Request</FormLabel>
                                <FormControl>
                                    <Input value={request.date || "Not specified"} readOnly />
                                </FormControl>
                            </FormItem>
                        </FormField>
                        <FormField>
                            <FormItem>
                                <FormLabel>Employee Name</FormLabel>
                                <FormControl>
                                    <Input value={request.name || "Not specified"} readOnly />
                                </FormControl>
                            </FormItem>
                        </FormField>
                        <FormField>
                            <FormItem>
                                <FormLabel>Total Days</FormLabel>
                                <FormControl>
                                    <Input value={request.totalDays || "Not specified"} readOnly />
                                </FormControl>
                            </FormItem>
                        </FormField>
                        <FormField>
                            <FormItem>
                                <FormLabel>Starting Date</FormLabel>
                                <FormControl>
                                    <Input value={request.startingDate || "Not specified"} readOnly />
                                </FormControl>
                            </FormItem>
                        </FormField>
                        <FormField>
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input value={request.endDate || "Not specified"} readOnly />
                                </FormControl>
                            </FormItem>
                        </FormField>
                        <FormField>
                            <FormItem>
                                <FormLabel>Leave Type</FormLabel>
                                <FormControl>
                                    <Input value={request.leaveType || "Not specified"} readOnly />
                                </FormControl>
                            </FormItem>
                        </FormField>
                        <FormField>
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Input
                                        value={request.status || "Pending"}
                                        readOnly
                                        className={
                                            request.status === "Approved"
                                                ? "text-green-500"
                                                : request.status === "Declined"
                                                    ? "text-red-500"
                                                    : "text-yellow-500"
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                        </FormField>
                    </Form>
                    <div className="mt-4 flex justify-end space-x-4">
                        <Button variant="primary" onClick={handleApprove}>Approve</Button>
                        <Button variant="secondary" onClick={handleDecline}>Decline</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
