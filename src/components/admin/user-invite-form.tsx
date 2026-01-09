"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";
import { useFirestore, useUser } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { User } from '@/types/user';

const roles = ["admin", "ops", "hr", "safety", "viewer"];
const MOCK_TENANT_ID = 'Veralogix'; // As defined in use-user.tsx

export function UserInviteForm() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('viewer');
    const [isInviting, setIsInviting] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();
    const { user } = useUser();

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore || !user) return;
        
        if (!email) {
            toast({
                variant: 'destructive',
                title: 'Email is required',
                description: 'Please enter an email address to send an invitation.',
            });
            return;
        }

        setIsInviting(true);

        // This is a simplified user creation flow. 
        // In a real app, you'd likely use a Cloud Function to create the auth user
        // and send a proper email. For the prototype, we create a placeholder user ID
        // and set the document in Firestore.
        const newUserId = `invited_${new Date().getTime()}`;
        const usersColRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'users');
        const newUserDocRef = doc(usersColRef, newUserId);

        const newUser: Omit<User, 'id'> & { id: string; invitedAt: string; tenantId: string } = {
            id: newUserId,
            tenantId: MOCK_TENANT_ID,
            email,
            role: role as User['role'],
            status: 'pending',
            invitedAt: new Date().toISOString(),
            displayName: 'Invited User'
        };

        // Use the non-blocking update function
        setDocumentNonBlocking(newUserDocRef, newUser);

        // We don't await the result, but we can give immediate feedback.
        toast({
            title: "Invitation Sent",
            description: `An invitation record for ${email} has been created.`,
        });
        
        setEmail('');
        setRole('viewer');
        setIsInviting(false);
    };

    // Only render the component if the user is an admin
    if (user?.role !== 'admin') {
        return null;
    }

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
