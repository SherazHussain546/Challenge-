
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuditForm } from '@/components/audit-form';
import { Shield, Zap, TrendingUp, CheckCircle, Mail, MapPin, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const featureImg = PlaceHolderImages.find(img => img.id === 'feature-automation');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-background">D</div>
          <span className="text-xl font-headline font-bold text-foreground">Dublin AI <span className="text-accent">Systems</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-accent transition-colors">Features</Link>
          <Link href="#solutions" className="text-sm font-medium hover:text-accent transition-colors">Solutions</Link>
          <Link href="/dashboard" className="text-sm font-medium text-accent hover:opacity-80 transition-opacity">Staff Portal</Link>
          <Link href="#audit" className="bg-accent text-background px-5 py-2 rounded-full text-sm font-bold gold-glow transition-transform hover:scale-105 active:scale-95">
            Request Audit
          </Link>
        </nav>
      </header>

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {heroImg && (
              <Image 
                src={heroImg.imageUrl} 
                alt={heroImg.description}
                fill
                className="object-cover opacity-20"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>

          <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3 h-3" />
                Dublin's First 24/7 AI Leasing Assistant
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
                Stop Losing <span className="text-accent">Rental Leads.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Automate your inbox with our premium AI systems. Respond instantly, qualify leads automatically, and book viewings while you sleep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#audit" className="bg-accent text-background px-8 py-4 rounded-xl text-lg font-bold gold-glow flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px]">
                  Request AI Audit <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#features" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center transition-all hover:bg-white/10">
                  See How It Works
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                      <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Trusted by <span className="text-white font-bold">50+ Dublin Property Agencies</span></p>
              </div>
            </div>

            <div id="audit" className="relative">
              <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full opacity-30 animate-pulse" />
              <div className="glass-card p-8 rounded-3xl border border-white/10 relative z-10">
                <h3 className="text-2xl font-headline font-bold mb-6">Request Your Free AI Audit</h3>
                <AuditForm />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 md:px-12 bg-white/[0.02]">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Built for Elite Property Managers</h2>
              <p className="text-lg text-muted-foreground">Our AI doesn't just reply; it executes. Specifically tuned for the Dublin rental market dynamics.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-accent" />,
                  title: "Instant Qualification",
                  desc: "AI identifies qualified prospects mentioning budget and move-in dates instantly, prioritizing them for your team."
                },
                {
                  icon: <Shield className="w-8 h-8 text-accent" />,
                  title: "24/7 Availability",
                  desc: "Leads come in at 2 AM on Saturday? Our AI is already suggesting a viewing time for Friday morning."
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-accent" />,
                  title: "High-Volume Ready",
                  desc: "Handle 1,000 inquiries as easily as 10. Scale your portfolio without scaling your overhead."
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
                  <div className="mb-6 p-4 bg-accent/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid Section CTA */}
        <section className="py-24">
          <div className="container px-6">
            <div className="relative rounded-[3rem] overflow-hidden">
              <div className="absolute inset-0">
                {featureImg && (
                  <Image src={featureImg.imageUrl} alt="AI Tech" fill className="object-cover opacity-20" />
                )}
                <div className="absolute inset-0 bg-accent/40 mix-blend-multiply" />
              </div>
              <div className="relative z-10 px-8 py-16 md:p-20 flex flex-col items-center text-center space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold text-background">Ready to reclaim 20 hours a week?</h2>
                <p className="text-xl text-background/80 max-w-2xl font-medium">
                  Join the elite circle of property managers who have eliminated manual inbox triage.
                </p>
                <Link href="#audit" className="bg-background text-accent px-10 py-5 rounded-2xl text-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl">
                  Get Your Free System Audit
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center font-bold text-background text-sm">D</div>
              <span className="text-lg font-headline font-bold">Dublin AI Systems</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Dublin AI Systems. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-accent transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
