"use client";

import React, { useState, useEffect } from "react";
import { getTransactions } from "@/lib/api";
import { Transaction } from "@/types";
import { Badge } from "@/components/UI/Badge";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getStatusBadge = (status: "SUCCESS" | "PENDING" | "FAILED") => {
    switch (status) {
      case "SUCCESS":
        return <Badge text="Selesai" color="green" />;
      case "PENDING":
        return <Badge text="Pending" color="yellow" />;
      default:
        return <Badge text="Gagal" color="red" />;
    }
  };

  const getPaymentMethodBadge = (method: "QRIS" | "INVOICE_B2B") => {
    return method === "INVOICE_B2B" ? (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
        B2B Invoice
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
        B2C QRIS
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Riwayat Transaksi</h1>
        <p className="text-xs text-gray-500 mt-1">Daftar rekonsiliasi pembayaran B2C QRIS dan invoice tagihan korporat B2B.</p>
      </div>

      {loading ? (
        <div className="text-gray-400 py-10 text-center">Memuat daftar transaksi...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID Transaksi</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Metode</th>
                <th className="px-6 py-4">Total Pembayaran</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-gray-900">{tx.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{tx.userEmail}</div>
                  </td>
                  <td className="px-6 py-4">{getPaymentMethodBadge(tx.paymentMethod)}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(tx.amount)}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">{tx.date}</td>
                  <td className="px-6 py-4 text-right">{getStatusBadge(tx.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
