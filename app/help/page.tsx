"use client"

import { useState } from "react"
import { LifeBuoy, Mail, MessageSquare, FileText, ChevronRight, Send, Check } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("general")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message })
      })

      if (response.ok) {
        setIsSent(true)
        setName("")
        setEmail("")
        setSubject("general")
        setMessage("")
        setTimeout(() => setIsSent(false), 5000)
      } else {
        alert("Failed to send message. Please try again later.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-2xl mb-6">
          <LifeBuoy className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How can we help?</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Whether you have a question about our analytics, need technical assistance, or want to report an issue, our support team is here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Quick Links */}
        <div className="md:col-span-1 space-y-4">
          <h3 className="text-xl font-bold text-white mb-6">Self-Serve Support</h3>
          
          <Link href="/api-docs" className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-xl group transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Documentation</h4>
                <p className="text-xs text-gray-500">Read the API guides</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
          </Link>
          
          <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-xl group transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Community Discord</h4>
                <p className="text-xs text-gray-500">Chat with other users</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none"></div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Send a Ticket</h3>
            <p className="text-gray-400 text-sm mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

            {isSent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-gray-400">We've received your request and will contact you shortly.</p>
                <button onClick={() => setIsSent(false)} className="mt-6 text-sm text-blue-400 hover:text-blue-300">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Subject</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Issue</option>
                    <option value="bug">Report a Bug</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Message</label>
                  <textarea 
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
