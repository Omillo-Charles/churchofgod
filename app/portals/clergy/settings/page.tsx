"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function ClergySettingsPage() {
    const { user, refreshAuth } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        churchName: "",
        homeCounty: "",
        bio: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                email: user.email || "",
                phone: user.phone || "",
                churchName: user.churchName || "",
                homeCounty: user.homeCounty || "",
                bio: user.bio || "",
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/users/profile", formData);
            await refreshAuth();
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post("/auth/signout");
            toast.success("Logged out successfully.");
            router.push("/auth");
        } catch (error) {
            router.push("/auth");
        }
    };

    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            await api.delete("/users/me");
            toast.success("Account deleted successfully.");
            router.push("/auth");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete account.");
            setShowDeleteModal(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
            <div className="space-y-2">
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">Account Settings</h1>
                <p className="text-zinc-500 text-sm">Manage your profile information and account security.</p>
            </div>

            {/* Profile Section */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/[0.01]">
                    <h2 className="text-sm font-black text-white uppercase tracking-wider">Profile Information</h2>
                </div>
                <form onSubmit={handleUpdateProfile} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:border-sky-500/50 focus:bg-white/[0.06] outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-3 bg-white/[0.01] border border-white/5 rounded-xl text-xs text-zinc-500 cursor-not-allowed outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:border-sky-500/50 focus:bg-white/[0.06] outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Church Name</label>
                            <input
                                type="text"
                                name="churchName"
                                value={formData.churchName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:border-sky-500/50 focus:bg-white/[0.06] outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:border-sky-500/50 focus:bg-white/[0.06] outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-sky-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-sky-400 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Danger Zone */}
            <div className="space-y-4">
                <h2 className="text-sm font-black text-rose-500 uppercase tracking-wider ml-1">Danger Zone</h2>
                <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-white">Sign Out</p>
                        <p className="text-xs text-zinc-500">Sign out of your account on this device.</p>
                    </div>
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="px-6 py-2.5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-white">Delete Account</p>
                        <p className="text-xs text-zinc-500">Permanently remove your account and all data. This action cannot be undone.</p>
                    </div>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-6 py-2.5 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-600 transition-all"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
                    <div className="relative z-10 w-full max-w-sm bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Sign Out?</h3>
                            <p className="text-zinc-400 text-xs">Are you sure you want to log out?</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleLogout}
                                className="w-full py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all"
                            >
                                Yes, Sign Me Out
                            </button>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="w-full py-3.5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
                    <div className="relative z-10 w-full max-w-sm bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight">Delete Account?</h3>
                            <p className="text-zinc-400 text-xs">This action is permanent and cannot be undone. All your data will be removed.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleDeleteAccount}
                                disabled={loading}
                                className="w-full py-3.5 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-600 transition-all disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Permanently Delete"}
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="w-full py-3.5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
