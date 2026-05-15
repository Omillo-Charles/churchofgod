"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import api from "@/lib/axios";

const MemberSettingsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/signout");
    } catch (error) {
      // Fallback
    }
    toast.success("Logged out successfully");
    router.push("/auth");
  };

  const handleDeleteAccount = async () => {
    if (confirmEmail !== user?.email) {
      toast.error("Email address does not match.");
      return;
    }

    setIsDeleting(true);
    
    try {
      const res = await api.delete("/users/me");
      
      if (res.status === 200) {
        toast.success("Your account has been permanently deleted.");
        router.push("/auth");
      } else {
        toast.error("Failed to delete account. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred during account deletion.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setConfirmEmail("");
    }
  };

  return (
    <div className="container mx-auto px-6 max-w-4xl space-y-10 pb-20 pt-2 md:pt-4">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Settings</h1>
        <p className="text-sm text-zinc-500">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Account Info Summary */}
        <div className="p-6 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl font-black text-black uppercase">
              {user?.fullName?.split(" ").map(n => n[0]).join("").slice(0, 2) || "M"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{user?.fullName}</h2>
              <p className="text-xs text-zinc-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Security & Sessions */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 pl-4">Account Actions</h3>
          <div className="p-6 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Logout</p>
                <p className="text-[10px] text-zinc-500">Sign out of your current session on this device.</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-xl bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-white hover:bg-zinc-700 transition-all active:scale-95 border border-white/5"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-500/50 pl-4">Danger Zone</h3>
          <div className="p-6 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Delete Account</p>
                <p className="text-[10px] text-zinc-500">Permanently remove your account and all associated data. This action cannot be undone.</p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-2.5 rounded-xl bg-red-500/10 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-red-500/20"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Deletion Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-900 rounded-[2.5rem] border border-red-500/20 p-8 space-y-8 shadow-2xl">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Are you absolutely sure?</h2>
              <p className="text-[10px] text-zinc-500 font-medium leading-relaxed uppercase tracking-widest">
                This action is irreversible. To confirm, please type your email address below:
                <br />
                <span className="text-white font-black mt-2 inline-block">{user?.email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-2xl bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-red-500/50 transition-all"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setConfirmEmail("");
                  }}
                  className="flex-1 py-4 rounded-2xl bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={confirmEmail !== user?.email || isDeleting}
                  className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    confirmEmail === user?.email && !isDeleting
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:scale-105"
                      : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  {isDeleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberSettingsPage;
