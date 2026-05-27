"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/modals/modal";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useAuth } from "@/lib/useAuth";

type AnnouncementRecord = {
  id: string;
  title: string;
  body: string;
  authorId: string;
  author: {
    fullName: string;
    email: string;
    role: string;
  };
  createdAt: string;
};

export default function ClergyAnnouncementsPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modal States
  const [createOpen, setCreateOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AnnouncementRecord | null>(null);

  // Form States
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAnnouncements = async ({ silent = false }: { silent?: boolean } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await api.get("/announcements");
      setAnnouncements(res.data.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load announcements.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setActionLoading(true);
    try {
      const res = await api.post("/announcements", formData);
      toast.success(res.data.message || "Announcement created successfully!");
      setCreateOpen(false);
      setFormData({ title: "", body: "" });
      fetchAnnouncements({ silent: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create announcement.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;
    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setActionLoading(true);
    try {
      const res = await api.patch(`/announcements/${editingAnnouncement.id}`, formData);
      toast.success(res.data.message || "Announcement updated successfully!");
      setEditingAnnouncement(null);
      setFormData({ title: "", body: "" });
      fetchAnnouncements({ silent: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update announcement.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setActionLoading(true);
    try {
      const res = await api.delete(`/announcements/${deleteTarget.id}`);
      toast.success(res.data.message || "Announcement deleted successfully!");
      setDeleteTarget(null);
      fetchAnnouncements({ silent: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete announcement.");
    } finally {
      setActionLoading(false);
    }
  };

  const startEdit = (announcement: AnnouncementRecord) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      body: announcement.body,
    });
  };

  const formatDisplayDate = (value: string) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "Date unavailable";
    return parsed.toLocaleDateString("en-KE", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Create Modal */}
      <Modal
        isOpen={createOpen}
        onClose={() => {
          setCreateOpen(false);
          setFormData({ title: "", body: "" });
        }}
        title="Create Announcement"
        maxWidth="max-w-[480px]"
      >
        <form onSubmit={handleCreate} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                Announcement Title <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                placeholder="e.g. Next Sunday Service Notice"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                Announcement Body <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                value={formData.body}
                onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all resize-none"
                placeholder="Provide detailed information here..."
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => {
                setCreateOpen(false);
                setFormData({ title: "", body: "" });
              }}
              className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest px-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="flex-1 py-4 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {actionLoading ? "Creating..." : "Create Announcement"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingAnnouncement}
        onClose={() => {
          setEditingAnnouncement(null);
          setFormData({ title: "", body: "" });
        }}
        title="Edit Announcement"
        subtitle={editingAnnouncement?.title}
        maxWidth="max-w-[480px]"
      >
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                Announcement Title <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                placeholder="e.g. Next Sunday Service Notice"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                Announcement Body <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                value={formData.body}
                onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all resize-none"
                placeholder="Provide detailed information here..."
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => {
                setEditingAnnouncement(null);
                setFormData({ title: "", body: "" });
              }}
              className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest px-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="flex-1 py-4 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {actionLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Announcement"
        subtitle={deleteTarget?.title}
        maxWidth="max-w-[420px]"
      >
        <div className="space-y-6">
          <p className="text-sm text-zinc-400 leading-relaxed">
            This will permanently remove the announcement from the database. This action cannot be undone.
          </p>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
            <button
              onClick={() => setDeleteTarget(null)}
              className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest px-2 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={actionLoading}
              className="px-6 py-3 rounded-xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all disabled:opacity-50"
            >
              {actionLoading ? "Deleting..." : "Delete Announcement"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Main Panel */}
      <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#060a10] border border-sky-500/10 p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08),transparent_60%)]" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-sky-400 uppercase tracking-[0.25em]">
                Announcement Hub
              </p>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Manage Announcements
              </h1>
              <p className="text-sm text-zinc-400 max-w-2xl">
                Post notices, updates, and communications. Announcements are visible on the public website for members and visitors.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => fetchAnnouncements({ silent: true })}
                disabled={refreshing}
                className="px-5 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
              >
                {refreshing ? "Refreshing..." : "Refresh List"}
              </button>
              <button
                onClick={() => setCreateOpen(true)}
                className="px-5 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all"
              >
                Create Announcement
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-xs font-black text-white uppercase tracking-widest">Active Announcements</h2>
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
              {announcements.length} item{announcements.length === 1 ? "" : "s"}
            </span>
          </div>

          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                Loading announcements...
              </p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="py-16 px-6 text-center space-y-4">
              <p className="text-sm font-bold text-white uppercase tracking-wider">No Announcements Found</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                Publish a new announcement to make it visible on the platform.
              </p>
              <div>
                <button
                  onClick={() => setCreateOpen(true)}
                  className="px-5 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all"
                >
                  Create First Announcement
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {announcements.map((item) => {
                const canModify = user?.role === "ADMIN" || user?.id === item.authorId;

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-5 p-5 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="space-y-3 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[9px] font-black text-sky-400 uppercase tracking-widest">
                          By: {item.author?.fullName || "Unknown Author"}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                          {formatDisplayDate(item.createdAt)}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-white tracking-tight uppercase">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mt-2 whitespace-pre-line">
                          {item.body}
                        </p>
                      </div>
                    </div>

                    <div className="flex xl:flex-col items-stretch xl:items-end gap-3 xl:w-[150px]">
                      {canModify ? (
                        <>
                          <button
                            onClick={() => startEdit(item)}
                            className="flex-1 xl:w-full px-4 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="flex-1 xl:w-full px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[10px] font-black uppercase tracking-widest text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest italic xl:text-right w-full py-2">
                          ReadOnly
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
