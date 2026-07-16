"use client";

import React, { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Tag } from "lucide-react";

interface CheckoutSummaryProps {
  subtotal: number;
  onCheckout: (couponCode?: string) => void;
}

export function CheckoutSummary({ subtotal, onCheckout }: CheckoutSummaryProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = () => {
    setCouponError("");
    // Mock coupons: VENTURO20 (20% off), MERDEKA (50000 flat off)
    if (couponCode.toUpperCase() === "VENTURO20") {
      setDiscount(subtotal * 0.2);
      setAppliedCoupon(couponCode.toUpperCase());
    } else if (couponCode.toUpperCase() === "MERDEKA") {
      setDiscount(Math.min(50000, subtotal));
      setAppliedCoupon(couponCode.toUpperCase());
    } else {
      setCouponError("Kode kupon tidak valid.");
      setDiscount(0);
      setAppliedCoupon(null);
    }
  };

  const total = subtotal - discount;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
        Ringkasan Pembayaran
      </h3>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600 font-medium">
            <span>Diskon ({appliedCoupon})</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between border-t border-gray-100 pt-4 text-base font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Punya Kode Promo?
        </label>
        <div className="mt-1.5 flex gap-2">
          <Input
            placeholder="Contoh: VENTURO20"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            icon={<Tag className="h-4 w-4" />}
            className="flex-1"
          />
          <Button variant="outline" size="sm" onClick={handleApplyCoupon}>
            Terapkan
          </Button>
        </div>
        {couponError && (
          <p className="mt-1.5 text-xs text-red-600">{couponError}</p>
        )}
        {appliedCoupon && (
          <p className="mt-1.5 text-xs text-green-600">
            Kupon {appliedCoupon} berhasil diterapkan!
          </p>
        )}
      </div>

      <Button
        className="mt-6 w-full py-2.5"
        onClick={() => onCheckout(appliedCoupon || undefined)}
      >
        Bayar Sekarang
      </Button>
    </div>
  );
}
