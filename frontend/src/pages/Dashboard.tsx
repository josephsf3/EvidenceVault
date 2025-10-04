import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Shield, LogOut, Wallet, Upload, FolderOpen, Link as LinkIcon } from 'lucide-react';
import { WalletView } from '@/components/dashboard/WalletView';
import { UploadEvidence } from '@/components/dashboard/UploadEvidence';
import { PreviousUploads } from '@/components/dashboard/PreviousUploads';
import { ChainOfCustody } from '@/components/dashboard/ChainOfCustody';
import { DashboardHome } from '@/components/dashboard/DashboardHome';

type TabType = 'home' | 'wallet' | 'upload' | 'previous' | 'custody';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'home', label: 'Dashboard', icon: Shield },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'upload', label: 'Upload Evidence', icon: Upload },
    { id: 'previous', label: 'Previous Uploads', icon: FolderOpen },
    { id: 'custody', label: 'Chain of Custody', icon: LinkIcon },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Evidence Vault</h1>
              <p className="text-xs text-muted-foreground">
                {user.role === 'user' ? 'User Dashboard' : 'Legal Body Portal'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 space-y-2 hidden md:block">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab(tab.id as TabType)}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </aside>

          {/* Mobile Navigation */}
          <div className="md:hidden w-full mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className="flex-shrink-0"
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'home' && <DashboardHome />}
            {activeTab === 'wallet' && <WalletView />}
            {activeTab === 'upload' && <UploadEvidence />}
            {activeTab === 'previous' && <PreviousUploads />}
            {activeTab === 'custody' && <ChainOfCustody />}
          </main>
        </div>
      </div>
    </div>
  );
}
