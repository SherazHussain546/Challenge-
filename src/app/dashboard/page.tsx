
'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Search, Filter, Calendar, MessageSquare, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setLeads(leadsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(search.toLowerCase()) || 
    lead.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-headline font-bold mb-2">Lead Acquisition Dashboard</h1>
          <p className="text-muted-foreground">Monitor real-time AI qualifications and automated responses.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-4 py-2 border-white/10 text-accent gap-2">
            <CheckCircle2 className="w-4 h-4" />
            AI Online
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{leads.length}</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Qualified Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-accent">
              {leads.filter(l => l.isQualified).length}
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Viewings Proposed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {leads.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-white/10">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <CardTitle>Inbound Stream</CardTitle>
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search leads..." 
                className="pl-10 bg-white/5 border-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="border-white/10"><Filter className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Prospect</TableHead>
                <TableHead className="text-muted-foreground">Qualification</TableHead>
                <TableHead className="text-muted-foreground">Inquiry Sample</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-12">Loading inquiries...</TableCell></TableRow>
              ) : filteredLeads.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-12">No inquiries found matching your search.</TableCell></TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="border-white/5 hover:bg-white/[0.02] group transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold">{lead.name}</span>
                        <span className="text-xs text-muted-foreground">{lead.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {lead.isQualified ? (
                        <Badge className="bg-accent/20 text-accent border-accent/20 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          Qualified
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-muted/50 text-muted-foreground flex items-center gap-1 w-fit">
                          <AlertCircle className="w-3 h-3" />
                          Low Intent
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate text-sm text-muted-foreground">
                        {lead.inquiry}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {lead.createdAt ? format(lead.createdAt, 'MMM d, h:mm a') : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/lead/${lead.id}`}>
                        <Button variant="ghost" size="icon" className="group-hover:text-accent group-hover:bg-accent/10">
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Hallucinated icons need imports or manual definitions
function Users({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
