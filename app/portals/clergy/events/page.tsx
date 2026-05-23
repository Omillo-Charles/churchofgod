"use client";

import { useEffect, useMemo, useState } from "react";
import CreateEventModal from "@/components/modals/CreateEventModal";
import Modal from "@/components/modals/modal";
import api from "@/lib/axios";
import { toast } from "sonner";

type EventRecord = {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  time?: string | null;
  location: string;
  fee?: number | null;
  category?: string | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type EditEventModalProps = {
  isOpen: boolean;
  event: EventRecord | null;
  onClose: () => void;
  onSuccess: () => void;
};

type EditTab = "details" | "logistics" | "media";

const categories = [
  "Worship Service",
  "Youth Ministry",
  "Women Ministry",
  "Men Ministry",
  "Community Outreach",
  "Prayer Meeting",
  "Other",
];

function formatDateForInput(value: string) {
  if (!value) return "";
  if (value.includes("T")) return value.split("T")[0];

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return parsed.toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatFee(value?: number | null) {
  const amount = Number(value || 0);
  return amount > 0 ? `KES ${amount.toLocaleString()}` : "Free";
}

function EditEventModal({
  isOpen,
  event,
  onClose,
  onSuccess,
}: EditEventModalProps) {
  const [activeTab, setActiveTab] = useState<EditTab>("details");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    title: "",
    category: "Worship Service",
    description: "",
    date: "",
    location: "",
    fee: "",
  });

  useEffect(() => {
    if (!event || !isOpen) return;

    setFormData({
      title: event.title || "",
      category: event.category || "Worship Service",
      description: event.description || "",
      date: formatDateForInput(event.date),
      location: event.location || "",
      fee: String(event.fee ?? 0),
    });
    setImageFile(null);
    setImagePreview(event.imageUrl || null);
    setErrors({});
    setActiveTab("details");
  }, [event, isOpen]);

  if (!event) return null;

  const validateTab = (tab: EditTab) => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    if (tab === "details") {
      if (!formData.title.trim()) {
        newErrors.title = true;
        isValid = false;
      }
    } else if (tab === "logistics") {
      if (!formData.date.trim()) {
        newErrors.date = true;
        isValid = false;
      }
      if (!formData.location.trim()) {
        newErrors.location = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextTab = () => {
    if (activeTab === "details" && validateTab("details")) {
      setActiveTab("logistics");
    } else if (activeTab === "logistics" && validateTab("logistics")) {
      setActiveTab("media");
    }
  };

  const prevTab = () => {
    if (activeTab === "media") setActiveTab("logistics");
    else if (activeTab === "logistics") setActiveTab("details");
  };

  const handleSubmit = async () => {
    if (!validateTab("details") || !validateTab("logistics")) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("location", formData.location);
      data.append("fee", formData.fee || "0");

      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await api.patch(`/events/${event.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "Event updated successfully!");
      onClose();
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Event"
      subtitle={event.title}
      maxWidth="max-w-[480px]"
    >
      <div className="space-y-6">
        <div className="flex border-b border-white/5 pb-2">
          {(["details", "logistics", "media"] as EditTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab === "details") setActiveTab("details");
                else if (tab === "logistics" && validateTab("details")) setActiveTab("logistics");
                else if (tab === "media" && validateTab("details") && validateTab("logistics")) setActiveTab("media");
              }}
              className={`flex-1 pb-2 text-[10px] font-black uppercase tracking-wider transition-all border-b-2 text-center ${activeTab === tab
                  ? "border-sky-500 text-sky-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
            >
              {tab === "details" ? "1. Details" : tab === "logistics" ? "2. Logistics" : "3. Media & Cost"}
            </button>
          ))}
        </div>

        <div className="min-h-[220px]">
          {activeTab === "details" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.title}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, title: e.target.value }));
                    if (errors.title) setErrors((prev) => ({ ...prev, title: false }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.title ? "border-red-500" : "border-white/10"
                    } text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`}
                  placeholder="e.g. Youth Camp 2026"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} className="bg-zinc-900 text-white">
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all resize-none"
                  placeholder="Tell us what this event is about..."
                />
              </div>
            </div>
          )}

          {activeTab === "logistics" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, date: e.target.value }));
                    if (errors.date) setErrors((prev) => ({ ...prev, date: false }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.date ? "border-red-500" : "border-white/10"
                    } text-xs text-zinc-300 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.location}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, location: e.target.value }));
                    if (errors.location) setErrors((prev) => ({ ...prev, location: false }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.location ? "border-red-500" : "border-white/10"
                    } text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`}
                  placeholder="e.g. Karen Chapel Sanctuary"
                />
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Event Banner / Image
                </label>

                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 h-36 bg-zinc-900 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt={formData.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-400 hover:text-white transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl h-36 bg-white/[0.01] hover:bg-white/[0.03] hover:border-sky-500/30 transition-all cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Choose Event Image</span>
                    <span className="text-[8px] text-zinc-600 mt-1">PNG, JPG, JPEG (Max 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setImageFile(file);
                        if (file) {
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Registration Fee (KES)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.fee}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fee: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                  placeholder="0 (or leave blank for Free)"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
          <button
            onClick={activeTab === "details" ? onClose : prevTab}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest px-2 transition-colors"
          >
            {activeTab === "details" ? "Cancel" : "Back"}
          </button>
          <button
            onClick={activeTab === "media" ? handleSubmit : nextTab}
            disabled={loading}
            className="flex-1 py-4 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all active:scale-[0.98] shadow-xl disabled:opacity-50"
          >
            {loading ? "Saving..." : activeTab === "media" ? "Save Changes" : "Next Step"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function ClergyEventsPage() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventRecord | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchEvents = async ({ silent = false }: { silent?: boolean } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await api.get("/events");
      setEvents(res.data.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load events.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = events.filter((event) => new Date(event.date) >= today).length;
    const free = events.filter((event) => Number(event.fee || 0) === 0).length;
    const paid = events.filter((event) => Number(event.fee || 0) > 0).length;

    return {
      total: events.length,
      upcoming,
      free,
      paid,
    };
  }, [events]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    try {
      const res = await api.delete(`/events/${deleteTarget.id}`);
      toast.success(res.data.message || "Event deleted successfully!");
      setDeleteTarget(null);
      fetchEvents({ silent: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete the event.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <CreateEventModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={() => fetchEvents({ silent: true })}
      />

      <EditEventModal
        isOpen={!!editingEvent}
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
        onSuccess={() => fetchEvents({ silent: true })}
      />

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Event"
        subtitle={deleteTarget?.title}
        maxWidth="max-w-[420px]"
      >
        <div className="space-y-6">
          <p className="text-sm text-zinc-400 leading-relaxed">
            This will permanently remove the event from the database. This action cannot be undone.
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
              disabled={deleteLoading}
              className="px-6 py-3 rounded-xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all disabled:opacity-50"
            >
              {deleteLoading ? "Deleting..." : "Delete Event"}
            </button>
          </div>
        </div>
      </Modal>

      <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#060a10] border border-sky-500/10 p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08),transparent_60%)]" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-sky-400 uppercase tracking-[0.25em]">
                Event Management
              </p>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Manage Church Events
              </h1>
              <p className="text-sm text-zinc-400 max-w-2xl">
                Create, review, edit, and remove events directly from the live database used by the public events page and member registration flow.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => fetchEvents({ silent: true })}
                disabled={refreshing}
                className="px-5 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
              >
                {refreshing ? "Refreshing..." : "Refresh List"}
              </button>
              <button
                onClick={() => setCreateOpen(true)}
                className="px-5 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Total Events", value: stats.total, tone: "text-white" },
            { label: "Upcoming", value: stats.upcoming, tone: "text-sky-400" },
            { label: "Free Events", value: stats.free, tone: "text-emerald-400" },
            { label: "Paid Events", value: stats.paid, tone: "text-amber-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-zinc-900/40 border border-white/5 p-5"
            >
              <p className={`text-2xl font-black ${stat.tone}`}>{stat.value}</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-xs font-black text-white uppercase tracking-widest">Live Events</h2>
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
              {events.length} item{events.length === 1 ? "" : "s"}
            </span>
          </div>

          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                Loading events...
              </p>
            </div>
          ) : events.length === 0 ? (
            <div className="py-16 px-6 text-center space-y-4">
              <p className="text-sm font-bold text-white uppercase tracking-wider">No Events Found</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                Create the first event to populate the public calendar.
              </p>
              <div>
                <button
                  onClick={() => setCreateOpen(true)}
                  className="px-5 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all"
                >
                  Create First Event
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="grid grid-cols-1 xl:grid-cols-[180px_1fr_auto] gap-5 p-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 h-40 xl:h-28">
                    <img
                      src={event.imageUrl || "/youthexplosionszn3.jpeg"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[9px] font-black text-sky-400 uppercase tracking-widest">
                        {event.category || "General"}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                        {formatFee(event.fee)}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
                        {event.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed mt-2">
                        {event.description || "No event description provided yet."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      <span>{formatDisplayDate(event.date)}</span>
                      <span>{event.location}</span>
                      {event.time && <span>{event.time}</span>}
                    </div>
                  </div>

                  <div className="flex xl:flex-col items-stretch xl:items-end gap-3 xl:w-[150px]">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="flex-1 xl:w-full px-4 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(event)}
                      className="flex-1 xl:w-full px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[10px] font-black uppercase tracking-widest text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
