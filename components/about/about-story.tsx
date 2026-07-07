export default function AboutStory() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              আমাদের গল্প
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                NeedProduct-এর যাত্রা শুরু একটি সহজ লক্ষ্য নিয়ে — মানুষের প্রয়োজনীয় পণ্য
                সহজে, সাশ্রয়ী দামে আর নির্ভরযোগ্যভাবে পৌঁছে দেওয়া। রাজশাহী থেকে শুরু করে
                আজ আমরা সারা বাংলাদেশে সেবা দিচ্ছি।
              </p>
              <p>
                আমরা বিশ্বাস করি, ভালো পণ্য কেনার অভিজ্ঞতা হওয়া উচিত ঝামেলামুক্ত। তাই
                আমরা ক্যাশ অন ডেলিভারি সুবিধা রেখেছি — পণ্য হাতে পেয়ে, দেখে, তারপর
                টাকা পরিশোধ করুন।
              </p>
              <p>
                প্রতিটি পণ্য যাচাই করে, মান নিশ্চিত করে আমরা আপনার কাছে পৌঁছে দিই।
                আপনার সন্তুষ্টিই আমাদের সবচেয়ে বড় অর্জন।
              </p>
            </div>
          </div>
          <div className="relative">
            {/* নিজের ছবি বসাও */}
            <img
              src="/images/016e9485-9d7a-424f-b18b-21feb177fab3.jfif"
              alt="NeedProduct Story"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}