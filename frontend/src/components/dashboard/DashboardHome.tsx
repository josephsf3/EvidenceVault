import { useAuth } from '@/contexts/AuthContext';
import { useEvidence } from '@/contexts/EvidenceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, Upload, Shield, Clock } from 'lucide-react';

export function DashboardHome() {
  const { user } = useAuth();
  const { evidenceList } = useEvidence();

  const userEvidence = evidenceList.filter(e => e.uploaderId === user?.id);
  const pendingCount = evidenceList.filter(e => e.status === 'pending').length;
  const verifiedCount = evidenceList.filter(e => e.status === 'verified').length;

  const stats = user?.role === 'user' 
    ? [
        { label: 'Total Uploads', value: userEvidence.length, icon: Upload, color: 'text-primary' },
        { label: 'Pending Review', value: userEvidence.filter(e => e.status === 'pending').length, icon: Clock, color: 'text-accent' },
        { label: 'Verified', value: userEvidence.filter(e => e.status === 'verified').length, icon: FileCheck, color: 'text-secondary' },
      ]
    : [
        { label: 'Total Evidence', value: evidenceList.length, icon: Shield, color: 'text-primary' },
        { label: 'Pending Review', value: pendingCount, icon: Clock, color: 'text-accent' },
        { label: 'Verified', value: verifiedCount, icon: FileCheck, color: 'text-secondary' },
      ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome back, {user?.name}</h2>
        <p className="text-muted-foreground mt-1">
          {user?.role === 'user' 
            ? 'Manage your evidence submissions and track their status'
            : 'Review and verify evidence submissions'}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evidenceList.slice(0, 5).map((evidence) => (
              <div key={evidence.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                <div>
                  <p className="font-medium">{evidence.title}</p>
                  <p className="text-sm text-muted-foreground">{evidence.uploaderName}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    evidence.status === 'verified' ? 'bg-secondary/20 text-secondary-foreground' :
                    evidence.status === 'pending' ? 'bg-accent/20 text-accent-foreground' :
                    'bg-destructive/20 text-destructive-foreground'
                  }`}>
                    {evidence.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(evidence.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
