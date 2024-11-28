'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Import Shadcn's Accordion components

const faqData = [
    {
        title: "How to request leave?",
        description: [
            "1. Click on the 'Apply for Leave' button on the dashboard.",
            "2. Select the type of leave you are requesting (e.g., vacation, sick leave).",
            "3. Choose the start and end dates for your leave.",
            "4. Submit your request, and it will be reviewed by your manager.",
            "5. Upload supporting documents if necessary.",
            "6. Submit request.",
        ],
        bgColor: "bg-blue-100",
    },
    {
        title: "What Happens After You Submit a Leave Request?",
        description: [
            "1. Your manager or HR will review the request.",
            "2. You may be asked for additional documents, if needed.",
            "3. You will receive a notification when your leave is approved or denied.",
            "4. Approved leave will be automatically updated in the system.",
            "5. If denied, discuss alternatives with your manager.",
        ],
        bgColor: "bg-teal-100",
    },
    {
        title: "What to do if you are sick during leave?",
        description: [
            "1. If you fall sick while on leave, immediately notify your manager.",
            "2. Provide a doctor’s note or medical certificate, if required by your company.",
            "3. Depending on company policy, your sick leave may be adjusted or converted to paid sick leave.",
            "4. Your remaining leave days will be recalculated, and your schedule will be updated.",
        ],
        bgColor: "bg-green-100",
    },
    {
        title: "What to Know about emergency leave?",
        description: [
            "1. Emergency leave is for unforeseen situations like accidents or urgent family matters.",
            "2. Notify your manager as soon as possible.",
            "3. Provide any required proof or documents post-leave, if necessary.",
            "4. Emergency leave policies may vary by company—check your employee handbook.",
            "5. Remaining leave days may be deducted based on company policy.",
        ],
        bgColor: "bg-orange-100",
    },
    {
        title: "How to cancel a day or all renmaining leave days you already scheduled?",
        description: [
            "1. Navigate to the leave cancellation.",
            "2. Select the specific day or choose the option to cancel all remaining leave days.",
            "3. Confirm the cancellation through the provided dialog or modal.",
            "4. The system will process your request, notify HR and your supervisor to approve your request.",
        ],
        bgColor: "bg-red-100",
    },
    {
        title: "Can I carry over leave days?",
        description: [
            "Yes, but you can only carry over 10 leave days accumulated over 2years.",
        ],
        bgColor: "bg-purple-100",
    },
    {
        title: "What is the policy for unpaid leave?",
        description: [
            "Unpaid leave is allowed for specific situations like emergencies or extended absences.",
            "1. Notify HR and your supervisor before taking unpaid leave.",
            "2. Unpaid leave will affect your salary, so plan accordingly.",
            "3. Ensure you follow the approval process for unpaid leave.",
        ],
        bgColor: "bg-indigo-100",
    },
    {
        title: "What to do if Your leave request is denied?",
        description: [
            "1. Discuss with your supervisor or HR the reason for denial.",
            "2. Adjust your leave dates and submit a new request.",
            "3. Check your available leave balance to ensure sufficient days.",
            "4. Plan alternative dates to meet personal and work needs.",
        ],
        bgColor: "bg-cyan-100",
    },
    {
        title: "How to apply for half-day leave?",
        description: [
                "Currently, half-day leave is not available, discuss flexible work options with your supervisor if you require part-time permission or check with HR for any alternative arrangements or adjustments based on your needs."
        ],
        bgColor: "bg-yellow-100",
    },
];

const FaqPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqData.map((faq, index) => (
                    <Card key={index} className={`w-full ${faq.bgColor} rounded-lg shadow`}>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{faq.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible>
                                <AccordionItem value={`item-${index}`}>
                                    <AccordionTrigger className="text-muted-foreground">
                                        Learn more
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="mt-3 space-y-2">
                                            {faq.description.map((item, i) => (
                                                <li key={i} className="text-muted-foreground">{item}</li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FaqPage;
