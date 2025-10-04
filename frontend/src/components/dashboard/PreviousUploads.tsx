import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEvidence } from '@/contexts/EvidenceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PreviousUploads() {
  const { user } = useAuth();
  const { evidenceList, updateEvidenceStatus } = useEvidence();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredEvidence = evidenceList
    .filter(e => user?.role === 'legal_body' || e.uploaderId === user?.id)
    .filter(e => statusFilter === 'all' || e.status === statusFilter)
    .filter(e => 
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleVerify = (id: string) => {
    updateEvidenceStatus(id, 'verified');
    toast({
      title: 'Evidence verified',
      description: 'Status updated successfully',
    });
  };

  const handleReject = (id: string) => {
    updateEvidenceStatus(id, 'rejected');
    toast({
      title: 'Evidence rejected',
      description: 'Status updated successfully',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Previous Uploads</h2>
        <p className="text-muted-foreground mt-1">View and manage evidence submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search evidence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredEvidence.map((evidence) => (
          <Card key={evidence.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{evidence.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{evidence.description}</p>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Type: {evidence.evidenceType}</span>
                      <span>Uploaded by: {evidence.uploaderName}</span>
                      <span>{new Date(evidence.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    evidence.status === 'verified' ? 'bg-secondary/20 text-secondary-foreground' :
                    evidence.status === 'pending' ? 'bg-accent/20 text-accent-foreground' :
                    'bg-destructive/20 text-destructive-foreground'
                  }`}>
                    {evidence.status}
                  </span>
                  <div className="flex gap-2">
                    {user?.role === 'legal_body' && evidence.status === 'pending' && (
                      <>
                        <Button size="sm" variant="default" onClick={() => handleVerify(evidence.id)}>
                          Verify
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(evidence.id)}>
                          Reject
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredEvidence.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No evidence found matching your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
