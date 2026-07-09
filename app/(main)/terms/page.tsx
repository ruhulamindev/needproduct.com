import Link from "next/link"
import { FileText } from "lucide-react"

export const metadata = {
  title: "Terms of Service — NeedProduct",
  description: "NeedProduct-এর সেবার শর্তাবলী",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-full mb-4">
            <FileText className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">সেবার শর্তাবলী</h1>
          <p className="text-slate-300 text-sm mt-2">
            সর্বশেষ আপডেট: জানুয়ারি ২০২৬
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-slate-700 leading-relaxed">
        <p>
          NeedProduct ওয়েবসাইট ব্যবহার করে বা অর্ডার করে আপনি নিচের শর্তাবলীর সাথে
          সম্মত হচ্ছেন। অনুগ্রহ করে মনোযোগ দিয়ে পড়ুন।
        </p>

        <Section title="১. অ্যাকাউন্ট">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>অ্যাকাউন্ট খোলার সময় সঠিক ও সত্য তথ্য দিতে হবে</li>
            <li>আপনার পাসওয়ার্ডের গোপনীয়তা রক্ষার দায়িত্ব আপনার</li>
            <li>ভুয়া তথ্য দিলে বা অপব্যবহার করলে আমরা অ্যাকাউন্ট বন্ধ করতে পারি</li>
          </ul>
        </Section>

        <Section title="২. পণ্য ও মূল্য">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>সব মূল্য বাংলাদেশি টাকায় (৳) উল্লেখ করা</li>
            <li>পণ্যের ছবি ও বিবরণ যথাসম্ভব নির্ভুল রাখার চেষ্টা করি, তবে সামান্য পার্থক্য থাকতে পারে</li>
            <li>মূল্য ও ছাড় যেকোনো সময় পরিবর্তন হতে পারে</li>
            <li>স্টক শেষ হলে অর্ডার বাতিল হতে পারে — সেক্ষেত্রে আমরা আপনাকে জানাব</li>
          </ul>
        </Section>

        <Section title="৩. অর্ডার ও পেমেন্ট">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>আমরা শুধুমাত্র <strong>ক্যাশ অন ডেলিভারি</strong> গ্রহণ করি</li>
            <li>পণ্য হাতে পেয়ে, দেখে, তারপর টাকা পরিশোধ করবেন</li>
            <li>অর্ডার নিশ্চিত করার আগে আমরা ফোনে যোগাযোগ করতে পারি</li>
            <li>ভুল বা অসম্পূর্ণ ঠিকানার কারণে ডেলিভারি ব্যর্থ হলে দায় গ্রাহকের</li>
          </ul>
        </Section>

        <Section title="৪. ডেলিভারি চার্জ">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>ঢাকার ভেতরে: <strong>৳60</strong></li>
            <li>ঢাকার বাইরে: <strong>৳120</strong></li>
            <li>ডেলিভারিতে সাধারণত ২–৫ কার্যদিবস সময় লাগে</li>
          </ul>
        </Section>

        <Section title="৫. অর্ডার বাতিল ও রিটার্ন">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>পণ্য পাঠানোর আগে যেকোনো সময় অর্ডার বাতিল করা যাবে</li>
            <li>পণ্য ত্রুটিপূর্ণ, ভাঙা বা ভুল হলে <strong>ডেলিভারির সময়েই</strong> জানাতে হবে</li>
            <li>ব্যবহৃত বা ক্ষতিগ্রস্ত পণ্য ফেরত নেওয়া হয় না</li>
            <li>রিটার্ন গ্রহণযোগ্য হলে পণ্য বদলে দেওয়া হবে বা টাকা ফেরত দেওয়া হবে</li>
          </ul>
        </Section>

        <Section title="৬. কুপন ও ছাড়">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>প্রতিটি কুপনের নিজস্ব শর্ত থাকতে পারে (ন্যূনতম কেনাকাটা, মেয়াদ)</li>
            <li>একটি অর্ডারে একটি কুপনই ব্যবহার করা যাবে</li>
            <li>কুপনের অপব্যবহার হলে তা বাতিল করার অধিকার আমাদের আছে</li>
          </ul>
        </Section>

        <Section title="৭. নিষিদ্ধ কার্যকলাপ">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>ভুয়া অর্ডার দেওয়া বা ইচ্ছাকৃতভাবে ডেলিভারি গ্রহণ না করা</li>
            <li>ওয়েবসাইটের কোনো ক্ষতি করার চেষ্টা করা</li>
            <li>অনুমতি ছাড়া আমাদের ছবি, লেখা বা কনটেন্ট ব্যবহার করা</li>
          </ul>
        </Section>

        <Section title="৮. দায়সীমা">
          <p>
            আমরা যথাসাধ্য চেষ্টা করি নির্ভুল সেবা দিতে। তবে অনিবার্য কারণে (প্রাকৃতিক দুর্যোগ,
            কুরিয়ার বিলম্ব ইত্যাদি) ডেলিভারিতে দেরি হলে NeedProduct দায়ী থাকবে না। আমাদের
            সর্বোচ্চ দায় পণ্যের মূল্যের মধ্যে সীমাবদ্ধ।
          </p>
        </Section>

        <Section title="৯. শর্ত পরিবর্তন">
          <p>
            আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করতে পারি। পরিবর্তনের পর ওয়েবসাইট
            ব্যবহার করলে ধরে নেওয়া হবে আপনি নতুন শর্তে সম্মত।
          </p>
        </Section>

        <Section title="১০. যোগাযোগ">
          <p>শর্তাবলী সংক্রান্ত যেকোনো প্রশ্নে —</p>
          <ul className="list-none space-y-1 mt-2">
            <li>📧 mdfoysalaliriyad8682@gmail.com</li>
            <li>📞 +8801789011141</li>
            <li>📍 রাজশাহী, বাংলাদেশ</li>
          </ul>
        </Section>

        <div className="border-t pt-6 text-center">
          <Link href="/privacy" className="text-red-600 hover:underline font-medium">
            Privacy Policy দেখুন →
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