import React, { useEffect, useState } from 'react';

const PaymentHistory = ({ userId }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/paymentHistories?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          console.error('Error fetching payments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, [userId]); 
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
              <td className="py-2 px-4 border-b border-gray-300">{payment.amountTotal}</td>
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
