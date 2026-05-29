"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, BarChart3, Heart } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"

export function UserProfile() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full group p-0 border border-white/5 hover:border-blue-500/50 transition-colors app-glow-animate">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-72 bg-black/85 border border-white/10 backdrop-blur-xl rounded-2xl p-2 shadow-[0_10px_40px_rgba(59,130,246,0.15)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95" 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal p-3 rounded-xl bg-white/5 border border-white/5 mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border border-white/10 shadow-lg">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1 overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white leading-none truncate max-w-[120px]">{user.name}</span>
                <Badge className="text-[9px] px-1.5 py-0 h-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 font-medium tracking-wide">
                  PRO
                </Badge>
              </div>
              <span className="text-xs text-gray-400 truncate leading-none">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <div className="px-1 py-1">
          <DropdownMenuItem onClick={() => router.push("/profile?tab=profile")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer transition-all duration-200 group border border-transparent hover:border-white/5 hover:translate-x-1">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <User className="h-4 w-4" />
            </div>
            <span className="font-medium">Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => router.push("/profile?tab=trends")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer transition-all duration-200 group border border-transparent hover:border-white/5 hover:translate-x-1 mt-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <BarChart3 className="h-4 w-4" />
            </div>
            <span className="font-medium">My Trends</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => router.push("/profile?tab=favorites")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer transition-all duration-200 group border border-transparent hover:border-white/5 hover:translate-x-1 mt-1">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(244,63,94,0.2)]">
              <Heart className="h-4 w-4" />
            </div>
            <span className="font-medium">Favorites</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => router.push("/profile?tab=settings")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white cursor-pointer transition-all duration-200 group border border-transparent hover:border-white/5 hover:translate-x-1 mt-1">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              <Settings className="h-4 w-4" />
            </div>
            <span className="font-medium">Settings</span>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="bg-white/10 mx-2" />
        
        <div className="px-1 py-1">
          <DropdownMenuItem onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-300 cursor-pointer transition-all duration-200 group border border-transparent hover:border-red-500/20 hover:translate-x-1 mt-1">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(248,113,113,0.2)]">
              <LogOut className="h-4 w-4" />
            </div>
            <span className="font-medium">Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
