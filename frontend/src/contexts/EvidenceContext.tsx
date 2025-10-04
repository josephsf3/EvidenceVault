import { createContext, useContext, useState, ReactNode } from 'react';

export interface Evidence {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  uploaderId: string;
  uploaderName: string;
  timestamp: string;
  status: 'pending' | 'verified' | 'rejected';
  evidenceType: string;
}

export interface CustodyRecord {
  id: string;
  evidenceId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  notes: string;
}

interface EvidenceContextType {
  evidenceList: Evidence[];
  custodyRecords: CustodyRecord[];
  uploadEvidence: (evidence: Omit<Evidence, 'id' | 'timestamp' | 'status'>) => void;
  updateEvidenceStatus: (id: string, status: Evidence['status']) => void;
  addCustodyRecord: (record: Omit<CustodyRecord, 'id' | 'timestamp'>) => void;
}

const EvidenceContext = createContext<EvidenceContextType | undefined>(undefined);

const mockEvidence: Evidence[] = [
  {
    id: '1',
    title: 'Security Camera Footage',
    description: 'Parking lot incident on 2025-09-15',
    fileName: 'camera_footage_091525.mp4',
    fileSize: 45600000,
    uploaderId: 'user1',
    uploaderName: 'John Doe',
    timestamp: '2025-09-20T10:30:00Z',
    status: 'verified',
    evidenceType: 'Video',
  },
  {
    id: '2',
    title: 'Email Communication',
    description: 'Email thread regarding contract dispute',
    fileName: 'email_thread.pdf',
    fileSize: 250000,
    uploaderId: 'user1',
    uploaderName: 'John Doe',
    timestamp: '2025-09-18T14:15:00Z',
    status: 'pending',
    evidenceType: 'Document',
  },
];

const mockCustody: CustodyRecord[] = [
  {
    id: '1',
    evidenceId: '1',
    action: 'Uploaded',
    performedBy: 'John Doe',
    timestamp: '2025-09-20T10:30:00Z',
    notes: 'Initial upload by user',
  },
  {
    id: '2',
    evidenceId: '1',
    action: 'Verified',
    performedBy: 'Legal Officer Smith',
    timestamp: '2025-09-21T09:00:00Z',
    notes: 'Verified authenticity and metadata',
  },
];

export function EvidenceProvider({ children }: { children: ReactNode }) {
  const [evidenceList, setEvidenceList] = useState<Evidence[]>(mockEvidence);
  const [custodyRecords, setCustodyRecords] = useState<CustodyRecord[]>(mockCustody);

  const uploadEvidence = (evidence: Omit<Evidence, 'id' | 'timestamp' | 'status'>) => {
    const newEvidence: Evidence = {
      ...evidence,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    setEvidenceList(prev => [newEvidence, ...prev]);
  };

  const updateEvidenceStatus = (id: string, status: Evidence['status']) => {
    setEvidenceList(prev => 
      prev.map(e => e.id === id ? { ...e, status } : e)
    );
  };

  const addCustodyRecord = (record: Omit<CustodyRecord, 'id' | 'timestamp'>) => {
    const newRecord: CustodyRecord = {
      ...record,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    setCustodyRecords(prev => [newRecord, ...prev]);
  };

  return (
    <EvidenceContext.Provider value={{
      evidenceList,
      custodyRecords,
      uploadEvidence,
      updateEvidenceStatus,
      addCustodyRecord,
    }}>
      {children}
    </EvidenceContext.Provider>
  );
}

export function useEvidence() {
  const context = useContext(EvidenceContext);
  if (context === undefined) {
    throw new Error('useEvidence must be used within an EvidenceProvider');
  }
  return context;
}
