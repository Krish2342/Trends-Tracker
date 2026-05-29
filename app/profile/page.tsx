"use client"

import { useState, useEffect, Suspense } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, Settings, BarChart3, Heart, Lock, ShieldCheck, Mail, Calendar,
  History, Trash2, ExternalLink, Sliders, Bell, RefreshCw, Sparkles, Check, X
} from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

const PRESET_AVATARS = [
  { name: "Blue Pulse", url: "https://avatar.vercel.sh/krish" },
  { name: "Emerald Cyber", url: "https://avatar.vercel.sh/matrix" },
  { name: "Rose Neon", url: "https://avatar.vercel.sh/neon" },
  { name: "Amethyst Glow", url: "https://avatar.vercel.sh/cyber" },
  { name: "Carbon Shadow", url: "https://avatar.vercel.sh/shadow" },
]

function ProfileContent() {
  const { 
    user, 
    searchHistory, 
    favorites, 
    clearSearchHistory, 
    toggleFavorite, 
    updateUserProfile, 
    updateUserPassword 
  } = useAuth()
  
  const searchParams = useSearchParams()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<"profile" | "trends" | "favorites" | "settings">(
    (searchParams.get("tab") as "profile" | "trends" | "favorites" | "settings") || "profile"
  )
  
  // Profile settings state
  const [profileName, setProfileName] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [profileError, setProfileError] = useState("")
  const [profileSuccess, setProfileSuccess] = useState("")
  const [isProfileSaving, setIsProfileSaving] = useState(false)

  // Password settings state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)

  // General settings state
  const [defaultRegion, setDefaultRegion] = useState("all-india")
  const [autoRefresh, setAutoRefresh] = useState("30")
  const [categoryPref, setCategoryPref] = useState("technology")
  const [glowEnabled, setGlowEnabled] = useState(true)
  const [settingsSuccess, setSettingsSuccess] = useState(false)

  // Initialize fields on open
  useEffect(() => {
    if (user) {
      setProfileName(user.name)
      setSelectedAvatar(user.avatar || "")
    }
  }, [user])

  // Update URL query when tab changes
  const handleTabChange = (tab: "profile" | "trends" | "favorites" | "settings") => {
    setActiveTab(tab)
    router.push(`/profile?tab=${tab}`, { scroll: false })
  }

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Lock className="w-16 h-16 text-gray-700 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
        <p className="text-gray-400 max-w-md">You need to be signed in to view and manage your profile settings.</p>
        <Button onClick={() => router.push("/")} className="mt-6 bg-blue-600 hover:bg-blue-500">Return Home</Button>
      </div>
    )
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileError("")
    setProfileSuccess("")
    setIsProfileSaving(true)

    if (!profileName.trim()) {
      setProfileError("Full Name cannot be empty")
      setIsProfileSaving(false)
      return
    }

    const result = await updateUserProfile(profileName.trim(), selectedAvatar)
    if (result.success) {
      setProfileSuccess("Profile successfully updated!")
      setTimeout(() => setProfileSuccess(""), 3000)
    } else {
      setProfileError(result.error || "Failed to update profile")
    }
    setIsProfileSaving(false)
  }

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")
    setIsPasswordSaving(true)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all password fields")
      setIsPasswordSaving(false)
      return
    }

    if (newPassword.length < 6) {
      setPasswordError("New Password must be at least 6 characters")
      setIsPasswordSaving(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      setIsPasswordSaving(false)
      return
    }

    const result = await updateUserPassword(currentPassword, newPassword)
    if (result.success) {
      setPasswordSuccess("Password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => setPasswordSuccess(""), 3000)
    } else {
      setPasswordError(result.error || "Incorrect current password")
    }
    setIsPasswordSaving(false)
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setSettingsSuccess(true)
    setTimeout(() => setSettingsSuccess(false), 3000)
  }

  const handleTrendClick = (trend: string) => {
    router.push(`/search?q=${encodeURIComponent(trend)}`)
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-8 relative">
        
        {/* Background Decorative Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        {/* Sidebar Nav */}
        <div className="w-full md:w-72 shrink-0 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
            {/* Header / Brand */}
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="font-bold text-sm text-gray-300 tracking-wider uppercase">User Command Center</span>
            </div>

            {/* User card mini */}
            <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-xl mb-8">
              <Avatar className="h-12 w-12 border-2 border-blue-500/50">
                <AvatarImage src={selectedAvatar || user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="text-[9px] px-1.5 py-0 h-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">PRO</Badge>
                  <span className="text-[10px] text-gray-400 truncate">Verified Account</span>
                </div>
              </div>
            </div>

            {/* Nav List */}
            <nav className="space-y-2">
              <button
                onClick={() => handleTabChange("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  activeTab === "profile" 
                    ? "bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => handleTabChange("trends")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  activeTab === "trends" 
                    ? "bg-emerald-600/20 text-emerald-400 font-semibold border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>My Trends</span>
                {searchHistory.length > 0 && (
                  <Badge className="ml-auto bg-black/50 text-gray-300 text-[10px] px-2 py-0.5 rounded-full border border-white/10">
                    {searchHistory.length}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => handleTabChange("favorites")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  activeTab === "favorites" 
                    ? "bg-rose-600/20 text-rose-400 font-semibold border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <Badge className="ml-auto bg-black/50 text-gray-300 text-[10px] px-2 py-0.5 rounded-full border border-white/10">
                    {favorites.length}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => handleTabChange("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  activeTab === "settings" 
                    ? "bg-purple-600/20 text-purple-400 font-semibold border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Preferences</span>
              </button>
            </nav>
            
            <div className="mt-8 pt-4 border-t border-white/10 text-center">
              <p className="text-[10px] text-gray-500">TrendsTracker Platform v1.0</p>
              <p className="text-[10px] text-emerald-500/70 mt-1 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secure Connection
              </p>
            </div>
          </div>
        </div>

        {/* Content Pane */}
        <div className="flex-1 min-w-0">
          
          {/* Tab: Profile */}
          {activeTab === "profile" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                  <User className="text-blue-400 w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">My Profile</h2>
                  <p className="text-gray-400 mt-1">Manage your public identifiers and security credentials</p>
                </div>
              </div>

              {/* Profile Details Form */}
              <form onSubmit={handleProfileSave} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[80px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                
                {/* Avatar Picker */}
                <div className="space-y-4 relative z-10">
                  <Label className="text-gray-300 text-sm font-medium">Avatar Style</Label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-8 bg-black/40 p-6 rounded-2xl border border-white/5">
                    <Avatar className="h-24 w-24 border-2 border-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                      <AvatarImage src={selectedAvatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-3xl">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-wrap gap-4">
                      {PRESET_AVATARS.map((avatar) => (
                        <button
                          key={avatar.name}
                          type="button"
                          onClick={() => setSelectedAvatar(avatar.url)}
                          className={`w-14 h-14 rounded-full border-2 overflow-hidden relative ${
                            selectedAvatar === avatar.url ? "ring-2 ring-blue-500 ring-offset-4 ring-offset-[#050505] border-transparent scale-110 shadow-lg shadow-blue-500/40" : "border-white/10 hover:border-white/40 hover:scale-105"
                          } transition-all duration-300`}
                        >
                          <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                          {selectedAvatar === avatar.url && (
                            <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center backdrop-blur-[2px]">
                              <Check className="w-6 h-6 text-white stroke-[3]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name field */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-2">
                    <Label htmlFor="prof-name" className="text-gray-300 text-sm font-medium">Full Name</Label>
                    <Input 
                      id="prof-name"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="bg-black/60 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500/20 h-12 text-base transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm font-medium">Email Address (Readonly)</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                      <Input 
                        value={user.email} 
                        disabled 
                        className="pl-12 h-12 text-base bg-black/40 border-white/5 text-gray-500 cursor-not-allowed opacity-70"
                      />
                    </div>
                  </div>
                </div>

                {/* Meta stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 relative z-10 pt-2">
                  <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-xl border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Role: <span className="text-gray-200">Pro Administrator</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-xl border border-white/5">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Joined: <span className="text-gray-200">{new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric", day: "numeric" })}</span>
                  </div>
                </div>

                {/* Errors / Success */}
                {profileError && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 relative z-10"><X className="w-5 h-5"/> {profileError}</p>}
                {profileSuccess && <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 relative z-10"><Check className="w-5 h-5"/> {profileSuccess}</p>}

                <div className="flex justify-end pt-4 border-t border-white/10 relative z-10">
                  <Button type="submit" disabled={isProfileSaving} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-0 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 px-8 h-12 rounded-xl font-semibold text-base">
                    {isProfileSaving ? "Saving..." : "Save Profile Details"}
                  </Button>
                </div>
              </form>

              {/* Password section */}
              <form onSubmit={handlePasswordSave} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 blur-[80px] pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-700"></div>
                
                <div className="relative z-10 flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Lock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Security & Password</h3>
                    <p className="text-gray-400 mt-1">Submit your current password to set a new credential</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="curr-pass" className="text-gray-300 text-sm font-medium">Current Password</Label>
                    <Input 
                      id="curr-pass"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-black/60 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-12 text-base transition-all md:w-1/2"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-pass" className="text-gray-300 text-sm font-medium">New Password</Label>
                    <Input 
                      id="new-pass"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-black/60 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-12 text-base transition-all"
                      placeholder="Min 6 characters"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="conf-pass" className="text-gray-300 text-sm font-medium">Confirm Password</Label>
                    <Input 
                      id="conf-pass"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-black/60 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-12 text-base transition-all"
                      placeholder="Re-type new password"
                    />
                  </div>
                </div>

                {passwordError && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 relative z-10"><X className="w-5 h-5"/> {passwordError}</p>}
                {passwordSuccess && <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 relative z-10"><Check className="w-5 h-5"/> {passwordSuccess}</p>}

                <div className="flex justify-end pt-4 border-t border-white/10 relative z-10">
                  <Button type="submit" disabled={isPasswordSaving} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 px-8 h-12 rounded-xl font-semibold text-base">
                    {isPasswordSaving ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Tab: My Trends */}
          {activeTab === "trends" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                    <History className="text-emerald-400 w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Search History</h2>
                    <p className="text-gray-400 mt-1">Interactive archive of your search logs. Click to analyze.</p>
                  </div>
                </div>
                {searchHistory.length > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={clearSearchHistory}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 h-11 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear History
                  </Button>
                )}
              </div>

              {searchHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 border border-white/5 rounded-3xl bg-white/[0.01] shadow-inner">
                  <History className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No search logs registered</h3>
                  <p className="text-gray-400 text-center max-w-sm">Start entering trends to populate this list dynamically! Your recent searches will appear here.</p>
                  <Button onClick={() => router.push("/")} className="mt-8 bg-emerald-600 hover:bg-emerald-500 rounded-xl px-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]">Start Searching</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchHistory.map((item, index) => (
                    <div 
                      key={`${item}-${index}`}
                      className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 hover:border-emerald-500/40 rounded-2xl hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all cursor-pointer group"
                      onClick={() => handleTrendClick(item)}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform shrink-0 border border-emerald-500/20">
                          {index + 1}
                        </div>
                        <span className="text-base text-gray-200 font-medium truncate group-hover:text-white transition-colors">{item}</span>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors ml-4 shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Favorites */}
          {activeTab === "favorites" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                  <Heart className="text-rose-400 w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Favorite Keywords</h2>
                  <p className="text-gray-400 mt-1">Saved topics of high-interest. Monitor metrics instantly.</p>
                </div>
              </div>

              {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 border border-white/5 rounded-3xl bg-white/[0.01] shadow-inner">
                  <Heart className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Favorites list is empty</h3>
                  <p className="text-gray-400 text-center max-w-sm">Click the heart symbol on your analytics dashboard to save your most monitored keywords.</p>
                  <Button onClick={() => router.push("/")} className="mt-8 bg-rose-600 hover:bg-rose-500 rounded-xl px-8 shadow-[0_0_15px_rgba(244,63,94,0.2)]">Find Trends</Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {favorites.map((fav) => (
                    <div 
                      key={fav}
                      className="flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-rose-500/50 rounded-2xl px-5 py-4 transition-all group cursor-pointer hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]"
                      onClick={() => handleTrendClick(fav)}
                    >
                      <Heart className="w-4 h-4 fill-rose-500/20 text-rose-400 group-hover:fill-rose-500/40 transition-colors" />
                      <span className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                        {fav}
                      </span>
                      <div className="w-px h-6 bg-white/10 mx-2"></div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(fav);
                        }}
                        className="text-gray-500 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 p-2 rounded-xl transition-all"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Settings */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                  <Sliders className="text-indigo-400 w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard Preferences</h2>
                  <p className="text-gray-400 mt-1">Configure default queries, overlays, and visual features</p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Region Selector */}
                  <div className="space-y-3">
                    <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-indigo-400" />
                      Default Filter Region
                    </Label>
                    <select 
                      value={defaultRegion}
                      onChange={(e) => setDefaultRegion(e.target.value)}
                      className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-base text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="all-india" className="bg-gray-900 text-white">All India 🇮🇳</option>
                      <option value="north-india" className="bg-gray-900 text-white">North India</option>
                      <option value="south-india" className="bg-gray-900 text-white">South India</option>
                      <option value="west-india" className="bg-gray-900 text-white">West India</option>
                      <option value="east-india" className="bg-gray-900 text-white">East India</option>
                    </select>
                  </div>

                  {/* Auto-Refresh */}
                  <div className="space-y-3">
                    <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-indigo-400" />
                      Live-Data Refresh Freq
                    </Label>
                    <select 
                      value={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.value)}
                      className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-base text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="15" className="bg-gray-900 text-white">High (Every 15s)</option>
                      <option value="30" className="bg-gray-900 text-white">Balanced (Every 30s)</option>
                      <option value="60" className="bg-gray-900 text-white">Normal (Every 60s)</option>
                      <option value="off" className="bg-gray-900 text-white">Static Mode (No refresh)</option>
                    </select>
                  </div>

                  {/* Category Pref */}
                  <div className="space-y-3">
                    <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-indigo-400" />
                      Preferred Analytics Stream
                    </Label>
                    <select 
                      value={categoryPref}
                      onChange={(e) => setCategoryPref(e.target.value)}
                      className="w-full h-12 bg-black/50 border border-white/10 rounded-xl px-4 text-base text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="technology" className="bg-gray-900 text-white">Technology & Tech Startups</option>
                      <option value="sports" className="bg-gray-900 text-white">Sports & IPL Cricket</option>
                      <option value="entertainment" className="bg-gray-900 text-white">Entertainment & Bollywood</option>
                      <option value="lifestyle" className="bg-gray-900 text-white">Lifestyle & Traditions</option>
                    </select>
                  </div>

                  {/* Glow Selector toggle */}
                  <div className="space-y-3">
                    <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-400" />
                      Neon Ambient Lighting
                    </Label>
                    <div className="flex items-center gap-4 px-4 h-12 bg-black/50 border border-white/10 rounded-xl hover:border-indigo-500/30 transition-colors cursor-pointer" onClick={() => setGlowEnabled(!glowEnabled)}>
                      <input
                        id="glow-chk"
                        type="checkbox"
                        checked={glowEnabled}
                        onChange={(e) => setGlowEnabled(e.target.checked)}
                        className="w-5 h-5 text-indigo-600 border-white/20 rounded bg-white/5 pointer-events-none"
                      />
                      <label htmlFor="glow-chk" className="text-sm text-gray-300 font-medium flex-1 pointer-events-none">
                        Activate interactive box-shadow glow
                      </label>
                    </div>
                  </div>
                </div>

                {settingsSuccess && <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-2 mt-8"><Check className="w-5 h-5"/> Dashboard preferences updated successfully!</p>}

                <div className="flex justify-end pt-8 mt-8 border-t border-white/10">
                  <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300 px-8 h-12 rounded-xl font-semibold text-base">
                    Save Preferences
                  </Button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-gray-400"><RefreshCw className="w-8 h-8 animate-spin" /></div>}>
      <ProfileContent />
    </Suspense>
  )
}
