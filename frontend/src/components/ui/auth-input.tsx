import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-border bg-muted px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-all duration-200",
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
            "hover:border-muted-foreground/50",
            icon && "pl-11",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
AuthInput.displayName = "AuthInput";

export { AuthInput };
