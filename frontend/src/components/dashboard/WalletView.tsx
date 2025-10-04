import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const transactions = [
  { id: '1', type: 'credit', amount: 50, description: 'Initial deposit', date: '2025-09-20' },
  { id: '2', type: 'debit', amount: 5, description: 'Evidence upload fee', date: '2025-09-21' },
  { id: '3', type: 'credit', amount: 10, description: 'Verification reward', date: '2025-09-22' },
];

export function WalletView() {
  const balance = transactions.reduce((acc, t) => 
    t.type === 'credit' ? acc + t.amount : acc - t.amount, 0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Wallet</h2>
        <p className="text-muted-foreground mt-1">Manage your balance and transactions</p>
      </div>

      <Card className="bg-gradient-to-br from-primary to-secondary border-0 text-primary-foreground">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Current Balance</p>
              <h3 className="text-4xl font-bold mt-2">${balance}.00</h3>
            </div>
            <Wallet className="h-12 w-12 opacity-80" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span className="opacity-90">Ready for blockchain integration</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    tx.type === 'credit' ? 'bg-secondary/20' : 'bg-accent/20'
                  }`}>
                    {tx.type === 'credit' ? (
                      <ArrowDownRight className="h-5 w-5 text-secondary" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  tx.type === 'credit' ? 'text-secondary' : 'text-accent'
                }`}>
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
