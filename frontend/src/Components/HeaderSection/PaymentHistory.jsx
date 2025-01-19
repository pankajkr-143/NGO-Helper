import React from 'react';

const PaymentHistory = () => {
  const payments = [
    { _id: '1', transactionId: 'T123', amount: 100, currency: 'USD', paymentStatus: 'Completed', createdAt: '2022-01-01' },
    { _id: '2', transactionId: 'T124', amount: 200, currency: 'EUR', paymentStatus: 'Pending', createdAt: '2022-01-02' },
  ];

  return (
    <div className="p-16">
      <h2 className="text-xl font-bold mb-4 text-center">Payment History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">ID</th>
            <th className="py-2 px-4 border-b border-gray-300">TransactionId</th>
            <th className="py-2 px-4 border-b border-gray-300">Amount</th>
            <th className="py-2 px-4 border-b border-gray-300">Currency</th>
            <th className="py-2 px-4 border-b border-gray-300">Status</th>
            <th className="py-2 px-4 border-b border-gray-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td className="py-2 px-4 border-b border-gray-300">{payment._id}</td>
              <td className="py-2 px-4 border-b border-gray-300">{payment.transactionId}</td>
              <td className="py-2 px-4 border-b border-gray-300">{payment.amount}</td>
              <td className="py-2 px-4 border-b border-gray-300">{payment.currency}</td>
              <td className="py-2 px-4 border-b border-gray-300">{payment.paymentStatus}</td>
              <td className="py-2 px-4 border-b border-gray-300">{new Date(payment.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
