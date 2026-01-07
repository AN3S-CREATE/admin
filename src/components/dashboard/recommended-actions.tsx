"use client"

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"
import { ThumbsDown, ThumbsUp, Zap, Loader2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { useCollection, useFirestore, useMemoFirebase, useUser, updateDocumentNonBlocking } from "@/firebase";
import { collection, query, where, limit, doc } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { AiRecommendation } from "@/types/ai-recommendation";

const MOCK_TENANT_ID = 'Veralogix';

export function RecommendedActions() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  // This hook now fetches live data from Firestore.
  // It fetches the 3 most recent recommendations for the current tenant that haven't been verified yet.
  const recommendationsColRef = useMemoFirebase(() => {
    if (!firestore) return null;
    const baseRef = collection(firestore, 'tenants', MOCK_TENANT_ID, 'aiRecommendations');
    // For now, we fetch any recommendations. In a real app, you might filter by `verified: null`.
    return query(baseRef, limit(3), where('verified', '==', null));
  }, [firestore]);

  const { data: recommendations, isLoading } = useCollection<AiRecommendation>(recommendationsColRef);

  const handleVerification = (recommendationId: string, accepted: boolean) => {
    if (!firestore || !user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to verify a recommendation."
      });
      return;
    }

    const recommendationDocRef = doc(firestore, 'tenants', MOCK_TENANT_ID, 'aiRecommendations', recommendationId);
    
    // Use non-blocking update for quick UI feedback
    updateDocumentNonBlocking(recommendationDocRef, { verified: accepted });

    toast({
      title: `Recommendation ${accepted ? 'Accepted' : 'Rejected'}`,
      description: "Thank you for your feedback.",
    });
  };


  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary"/>
            <CardTitle className="font-headline">Recommended Actions</CardTitle>
        </div>
        <CardDescription>AI-suggested actions based on recent operational data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4 rounded-lg border border-border p-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-7 rounded-full" />
                  <Skeleton className="h-7 w-7 rounded-full" />
                </div>
              </div>
            </div>
          ))
        ) : !recommendations || recommendations.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
            <p>No new AI recommendations at this time.</p>
          </div>
        ) : (
          recommendations.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
              <div className="space-y-2">
                <p className="font-semibold text-sm">{item.recommendation}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><span className="font-medium text-foreground">Owner:</span> {item.owner}</p>
                  <p><span className="font-medium text-foreground">Impact:</span> {item.impact}</p>
                  {item.evidenceLinks && item.evidenceLinks.length > 0 && (
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                        <span className="font-medium text-foreground">Evidence:</span>
                        {item.evidenceLinks.map(link => (
                          <Link href={link} key={link} className="text-primary/80 hover:text-primary underline text-xs capitalize">
                            {link.split('/').pop()?.split('?')[0].replace(/-/g, ' ')}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 shrink-0">
                  <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                      Confidence: {(item.confidence * 100).toFixed(0)}%
                  </Badge>
                  <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400 disabled:opacity-50"
                        onClick={() => handleVerification(item.id, true)}
                        disabled={item.verified === true}
                        aria-label="Accept Recommendation"
                      >
                          <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                        onClick={() => handleVerification(item.id, false)}
                        disabled={item.verified === false}
                        aria-label="Reject Recommendation"
                      >
                          <ThumbsDown className="h-4 w-4" />
                      </Button>
                  </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
