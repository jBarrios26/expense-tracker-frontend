import React from 'react';
import { Subtitle } from '../../../../Components/Subtitle';
import { TransactionCard } from '../TransactionCard';
import { formatDateTime } from '../../../../util/format_date_time';
import { useLastTransactions } from '../../hooks/use_last_transactions';
import { Loader } from '../../../../Components/Loader';

function LastTransactions() {
  const { transactions, isLoading } = useLastTransactions();
  return (
    <div>
      <Subtitle> Last Transactions</Subtitle>
      {!isLoading ? (
        <div className="flex flex-col flex-wrap gap-2">
          {transactions?.lastTransactions.map((transaction, index) => {
            return (
              <TransactionCard
                key={index}
                color={transaction.color}
                date={formatDateTime(new Date(transaction.date))}
                name={transaction.name}
                amount={transaction.amountSpent}
              />
            );
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default LastTransactions;
