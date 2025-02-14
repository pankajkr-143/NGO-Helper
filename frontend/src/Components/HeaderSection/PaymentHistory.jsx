import React, { useEffect, useState } from 'react';
import { useAuth } from "../../store/auth";

const PaymentHistory = ({ userId }) => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/payments/histories/paymentHistories?userId=${userId}`, {
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
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPayments();
  }, [userId]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const filteredPayments = payments.filter(payment => payment.userId === user._id);

  return (
    <div className="p-16">
      <h2 className="text-xl font-bold mb-4 text-center">Payment History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">User ID</th>
            <th className="py-2 px-4 border-b border-gray-300">ID</th>
            <th className="py-2 px-4 border-b border-gray-300">TransactionId</th>
            <th className="py-2 px-4 border-b border-gray-300">Amount</th>
            <th className="py-2 px-4 border-b border-gray-300">Currency</th>
            <th className="py-2 px-4 border-b border-gray-300">Status</th>
            <th className="py-2 px-4 border-b border-gray-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(payment => (
            <tr key={payment._id}>
              <td className="py-2 px-4 border-b border-gray-300">{payment.userId}</td>
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
