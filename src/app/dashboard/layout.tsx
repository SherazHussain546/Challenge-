
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { LayoutDashboard, Users, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-background flex">
        <aside className="w-64 border-r border-white/5 p-6 space-y-8 hidden md:block">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </aside>
        <main className="flex-1 p-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-[400px] w-full" />
        </main>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden glass-card p-4 flex justify-between items-center border-b border-white/5">
        <Link href="/dashboard" className="font-bold text-accent">Dublin AI Admin</Link>
        <Button variant="ghost" size="icon"><Menu /></Button>
      </div>

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-white/[0.02] p-6 hidden md:flex flex-col">
        <div className="mb-12 flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded flex items-center justify-center font-bold text-background text-xs">D</div>
          <span className="font-headline font-bold text-lg">Staff Portal</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 text-accent font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Leads Feed
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
            <Users className="w-5 h-5" />
            Client List
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
            AI Config
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden">
              <img src={user?.photoURL || ''} alt={user?.displayName || 'User'} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.displayName}</p>
              <p className="text-[10px] text-muted-foreground truncate uppercase">Admin Agent</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive gap-3 px-4"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
