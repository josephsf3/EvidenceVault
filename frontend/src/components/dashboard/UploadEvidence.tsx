import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEvidence } from '@/contexts/EvidenceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UploadEvidence() {
  const { user } = useAuth();
  const { uploadEvidence } = useEvidence();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceType, setEvidenceType] = useState('Document');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;

    uploadEvidence({
      title,
      description,
      fileName: file.name,
      fileSize: file.size,
      uploaderId: user.id,
      uploaderName: user.name,
      evidenceType,
    });

    toast({
      title: 'Evidence uploaded',
      description: 'Your evidence has been submitted for review',
    });

    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Upload Evidence</h2>
        <p className="text-muted-foreground mt-1">Submit new evidence for secure storage and verification</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evidence Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Evidence Title</Label>
              <Input
                id="title"
                placeholder="e.g., Security Camera Footage"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the evidence"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Evidence Type</Label>
              <Select value={evidenceType} onValueChange={setEvidenceType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Document">Document</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Image">Image</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">File Upload</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                  className="hidden"
                />
                <label htmlFor="file" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  {file ? (
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium">Click to upload file</p>
                      <p className="text-sm text-muted-foreground">or drag and drop</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!file}>
              <Upload className="mr-2 h-4 w-4" />
              Submit Evidence
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
