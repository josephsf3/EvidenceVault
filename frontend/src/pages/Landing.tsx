import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Shield, Lock, FileCheck, Users, ChevronRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Evidence Vault</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Secure Evidence Management
            <span className="block text-primary mt-2">Built for Legal Excellence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track, verify, and maintain chain of custody for digital evidence with military-grade security and blockchain-ready infrastructure.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="group">
                Start Free Trial
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
            <p className="text-muted-foreground">
              Military-grade encryption ensures your evidence remains tamper-proof and accessible only to authorized parties.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <FileCheck className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Chain of Custody</h3>
            <p className="text-muted-foreground">
              Complete audit trail of every action, ensuring evidence integrity from upload to courtroom.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
            <p className="text-muted-foreground">
              Separate portals for users and legal bodies with granular permission controls.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to secure your evidence?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join legal professionals who trust Evidence Vault for secure, compliant evidence management.
          </p>
          <Link to="/signup">
            <Button size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Evidence Vault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
