"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Settings, Shield, User, Lock } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSettingsPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredPermission="changeSettings">
      <MainLayout>
        <section className="bg-black py-20 md:py-28">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="heading-xl text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Advanced <span className="text-primary">Settings</span>
              </motion.h1>
              <motion.p
                className="text-gray-300 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                System configuration for administrators only.
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <Settings className="text-primary mr-2 h-6 w-6" />
                  <h2 className="heading-lg">Advanced System Settings</h2>
                </div>
                <Link href="/admin/dashboard">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                  </Button>
                </Link>
              </div>

              <Alert className="mb-8 bg-blue-50 border-blue-200">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                <AlertDescription>
                  <p className="font-medium">Administrator Access Only</p>
                  <p className="text-sm mt-1">
                    This page contains sensitive settings that can only be modified by administrators.
                    You are logged in as <span className="font-medium">{user?.fullName}</span> with <span className="font-medium capitalize">{user?.role}</span> privileges.
                  </p>
                </AlertDescription>
              </Alert>

              <div className="space-y-8">
                {/* User Management Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-primary" />
                      User Management
                    </CardTitle>
                    <CardDescription>
                      Configure users and their access permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label>Username</Label>
                        <Input defaultValue="admin" className="mt-1" />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Select defaultValue="admin">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="operator">Operator</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6 flex justify-between">
                    <Button variant="outline">Add New User</Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white">Save Changes</Button>
                  </CardFooter>
                </Card>

                {/* Security Settings Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="mr-2 h-5 w-5 text-primary" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Configure security and authentication parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Session Timeout (minutes)</Label>
                        <Input type="number" defaultValue="30" className="mt-1" />
                      </div>
                      <div>
                        <Label>Password Policy</Label>
                        <Select defaultValue="strong">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select policy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                            <SelectItem value="medium">Medium (8+ with numbers)</SelectItem>
                            <SelectItem value="strong">Strong (8+ with numbers and symbols)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <Select defaultValue="optional">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select 2FA policy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="disabled">Disabled</SelectItem>
                            <SelectItem value="optional">Optional</SelectItem>
                            <SelectItem value="required">Required for All Users</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Login Attempts Before Lockout</Label>
                        <Input type="number" defaultValue="5" className="mt-1" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6 flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90 text-white">Update Security Settings</Button>
                  </CardFooter>
                </Card>

                {/* System Configuration Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 h-5 w-5 text-primary" />
                      System Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure core system parameters and behavior
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>API Endpoint</Label>
                        <Input defaultValue="https://api.tpack.com/v1" className="mt-1" />
                      </div>
                      <div>
                        <Label>Data Refresh Interval (seconds)</Label>
                        <Input type="number" defaultValue="10" className="mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label>Logging Level</Label>
                        <Select defaultValue="info">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="error">Error Only</SelectItem>
                            <SelectItem value="warn">Warning & Error</SelectItem>
                            <SelectItem value="info">Info & Above</SelectItem>
                            <SelectItem value="debug">Debug (Verbose)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Backup Schedule</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select schedule" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Environment</Label>
                        <Select defaultValue="production">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select environment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="staging">Staging</SelectItem>
                            <SelectItem value="production">Production</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6 flex justify-between">
                    <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                      Reset to Defaults
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Save Configuration
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  This is a demonstration of the protected admin settings page.
                  In a production environment, these settings would be connected to a backend system.
                </p>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </ProtectedRoute>
  );
}
