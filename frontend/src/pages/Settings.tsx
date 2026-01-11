import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SettingsNav from "@/components/settings/SettingsNav";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PreferencesSettings from "@/components/settings/PreferencesSettings";
import AccountSettings from "@/components/settings/AccountSettings";
import TwoFactorSettings from "@/components/settings/TwoFactorSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import IntegrationsSettings from "@/components/settings/IntegrationsSettings";
import DangerZone from "@/components/settings/DangerZone";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />;
      case "preferences":
        return <PreferencesSettings />;
      case "account":
        return <AccountSettings />;
      case "security":
        return <TwoFactorSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "integrations":
        return <IntegrationsSettings />;
      case "danger":
        return <DangerZone />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <SettingsNav activeSection={activeSection} onSectionChange={setActiveSection} />

          <div className="col-span-1 lg:col-span-9">
            {renderSection()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
