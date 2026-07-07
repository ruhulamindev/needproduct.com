// lib/coupons.ts

export type Coupon = {
  code: string
  type: "percent" | "fixed"
  value: number
  minPurchase?: number
  label: string
}

// 🔴 এখানে তোমার coupon গুলো যোগ/বাদ করো
export const COUPONS: Coupon[] = [
  { code: "AB72CD", type: "percent", value: 20, label: "20% ছাড়" },
  { code: "SAVE10", type: "percent", value: 10, label: "10% ছাড়" },
  { code: "FLAT100", type: "fixed", value: 100, minPurchase: 500, label: "৳100 ছাড় (৳500+)" },
  { code: "NEWYEAR", type: "percent", value: 25, minPurchase: 1000, label: "25% ছাড় (৳1000+)" },
]

// dropdown-এ দেখানোর টেক্সট (যেমন "AB72CD — 20%")
export function couponDisplay(c: Coupon) {
  const val = c.type === "percent" ? `${c.value}%` : `৳${c.value}`
  return `${c.code} — ${val}`
}

// coupon যাচাই করে ছাড়ের পরিমাণ ফেরত দেয়
export function validateCoupon(code: string, subtotal: number) {
  const coupon = COUPONS.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase()
  )

  if (!coupon) {
    return { valid: false, discount: 0, message: "কুপন কোডটি সঠিক নয়।" }
  }

  if (coupon.minPurchase && subtotal < coupon.minPurchase) {
    return {
      valid: false,
      discount: 0,
      message: `এই কুপনের জন্য ন্যূনতম ৳${coupon.minPurchase} কেনাকাটা লাগবে।`,
    }
  }

  const discount =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value

  return {
    valid: true,
    discount,
    message: `"${coupon.code}" প্রয়োগ হয়েছে — ${coupon.label}!`,
    coupon,
  }
}