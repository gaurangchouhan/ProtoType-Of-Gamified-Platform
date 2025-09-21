"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function BiometricLogin() {
  const [isScanning, setIsScanning] = useState(false)

  const handleBiometricLogin = async (type: "fingerprint" | "face" | "voice") => {
    setIsScanning(true)
    // Simulate biometric scanning
    setTimeout(() => {
      setIsScanning(false)
      console.log(`${type} authentication completed`)
    }, 2000)
  }

  return (
    <div className="space-y-3">
      <div className="text-center text-sm text-muted-foreground">Or sign in with</div>
      <div className="flex justify-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleBiometricLogin("fingerprint")}
          disabled={isScanning}
          className="glassmorphism"
        >
          {isScanning ? "Scanning..." : "👆 Fingerprint"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleBiometricLogin("face")}
          disabled={isScanning}
          className="glassmorphism"
        >
          {isScanning ? "Scanning..." : "😊 Face ID"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleBiometricLogin("voice")}
          disabled={isScanning}
          className="glassmorphism"
        >
          {isScanning ? "Listening..." : "🎤 Voice"}
        </Button>
      </div>
    </div>
  )
}
