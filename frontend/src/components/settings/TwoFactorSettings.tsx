import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Smartphone, Copy, Check, RefreshCw, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

type SetupStep = "idle" | "qr" | "verify" | "complete";

const mockBackupCodes = [
  "XXVK-9R4T-M2PL",
  "KJ7N-QW3E-F8YH",
  "PL2M-VB5X-C9ZT",
  "RT6Y-HN8K-W4QA",
  "ZX3C-AS7D-F1GH",
  "MN9B-VC2X-Z6LP",
  "QW4E-RT8Y-UI0P",
  "AS5D-FG7H-JK1L",
];

const TwoFactorSettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [setupStep, setSetupStep] = useState<SetupStep>("idle");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes] = useState(mockBackupCodes);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const handleToggle2FA = (enabled: boolean) => {
    if (enabled) {
      setSetupStep("qr");
    } else {
      // Will be handled by dialog
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      // Mock verification
      setTimeout(() => {
        setSetupStep("complete");
        setIs2FAEnabled(true);
        toast({
          title: "2FA Enabled",
          description: "Two-factor authentication is now active on your account.",
        });
      }, 500);
    }
  };

  const handleDisable2FA = () => {
    setIs2FAEnabled(false);
    setSetupStep("idle");
    setVerificationCode("");
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled.",
    });
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
    toast({
      title: "Copied!",
      description: "Backup codes copied to clipboard.",
    });
  };

  const handleFinishSetup = () => {
    setSetupStep("idle");
    setVerificationCode("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Two-Factor Authentication
        </h2>
        <p className="text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>

      {/* Main 2FA Card */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              {is2FAEnabled && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"
                />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Authenticator App
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Use an authenticator app like Google Authenticator, Authy, or 1Password to generate verification codes.
              </p>
              {is2FAEnabled && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full"
                >
                  <Check className="w-3 h-3" />
                  Active
                </motion.span>
              )}
            </div>
          </div>
          
          {setupStep === "idle" && !is2FAEnabled && (
            <Switch
              checked={is2FAEnabled}
              onCheckedChange={handleToggle2FA}
            />
          )}
        </div>

        {/* Setup Flow */}
        <AnimatePresence mode="wait">
          {setupStep === "qr" && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-border"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* QR Code */}
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-16 h-16 text-foreground/30" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Mock QR Code</p>
                </div>

                {/* Instructions */}
                <div className="flex-1 space-y-4">
                  <h4 className="font-semibold text-foreground">Setup Instructions</h4>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">1</span>
                      <span>Open your authenticator app</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">2</span>
                      <span>Scan the QR code or enter the secret key manually</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">3</span>
                      <span>Enter the 6-digit code shown in your app</span>
                    </li>
                  </ol>

                  <div className="pt-4">
                    <p className="text-xs text-muted-foreground mb-2">Secret Key (for manual entry):</p>
                    <code className="text-sm bg-muted px-3 py-2 rounded-lg block font-mono">
                      JBSW-Y3DP-EHPK-3PXP
                    </code>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setSetupStep("idle")}
                >
                  Cancel
                </Button>
                <Button onClick={() => setSetupStep("verify")}>
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {setupStep === "verify" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-border"
            >
              <div className="max-w-sm">
                <h4 className="font-semibold text-foreground mb-2">Enter Verification Code</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter the 6-digit code from your authenticator app
                </p>

                <div className="flex justify-center mb-6">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={setVerificationCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSetupStep("qr")}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6}
                  >
                    Verify & Enable
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {setupStep === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-border"
            >
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <p className="text-sm font-medium text-green-500">
                    Two-factor authentication is now enabled!
                  </p>
                </div>
              </div>

              <h4 className="font-semibold text-foreground mb-2">Save Your Backup Codes</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Store these codes somewhere safe. You can use them to access your account if you lose your phone.
              </p>

              <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, index) => (
                    <code key={index} className="text-sm font-mono text-foreground">
                      {code}
                    </code>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleCopyBackupCodes}
                  className="gap-2"
                >
                  {copiedCodes ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCodes ? "Copied!" : "Copy Codes"}
                </Button>
                <Button onClick={handleFinishSetup}>
                  Done
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* When 2FA is enabled - show actions */}
        {is2FAEnabled && setupStep === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 pt-6 border-t border-border flex flex-wrap gap-3"
          >
            <Button
              variant="outline"
              onClick={() => setShowBackupCodes(true)}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              View Backup Codes
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Disable 2FA
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Disable Two-Factor Authentication?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove the extra security layer from your account. You'll only need your password to log in.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDisable2FA}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Disable
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        )}
      </div>

      {/* Backup Codes Dialog */}
      <AlertDialog open={showBackupCodes} onOpenChange={setShowBackupCodes}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your Backup Codes</AlertDialogTitle>
            <AlertDialogDescription>
              Use these codes to access your account if you lose your phone. Each code can only be used once.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="bg-muted rounded-lg p-4 my-4">
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, index) => (
                <code key={index} className="text-sm font-mono text-foreground">
                  {code}
                </code>
              ))}
            </div>
          </div>

          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={handleCopyBackupCodes}
              className="gap-2"
            >
              {copiedCodes ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedCodes ? "Copied!" : "Copy Codes"}
            </Button>
            <AlertDialogAction>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default TwoFactorSettings;
