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
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
  }, [event, isOpen]);

  if (!event) return null;

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.date.trim() || !formData.location.trim()) {
      toast.error("Title, date, and location are required.");
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
      maxWidth="max-w-[520px]"
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
              Event Title
            </label>
            <input
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 transition-all"
              placeholder="Event title"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-sky-500/50 transition-all [color-scheme:dark]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500/50 transition-all"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-zinc-900 text-white">
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
              Location
            </label>
            <input
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 transition-all"
              placeholder="Event venue"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 transition-all resize-none"
              placeholder="Event description"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
              Registration Fee
            </label>
            <input
              type="number"
              min="0"
              value={formData.fee}
              onChange={(e) => setFormData((prev) => ({ ...prev, fee: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 transition-all"
              placeholder="0"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
              Replace Image
            </label>
            <label className="flex items-center justify-center h-[46px] px-4 rounded-xl border border-dashed border-white/10 bg-white/[0.01] hover:border-sky-500/30 hover:bg-white/[0.03] text-[10px] font-bold text-zinc-400 uppercase tracking-wider cursor-pointer transition-all">
              Choose Image
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
          </div>
        </div>

        {imagePreview && (
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
            <img
              src={imagePreview}
              alt={formData.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
          <button
            onClick={onClose}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest px-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
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
