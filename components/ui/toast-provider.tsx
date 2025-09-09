import * as React from "react"
import { Toast, ToastTitle, ToastDescription } from "./toast"
import { cn } from "@/lib/utils"

interface ToastData {
  id: string
  title: string
  description?: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
}

interface ToastContextType {
  toasts: ToastData[]
  addToast: (toast: Omit<ToastData, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  const addToast = React.useCallback((toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove after duration
    const duration = toast.duration || 3000
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ 
  toasts, 
  onRemove 
}: { 
  toasts: ToastData[]
  onRemove: (id: string) => void 
}) {
  return (
    <div className="toast-container fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          className="animate-slide-in-right"
        >
          <div className="flex-1">
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description && (
              <ToastDescription>{toast.description}</ToastDescription>
            )}
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="absolute right-2 top-2 text-lg hover:opacity-70"
          >
            ×
          </button>
        </Toast>
      ))}
    </div>
  )
}
