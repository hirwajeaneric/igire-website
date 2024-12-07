import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
    return (
        <div className="flex min-h-screen p-6 bg-gray-100">
            <Card className="max-w-md w-full h-full p-6 shadow-md">
                <CardHeader className="flex flex-col items-center">
                    <Avatar className="w-40 h-40 mb-4">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile Picture"
                            className="rounded-full"
                        />
                    </Avatar>
                    <CardTitle className="text-lg font-semibold">Lucy Spencer</CardTitle>
                    <p className="text-gray-500 text-sm">
                        Account Manager
                        <br />
                        
                        Supervised by: <span className="text-blue-500 font-medium">Walter Brown</span>
                    </p>
                </CardHeader>
                <CardContent className="space-y-4 flex items-center justify-center">
                    <div className="text-sm">
                        <p>
                            <strong>Email:</strong> lucy.spencer@acmeinc.com
                        </p>
                        <p>
                            <strong>Work Phone:</strong> 519 489 4120 ext. 456
                        </p>
                        <p>
                            <strong>Mobile Phone:</strong> 519 723 8912
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
