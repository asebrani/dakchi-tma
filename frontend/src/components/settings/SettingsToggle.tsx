import { Switch } from "@/components/ui/switch";

interface SettingsToggleProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const SettingsToggle = ({
  id,
  title,
  description,
  checked,
  onCheckedChange,
}: SettingsToggleProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="pr-8">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

export default SettingsToggle;
