import { ShieldCheck, Lock, EyeOff, Instagram, Linkedin, X } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl animate-in fade-in duration-500">
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-400">Last Updated: October 15, 2025</p>
      </div>

      <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400">
        <p className="lead text-lg mb-8">
          At TrendsTracker, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our analytics platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 not-prose">
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
            <Lock className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-white font-bold mb-2">Secure by Default</h3>
            <p className="text-sm text-gray-400">All data transfers are encrypted via TLS 1.3. We use industry standard security to protect your account.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
            <EyeOff className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-white font-bold mb-2">No Tracking Sold</h3>
            <p className="text-sm text-gray-400">We do not sell your personal data or search history to third-party advertisers or data brokers.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4 border-b border-white/10 pb-2">1. Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect includes:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
          <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-4 border-b border-white/10 pb-2">2. Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Create and manage your account.</li>
          <li>Process your subscription payments and refunds.</li>
          <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.</li>
          <li>Email you regarding your account or order.</li>
          <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
        </ul>

        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl my-8 not-prose">
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            GDPR & CCPA Compliance
          </h4>
          <p className="text-sm text-gray-300">
            TrendsTracker is fully compliant with global privacy regulations including GDPR and CCPA. You have the right to request deletion of your data at any time through your Profile Settings dashboard.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4 border-b border-white/10 pb-2">3. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact our Data Protection Officer at:
        </p>
        
        <div className="bg-black/50 border border-white/10 p-6 rounded-xl not-prose mt-4 inline-block min-w-[300px]">
          <p className="text-gray-300 font-medium mb-3">TrendsTracker Data Privacy</p>
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              Email: <a href="mailto:pkrish2304@gmail.com" className="text-blue-400 hover:underline">pkrish2304@gmail.com</a>
            </p>
            
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-2 uppercase font-semibold tracking-wider">Connect with me</p>
              <div className="flex space-x-4">
                <Link href="https://x.com/krishh2304?t=W64Fyjp518hhB0luIx5tNQ&s=09" className="text-gray-400 hover:text-white transition-colors" target="_blank">
                  <X className="h-5 w-5" />
                </Link>
                <Link href="https://www.linkedin.com/in/krish-p-b15609335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-blue-400 transition-colors" target="_blank">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="https://www.instagram.com/__krishh_23?igsh=MTNxNXU4aTJjY2kyag==" className="text-gray-400 hover:text-pink-400 transition-colors" target="_blank">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
