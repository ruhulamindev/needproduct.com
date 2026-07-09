import Link from "next/link"
import { Shield } from "lucide-react"

export const metadata = {
  title: "Privacy Policy — NeedProduct",
  description: "NeedProduct-এর গোপনীয়তা নীতি",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-full mb-4">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">গোপনীয়তা নীতি</h1>
          <p className="text-slate-300 text-sm mt-2">
            সর্বশেষ আপডেট: জানুয়ারি ২০২৬
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-slate-700 leading-relaxed">
        <p>
          NeedProduct-এ আপনাকে স্বাগতম। আপনার ব্যক্তিগত তথ্যের গোপনীয়তা আমাদের কাছে
          অত্যন্ত গুরুত্বপূর্ণ। এই নীতিতে বর্ণনা করা হয়েছে আমরা কী তথ্য সংগ্রহ করি,
          কেন করি, এবং কীভাবে তা সুরক্ষিত রাখি।
        </p>

        <Section title="১. আমরা যে তথ্য সংগ্রহ করি">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>ব্যক্তিগত তথ্য:</strong> নাম, ফোন নম্বর, ইমেইল, ডেলিভারি ঠিকানা</li>
            <li><strong>অর্ডার তথ্য:</strong> কেনা পণ্য, পরিমাণ, মূল্য, অর্ডারের তারিখ</li>
            <li><strong>ব্রাউজিং তথ্য:</strong> কোন পণ্য দেখেছেন, cart ও wishlist-এ কী রেখেছেন</li>
          </ul>
        </Section>

        <Section title="২. তথ্য কেন সংগ্রহ করি">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>আপনার অর্ডার প্রক্রিয়াকরণ ও ডেলিভারি সম্পন্ন করতে</li>
            <li>অর্ডার সংক্রান্ত বিষয়ে আপনার সাথে যোগাযোগ করতে (ফোন/WhatsApp)</li>
            <li>গ্রাহকসেবা প্রদান ও সমস্যার সমাধান করতে</li>
            <li>আমাদের সেবার মান উন্নত করতে</li>
          </ul>
        </Section>

        <Section title="৩. তথ্য শেয়ার করা">
          <p>
            আমরা আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে <strong>বিক্রি করি না</strong>।
            শুধুমাত্র নিম্নলিখিত ক্ষেত্রে তথ্য শেয়ার করা হতে পারে:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>ডেলিভারি সম্পন্ন করতে কুরিয়ার সার্ভিসের সাথে (নাম, ফোন, ঠিকানা)</li>
            <li>আইনগত বাধ্যবাধকতা থাকলে সংশ্লিষ্ট কর্তৃপক্ষের কাছে</li>
          </ul>
        </Section>

        <Section title="৪. ক্যাশ অন ডেলিভারি">
          <p>
            আমরা শুধুমাত্র <strong>ক্যাশ অন ডেলিভারি</strong> পদ্ধতি ব্যবহার করি। এর মানে
            আমরা আপনার কোনো <strong>কার্ড বা ব্যাংক অ্যাকাউন্টের তথ্য সংগ্রহ বা সংরক্ষণ করি না</strong>।
            পণ্য হাতে পাওয়ার পরই আপনি টাকা পরিশোধ করবেন।
          </p>
        </Section>

        <Section title="৫. তথ্য সংরক্ষণ ও নিরাপত্তা">
          <p>
            আপনার তথ্য সুরক্ষিত রাখতে আমরা যুক্তিসঙ্গত প্রযুক্তিগত ও প্রশাসনিক ব্যবস্থা গ্রহণ করি।
            তবে ইন্টারনেটে কোনো ব্যবস্থাই শতভাগ নিরাপদ নয় — তাই সম্পূর্ণ নিরাপত্তার নিশ্চয়তা
            দেওয়া সম্ভব নয়।
          </p>
        </Section>

        <Section title="৬. আপনার অধিকার">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>আপনার সম্পর্কে সংরক্ষিত তথ্য জানতে চাওয়া</li>
            <li>ভুল তথ্য সংশোধন করতে বলা</li>
            <li>আপনার অ্যাকাউন্ট ও তথ্য মুছে ফেলার অনুরোধ করা</li>
          </ul>
          <p className="mt-2">
            এসবের জন্য আমাদের সাথে{" "}
            <Link href="/contact" className="text-red-600 hover:underline">
              যোগাযোগ
            </Link>{" "}
            করুন।
          </p>
        </Section>

        <Section title="৭. কুকিজ (Cookies)">
          <p>
            আপনার cart ও wishlist মনে রাখতে আমরা ব্রাউজারের স্থানীয় সংরক্ষণ (localStorage)
            ব্যবহার করি। এই তথ্য শুধু আপনার ডিভাইসেই থাকে। ব্রাউজারের সেটিংস থেকে আপনি
            যেকোনো সময় তা মুছে ফেলতে পারেন।
          </p>
        </Section>

        <Section title="৮. নীতির পরিবর্তন">
          <p>
            আমরা এই নীতি সময়ে সময়ে হালনাগাদ করতে পারি। পরিবর্তন হলে এই পাতায় নতুন
            তারিখ সহ প্রকাশ করা হবে।
          </p>
        </Section>

        <Section title="৯. যোগাযোগ">
          <p>
            গোপনীয়তা সংক্রান্ত যেকোনো প্রশ্নে আমাদের জানান —
          </p>
          <ul className="list-none space-y-1 mt-2">
            <li>📧 mdfoysalaliriyad8682@gmail.com</li>
            <li>📞 +8801789011141</li>
            <li>📍 রাজশাহী, বাংলাদেশ</li>
          </ul>
        </Section>

        <div className="border-t pt-6 text-center">
          <Link href="/terms" className="text-red-600 hover:underline font-medium">
            Terms of Service দেখুন →
          </Link>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-800 mb-3">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  )
}