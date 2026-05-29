import { Code, Terminal, Server, Key, Copy, CheckCircle2 } from "lucide-react"

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl animate-in fade-in duration-500">
      
      <div className="mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-xl mb-6">
          <Terminal className="w-8 h-8 text-purple-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">API Documentation</h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          Integrate TrendsTracker's powerful real-time analytics directly into your own applications using our REST API.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <div className="sticky top-24 space-y-1">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-2">Getting Started</h4>
            <a href="#authentication" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Authentication</a>
            <a href="#rate-limits" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Rate Limits</a>
            
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mt-6 mb-2">Endpoints</h4>
            <a href="#get-trends" className="block px-3 py-2 text-sm text-purple-400 bg-purple-500/10 rounded-lg transition-colors">GET /v1/trends</a>
            <a href="#get-realtime" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">GET /v1/realtime</a>
            <a href="#get-compare" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">GET /v1/compare</a>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-12">
          
          <section id="authentication" className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-gray-400" /> Authentication
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              All API requests require a Bearer token passed in the <code className="bg-black border border-white/10 px-1.5 py-0.5 rounded text-gray-300">Authorization</code> header. 
              You can generate an API key from your Profile Settings.
            </p>
            <div className="bg-black/80 border border-white/10 rounded-xl p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>
<span className="text-pink-400">curl</span> -X GET \{"\n"}
  https://api.trendstracker.in/v1/trends \{"\n"}
  -H <span className="text-green-400">'Authorization: Bearer YOUR_API_KEY'</span>
                </code>
              </pre>
            </div>
          </section>

          <section id="get-trends" className="space-y-4 pt-8 border-t border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded">GET</span>
              <h2 className="text-2xl font-bold text-white">/v1/trends</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Retrieve the top trending search queries for a specific region over a given timeframe.
            </p>
            
            <h4 className="text-sm font-semibold text-white mt-6 mb-3">Query Parameters</h4>
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Parameter</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">region</td>
                    <td className="px-4 py-3 text-gray-500">string</td>
                    <td className="px-4 py-3">Region code (e.g. <code className="text-xs">IN</code>, <code className="text-xs">US</code>). Default is <code className="text-xs">IN</code>.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">limit</td>
                    <td className="px-4 py-3 text-gray-500">integer</td>
                    <td className="px-4 py-3">Max results to return (1-50). Default is 10.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-sm font-semibold text-white mt-6 mb-3">Response</h4>
            <div className="bg-black/80 border border-white/10 rounded-xl p-4 overflow-x-auto relative group">
              <button className="absolute top-3 right-3 p-1.5 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20">
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
              <pre className="text-sm text-gray-300">
                <code>
&#123;{"\n"}
  <span className="text-purple-400">"status"</span>: <span className="text-green-400">"success"</span>,{"\n"}
  <span className="text-purple-400">"data"</span>: [
    &#123;
      <span className="text-purple-400">"query"</span>: <span className="text-green-400">"IPL Final 2025"</span>,
      <span className="text-purple-400">"volume"</span>: <span className="text-yellow-400">2500000</span>,
      <span className="text-purple-400">"trend"</span>: <span className="text-green-400">"up"</span>
    &#125;
  ]{"\n"}
&#125;
                </code>
              </pre>
            </div>
          </section>

          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-4 mt-12">
            <Server className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-bold mb-1">Need higher rate limits?</h4>
              <p className="text-sm text-gray-400 mb-3">Our Pro plan offers up to 10,000 requests per minute with guaranteed 99.9% uptime SLAs.</p>
              <button className="text-sm text-blue-400 font-medium hover:text-blue-300">Contact Sales &rarr;</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
