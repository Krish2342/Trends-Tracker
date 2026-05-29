"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Settings, 
  BarChart3, 
  Heart, 
  X, 
  Lock, 
  ShieldCheck, 
  Mail, 
  Calendar,
  History,
  Trash2,
  ExternalLink,
  Sliders,
  Bell,
  RefreshCw,
  Sparkles,
  Check
} from "lucide-react"

interface AccountSettingsDialogProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: "profile" | "trends" | "favorites" | "settings"
}

const PRESET_AVATARS = [
  { name: "Blue Pulse", url: "https://avatar.vercel.sh/krish" },
  { name: "Emerald Cyber", url: "https://avatar.vercel.sh/matrix" },
  { name: "Rose Neon", url: "https://avatar.vercel.sh/neon" },
  { name: "Amethyst Glow", url: "https://avatar.vercel.sh/cyber" },
  { name: "Carbon Shadow", url: "https://avatar.vercel.sh/shadow" },
]

export function AccountSettingsDialog({ isOpen, onClose, initialTab = "profile" }: AccountSettingsDialogProps) {
  const { 
    user, 
    searchHistory, 
    favorites, 
    clearSearchHistory, 
    toggleFavorite, 
    updateUserProfile, 
    updateUserPassword 
  } = useAuth()

  const [activeTab, setActiveTab] = useState<"profile" | "trends" | "favorites" | "settings">(initialTab)
  
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
  }, [user, isOpen])

  // Sync tab on initial opening
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
    }
  }, [isOpen, initialTab])

  if (!isOpen || !user) return null

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
    window.location.href = `/search?q=${encodeURIComponent(trend)}`
    onClose()
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300 animate-in fade-in">
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-black/90 border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row h-[600px] animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sidebar Nav */}
        <div className="w-full md:w-64 border-r border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between shrink-0">
          <div>
            {/* Header / Brand */}
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="font-bold text-sm text-gray-300 tracking-wider uppercase">User Command Center</span>
            </div>

            {/* User card mini */}
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl mb-6">
              <Avatar className="h-10 w-10 border border-white/10">
                <AvatarImage src={selectedAvatar || user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <div className="flex items-center gap-1.5">
                  <Badge className="text-[9px] px-1 py-0 h-3.5 bg-blue-500/20 text-blue-300 border border-blue-500/30">PRO</Badge>
                  <span className="text-[10px] text-gray-400">Verified Account</span>
                </div>
              </div>
            </div>

            {/* Nav List */}
            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === "profile" 
                    ? "bg-blue-600 text-white font-semibold app-glow" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("trends")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === "trends" 
                    ? "bg-emerald-600 text-white font-semibold app-glow" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>My Trends</span>
                {searchHistory.length > 0 && (
                  <Badge variant="secondary" className="ml-auto bg-white/10 text-white text-[10px] px-1.5 py-0 h-4 rounded-full">
                    {searchHistory.length}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => setActiveTab("favorites")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === "favorites" 
                    ? "bg-rose-600 text-white font-semibold app-glow" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <Badge variant="secondary" className="ml-auto bg-white/10 text-white text-[10px] px-1.5 py-0 h-4 rounded-full">
                    {favorites.length}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === "settings" 
                    ? "bg-purple-600 text-white font-semibold app-glow" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Footer inside sidebar */}
          <div className="text-[10px] text-gray-500 pt-4 border-t border-white/5">
            <p>TrendsTracker Platform v0.1</p>
            <p className="mt-0.5">Secure sandbox connection active</p>
          </div>
        </div>

        {/* Content Pane */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-black">
          <div>
            
            {/* Tab: Profile */}
            {activeTab === "profile" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 pb-8">
                
                {/* Profile Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <User className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Profile Details
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Manage public identifiers, security passwords, and customized avatars</p>
                  </div>
                </div>

                <form onSubmit={handleProfileSave} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[60px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                  
                  {/* Avatar Picker */}
                  <div className="space-y-4 relative z-10">
                    <Label className="text-gray-300 text-sm font-medium">Select Avatar Style</Label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-black/40 p-5 rounded-xl border border-white/5">
                      <Avatar className="h-20 w-20 border-2 border-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <AvatarImage src={selectedAvatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-2xl">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-wrap gap-3">
                        {PRESET_AVATARS.map((avatar) => (
                          <button
                            key={avatar.name}
                            type="button"
                            onClick={() => setSelectedAvatar(avatar.url)}
                            className={`w-12 h-12 rounded-full border-2 overflow-hidden relative ${
                              selectedAvatar === avatar.url ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#111] border-transparent scale-110 shadow-lg shadow-blue-500/30" : "border-white/10 hover:border-white/30 hover:scale-105"
                            } transition-all duration-300`}
                          >
                            <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                            {selectedAvatar === avatar.url && (
                              <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center backdrop-blur-[1px]">
                                <Check className="w-5 h-5 text-white stroke-[3]" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-2">
                      <Label htmlFor="prof-name" className="text-gray-300 text-sm font-medium">Full Name</Label>
                      <Input 
                        id="prof-name"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="bg-black/50 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500/20 h-11 transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300 text-sm font-medium">Email Address (Readonly)</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                        <Input 
                          value={user.email} 
                          disabled 
                          className="pl-10 h-11 bg-black/30 border-white/5 text-gray-500 cursor-not-allowed opacity-70"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Meta stats */}
                  <div className="flex flex-wrap items-center gap-4 pt-2 pb-2 text-sm text-gray-400 relative z-10">
                    <span className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Role: Pro Administrator
                    </span>
                    <span className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      Joined: {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric", day: "numeric" })}
                    </span>
                  </div>

                  {/* Errors / Success */}
                  {profileError && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 relative z-10"><X className="w-4 h-4"/> {profileError}</p>}
                  {profileSuccess && <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-2 relative z-10"><Check className="w-4 h-4"/> {profileSuccess}</p>}

                  <div className="flex justify-end pt-2 relative z-10">
                    <Button type="submit" disabled={isProfileSaving} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-0 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 px-6 h-11 rounded-xl font-medium">
                      {isProfileSaving ? "Saving..." : "Update Credentials"}
                    </Button>
                  </div>
                </form>

                {/* Password section */}
                <form onSubmit={handlePasswordSave} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 blur-[60px] pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500"></div>
                  
                  <div className="relative z-10 flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                      <Lock className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        Security & Password
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">Submit current password and set a new credential below</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="curr-pass" className="text-gray-300 text-sm font-medium">Current Password</Label>
                      <Input 
                        id="curr-pass"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-black/50 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-11 transition-all md:w-1/2"
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
                        className="bg-black/50 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-11 transition-all"
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
                        className="bg-black/50 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-11 transition-all"
                        placeholder="Re-type new password"
                      />
                    </div>
                  </div>

                  {passwordError && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 relative z-10"><X className="w-4 h-4"/> {passwordError}</p>}
                  {passwordSuccess && <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-2 relative z-10"><Check className="w-4 h-4"/> {passwordSuccess}</p>}

                  <div className="flex justify-end pt-2 relative z-10">
                    <Button type="submit" disabled={isPasswordSaving} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300 px-6 h-11 rounded-xl font-medium">
                      {isPasswordSaving ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Tab: My Trends */}
            {activeTab === "trends" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <History className="text-emerald-400 w-5 h-5" />
                      Search History logs
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Interactive archive of your search logs. Click to search again.</p>
                  </div>
                  {searchHistory.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearSearchHistory}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear History
                    </Button>
                  )}
                </div>

                {searchHistory.length === 0 ? (
                  <div className="text-center py-16 border border-white/5 rounded-2xl bg-white/[0.01]">
                    <History className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-400">No search logs registered</p>
                    <p className="text-xs text-gray-500 mt-1">Start entering trends to populate this list dynamically!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-2">
                    {searchHistory.map((item, index) => (
                      <div 
                        key={`${item}-${index}`}
                        className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 hover:border-emerald-500/30 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                      >
                        <div 
                          onClick={() => handleTrendClick(item)}
                          className="flex items-center gap-3 flex-1 min-w-0"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm text-gray-300 font-medium truncate group-hover:text-white transition-colors">{item}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTrendClick(item)}
                            className="p-1.5 rounded-md hover:bg-white/5 text-gray-500 hover:text-blue-400 transition-colors"
                            title="Analyze trend"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Favorites */}
            {activeTab === "favorites" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Heart className="text-rose-400 w-5 h-5" />
                    Favorite Keywords
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Saved topics of high-interest. Click to monitor metrics instantly.</p>
                </div>

                {favorites.length === 0 ? (
                  <div className="text-center py-16 border border-white/5 rounded-2xl bg-white/[0.01]">
                    <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-400">Favorites list is empty</p>
                    <p className="text-xs text-gray-500 mt-1">Click favorite symbols on your analytics dashboard to seed this list!</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2.5 max-h-[380px] overflow-y-auto pr-2">
                    {favorites.map((fav) => (
                      <div 
                        key={fav}
                        className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/40 rounded-xl px-4 py-3 transition-all group shrink-0 cursor-pointer"
                      >
                        <span 
                          onClick={() => handleTrendClick(fav)}
                          className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors"
                        >
                          {fav}
                        </span>
                        
                        <div className="w-px h-4 bg-white/10"></div>

                        <button
                          onClick={() => toggleFavorite(fav)}
                          className="text-rose-400 hover:text-rose-300 p-0.5 rounded transition-colors"
                          title="Remove from favorites"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Settings */}
            {activeTab === "settings" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sliders className="text-purple-400 w-5 h-5" />
                    Dashboard Preferences
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Configure default queries, regional overlays, update frequencies, and premium visual features</p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Region Selector */}
                    <div className="space-y-2">
                      <Label className="text-white text-xs flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-gray-400" />
                        Default Filter Region
                      </Label>
                      <select 
                        value={defaultRegion}
                        onChange={(e) => setDefaultRegion(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-lg p-2.5 text-sm text-white focus:border-purple-400 focus:outline-none"
                      >
                        <option value="all-india" className="bg-black text-white">All India 🇮🇳</option>
                        <option value="north-india" className="bg-black text-white">North India</option>
                        <option value="south-india" className="bg-black text-white">South India</option>
                        <option value="west-india" className="bg-black text-white">West India</option>
                        <option value="east-india" className="bg-black text-white">East India</option>
                      </select>
                    </div>

                    {/* Auto-Refresh */}
                    <div className="space-y-2">
                      <Label className="text-white text-xs flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
                        Live-Data Refresh Freq
                      </Label>
                      <select 
                        value={autoRefresh}
                        onChange={(e) => setAutoRefresh(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-lg p-2.5 text-sm text-white focus:border-purple-400 focus:outline-none"
                      >
                        <option value="15" className="bg-black text-white">High (Every 15s)</option>
                        <option value="30" className="bg-black text-white">Balanced (Every 30s)</option>
                        <option value="60" className="bg-black text-white">Normal (Every 60s)</option>
                        <option value="off" className="bg-black text-white">Static Mode (No refresh)</option>
                      </select>
                    </div>

                    {/* Category Pref */}
                    <div className="space-y-2">
                      <Label className="text-white text-xs flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-gray-400" />
                        Preferred Analytics Stream
                      </Label>
                      <select 
                        value={categoryPref}
                        onChange={(e) => setCategoryPref(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-lg p-2.5 text-sm text-white focus:border-purple-400 focus:outline-none"
                      >
                        <option value="technology" className="bg-black text-white">Technology & Tech Startups</option>
                        <option value="sports" className="bg-black text-white">Sports & IPL Cricket</option>
                        <option value="entertainment" className="bg-black text-white">Entertainment & Bollywood</option>
                        <option value="lifestyle" className="bg-black text-white">Lifestyle & Traditions</option>
                      </select>
                    </div>

                    {/* Glow Selector toggle */}
                    <div className="space-y-2">
                      <Label className="text-white text-xs flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-gray-400" />
                        Neon Ambient Lighting
                      </Label>
                      <div className="flex items-center gap-3 p-2.5 bg-white/5 border border-white/10 rounded-lg h-[42px]">
                        <input
                          id="glow-chk"
                          type="checkbox"
                          checked={glowEnabled}
                          onChange={(e) => setGlowEnabled(e.target.checked)}
                          className="w-4 h-4 text-purple-600 border-white/20 rounded bg-white/5"
                        />
                        <label htmlFor="glow-chk" className="text-xs text-gray-300 font-medium cursor-pointer flex-1">
                          Activate interactive box-shadow glow
                        </label>
                      </div>
                    </div>
                  </div>

                  {settingsSuccess && <p className="text-xs text-green-400 bg-green-950/20 border border-green-500/20 rounded p-2">Dashboard preferences updated successfully!</p>}

                  <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white">
                    Save Preferences
                  </Button>
                </form>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  )
}
