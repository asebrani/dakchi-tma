/**
 * Authentication hooks
 * 
 * Provides login, signup, and logout functionality with React Query.
 */

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { ROUTES } from "@/lib/routes";
import type { AuthCredentials, SignupCredentials } from "@/types";
import { toast } from "@/hooks/use-toast";

export function useLogin() {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (credentials: AuthCredentials) => api.auth.login(credentials),
    onSuccess: (response) => {
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("refresh_token", response.refreshToken);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${response.user.name}`,
      });
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
    },
  });
}

export function useSignup() {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (credentials: SignupCredentials) => api.auth.signup(credentials),
    onSuccess: (response) => {
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("refresh_token", response.refreshToken);
      toast({
        title: "Account created!",
        description: "Welcome to VibeTune AI",
      });
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: () => api.auth.logout(),
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "See you next time!",
      });
      navigate(ROUTES.HOME);
    },
  });
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: () => api.auth.loginWithGoogle(),
    onError: () => {
      toast({
        title: "Google login failed",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });
}

export function use42Login() {
  return useMutation({
    mutationFn: () => api.auth.loginWith42(),
    onError: () => {
      toast({
        title: "42 login failed",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });
}
