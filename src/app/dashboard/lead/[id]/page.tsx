
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Mail, Calendar, Sparkles, MessageSquare, ShieldCheck, User, Copy, Check } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function LeadDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchLead() {
      if (!id) return;
      const docRef = doc(db, 'leads', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLead({ 
          id: docSnap.id, 
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate()
        });
      }
      setLoading(false);
    }
    fetchLead();
  }, [id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ description: "AI Response copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Lead Not Found</h2>
        <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => router.push('/dashboard')}
        className="text-muted-foreground hover:text-white"
      >
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Leads
      </Button>

      <div className="grid gap-6">
        {/* Profile Card */}
        <Card className="glass-card border-white/10 overflow-hidden">
          <div className="h-2 bg-accent w-full" />
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-headline font-bold">{lead.name}</CardTitle>
                <div className="flex items-center gap-4 mt-1 text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> 
                    {lead.createdAt ? format(lead.createdAt, 'MMM d, yyyy') : '-'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {lead.isQualified ? (
                <Badge className="bg-accent/20 text-accent border-accent/20 px-3 py-1 text-sm font-bold uppercase tracking-widest">
                  High Intent Prospect
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground px-3 py-1 text-sm uppercase tracking-widest">
                  Needs Review
                </Badge>
              )}
              <span className="text-[10px] text-muted-foreground uppercase">ID: {lead.id}</span>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Inquiry Section */}
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Raw Inquiry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 font-body leading-relaxed text-muted-foreground italic">
                "{lead.inquiry}"
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Section */}
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                AI Logic & Qualification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm">Qualification Status:</span>
                <span className={lead.isQualified ? "text-accent font-bold" : "text-destructive font-bold"}>
                  {lead.isQualified ? "QUALIFIED" : "UNQUALIFIED"}
                </span>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest block">AI Details:</span>
                <p className="text-sm text-foreground leading-relaxed">
                  {lead.qualificationDetails}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Response Section */}
        <Card className="glass-card border-accent/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-accent/10 border border-accent/20 text-[10px] text-accent font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" />
              AI Drafted
            </div>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Automated Premium Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 font-body leading-loose text-lg text-foreground whitespace-pre-wrap">
              {lead.response}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-white/5 pt-6">
            <p className="text-xs text-muted-foreground max-w-xs">
              This response has been automatically generated using Dublin AI Systems' Flash Logic based on the inquiry content.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(lead.response)}
                className="gap-2 border-white/10"
              >
                {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy for Email"}
              </Button>
              <Button className="bg-accent text-background font-bold gold-glow">
                Approve & Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
