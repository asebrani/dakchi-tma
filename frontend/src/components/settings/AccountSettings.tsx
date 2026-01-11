import { Monitor, Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsSection from "./SettingsSection";

const AccountSettings = () => {
  return (
    <SettingsSection
      id="account"
      title="Account & Security"
      description="Manage your login details and active sessions."
    >
      <div className="space-y-6">
        {/* Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-4 rounded-lg bg-muted/10 border border-border/50">
          <div className="md:col-span-1">
            <h4 className="text-sm font-medium text-foreground">Email Address</h4>
          </div>
          <div className="md:col-span-2 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">alex.rivera@example.com</span>
            <Button variant="link" size="sm" className="text-primary p-0 h-auto">
              Change
            </Button>
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start p-4 rounded-lg bg-muted/10 border border-border/50">
          <div className="md:col-span-1">
            <h4 className="text-sm font-medium text-foreground">Password</h4>
          </div>
          <div className="md:col-span-2 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">•••••••••••••••</span>
              <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                Update
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="p-4 rounded-lg bg-muted/10 border border-border/50">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium text-foreground">Active Sessions</h4>
            <Button variant="link" size="sm" className="text-red-400 p-0 h-auto">
              Sign out all devices
            </Button>
          </div>

          <div className="space-y-3">
            {/* Current Session */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground">
                    MacBook Pro{" "}
                    <span className="text-xs text-primary ml-2 bg-primary/10 px-1.5 py-0.5 rounded">
                      Current
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">San Francisco, US • Chrome</p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-border/50" />

            {/* Other Session */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground">iPhone 14 Pro</p>
                  <p className="text-xs text-muted-foreground">San Francisco, US • App • 2 hrs ago</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
};

export default AccountSettings;
