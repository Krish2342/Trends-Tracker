"use client"

import { useState, useEffect, useRef } from "react"

interface WebSocketData {
  type: string
  data: any
  timestamp: number
}

export function useWebSocket(url?: string) {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketData | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("disconnected")
  const ws = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  // Simulate WebSocket connection for demo purposes
  useEffect(() => {
    if (!url) return

    const connect = () => {
      setConnectionStatus("connecting")

      // Simulate connection delay
      setTimeout(() => {
        setIsConnected(true)
        setConnectionStatus("connected")

        // Simulate receiving messages
        const messageInterval = setInterval(() => {
          const mockMessage: WebSocketData = {
            type: "trend_update",
            data: {
              query: `Live Update ${Date.now()}`,
              searches: `${Math.floor(Math.random() * 5000)}K+`,
              change: `+${Math.floor(Math.random() * 500)}%`,
            },
            timestamp: Date.now(),
          }
          setLastMessage(mockMessage)
        }, 3000)

        // Simulate occasional disconnections
        const disconnectTimeout = setTimeout(
          () => {
            setIsConnected(false)
            setConnectionStatus("disconnected")
            clearInterval(messageInterval)

            // Auto-reconnect after 5 seconds
            reconnectTimeoutRef.current = setTimeout(connect, 5000)
          },
          Math.random() * 60000 + 30000,
        ) // Disconnect after 30-90 seconds

        return () => {
          clearInterval(messageInterval)
          clearTimeout(disconnectTimeout)
        }
      }, 1000)
    }

    connect()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      setIsConnected(false)
      setConnectionStatus("disconnected")
    }
  }, [url])

  return {
    isConnected,
    lastMessage,
    connectionStatus,
  }
}
