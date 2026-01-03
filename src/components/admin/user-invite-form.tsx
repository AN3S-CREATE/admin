"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";

const roles = ["admin", "ops", "hr", "safety", "viewer"];

export function UserInviteForm() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('viewer');
    const [isInviting, setIsInviting] = useState(false);
    const { toast } = useToast();

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast({
                variant: 'destructive',
                title: 'Email is required',
                description: 'Please enter an email address to send an invitation.',
            });
            return;
        }

        setIsInviting(true);
        // In a real app, you would call a cloud function here to create the user record
        // and send an invitation email. We'll simulate it with a delay.
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log(`Inviting user: ${email} with role: ${role}`);
        
        toast({
            title: "Invitation Sent",
            description: `An invitation has been sent to ${email}.`,
        });
        
        setEmail('');
        setRole('viewer');
        setIsInviting(false);
    };

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-6 w-6" />
                    Invite New User
                </CardTitle>
                <CardDescription>
                    Send an invitation to a new user to join this tenant.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleInvite}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="new.user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isInviting}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select 
                            value={role} 
                            onValueChange={setRole}
                            disabled={isInviting}
                        >
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map(r => (
                                    <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full font-bold" disabled={isInviting}>
                        {isInviting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Send Invitation"
                        )}
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}
