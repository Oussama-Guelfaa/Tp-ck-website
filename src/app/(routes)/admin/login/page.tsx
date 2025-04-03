"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User, ArrowRight, Info } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "@/components/ui/language-selector";

export default function AdminLoginPage() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear error when input changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Very simple validation (you might want more robust validation)
    if (!formState.username || !formState.password) {
      setError("Please enter both username and password");
      setIsSubmitting(false);
      return;
    }

    try {
      // Login using the login function from AuthContext
      const success = await login(formState.username, formState.password);

      if (success) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    }

    setIsSubmitting(false);
  };

  // For demo purposes
  const handleRoleSelect = (role: string) => {
    if (role === "admin") {
      setFormState({
        username: "admin",
        password: "admin123",
      });
    } else if (role === "operator") {
      setFormState({
        username: "operator",
        password: "operator123",
      });
    } else if (role === "viewer") {
      setFormState({
        username: "viewer",
        password: "viewer123",
      });
    }
  };

  return (
    <MainLayout>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <motion.div
              className="p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="relative h-12 w-48">
                    <Image
                      src="/images/tpack-logo.svg"
                      alt="TP@CK Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {t("admin.login.title", "Admin Login")}
                </h1>
                <p className="text-gray-600 text-sm">
                  {t("admin.login.subtitle", "Secure access for TP@CK administrators. Only authorized personnel may proceed.")}
                </p>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {showDemo && (
                  <Alert className="mb-4 bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-blue-800">
                      <p className="font-medium mb-2">
                        Demo Accounts
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 bg-blue-100 border-blue-200 hover:bg-blue-200"
                          onClick={() => handleRoleSelect("admin")}
                        >
                          Admin
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 bg-blue-100 border-blue-200 hover:bg-blue-200"
                          onClick={() => handleRoleSelect("operator")}
                        >
                          Operator
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 bg-blue-100 border-blue-200 hover:bg-blue-200"
                          onClick={() => handleRoleSelect("viewer")}
                        >
                          Viewer
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("admin.login.username", "Username")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="username"
                      name="username"
                      value={formState.username}
                      onChange={handleInputChange}
                      required
                      className="pl-10 w-full"
                      placeholder={t("admin.login.usernamePlaceholder", "Enter your username")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("admin.login.password", "Password")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10 w-full"
                      placeholder={t("admin.login.passwordPlaceholder", "Enter your password")}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-5 h-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("admin.login.loggingIn", "Logging in...") : t("admin.login.loginButton", "Login")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {t("admin.login.forgotPassword", "Forgot your password? Contact your system administrator.")}
                </p>
                <Button
                  variant="link"
                  className="text-primary text-sm p-0 h-auto"
                  onClick={() => setShowDemo(true)}
                >
                  {t("admin.login.showDemo", "Show demo accounts")}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
