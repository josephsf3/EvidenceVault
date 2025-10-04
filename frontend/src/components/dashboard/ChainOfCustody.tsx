import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEvidence } from '@/contexts/EvidenceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link as LinkIcon, Plus, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ChainOfCustody() {
  const { user } = useAuth();
  const { evidenceList, custodyRecords, addCustodyRecord } = useEvidence();
  const { toast } = useToast();
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>('');
  const [action, setAction] = useState('');
  const [notes, setNotes] = useState('');
  const [open, setOpen] = useState(false);

  const filteredEvidence = user?.role === 'legal_body' 
    ? evidenceList 
    : evidenceList.filter(e => e.uploaderId === user?.id);

  const selectedEvidence = evidenceList.find(e => e.id === selectedEvidenceId);
  const evidenceCustody = custodyRecords.filter(c => c.evidenceId === selectedEvidenceId);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvidenceId || !user) return;

    addCustodyRecord({
      evidenceId: selectedEvidenceId,
      action,
      performedBy: user.name,
      notes,
    });

    toast({
      title: 'Custody record added',
      description: 'Chain of custody updated successfully',
    });

    setAction('');
    setNotes('');
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Chain of Custody</h2>
          <p className="text-muted-foreground mt-1">Track evidence custody and actions</p>
        </div>
        {user?.role === 'legal_body' && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custody Record</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddRecord} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="evidence">Evidence</Label>
                  <Select value={selectedEvidenceId} onValueChange={setSelectedEvidenceId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select evidence" />
                    </SelectTrigger>
                    <SelectContent>
                      {evidenceList.map(e => (
                        <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <Input
                    id="action"
                    placeholder="e.g., Reviewed, Transferred"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional details"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Add Record</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedEvidenceId} onValueChange={setSelectedEvidenceId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose evidence to view custody chain" />
            </SelectTrigger>
            <SelectContent>
              {filteredEvidence.map(e => (
                <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedEvidence && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              {selectedEvidence.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {evidenceCustody.map((record, index) => (
                <div key={record.id} className="relative pl-8 pb-6 last:pb-0">
                  {index !== evidenceCustody.length - 1 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border" />
                  )}
                  <div className="absolute left-0 top-0">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{record.action}</h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date(record.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Performed by: {record.performedBy}
                    </p>
                    <p className="text-sm">{record.notes}</p>
                  </div>
                </div>
              ))}
              {evidenceCustody.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No custody records found for this evidence
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
