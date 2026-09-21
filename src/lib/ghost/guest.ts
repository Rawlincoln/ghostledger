export const GUEST_RE = /^gl-[a-z0-9]{8,32}$/;

export function parseGuestId(raw: unknown): string {
  if (typeof raw !== "string") return "gl-public";
  const id = raw.trim().toLowerCase();
  return GUEST_RE.test(id) ? id : "gl-public";
}

export function getGuestId(): string {
  if (typeof window === "undefined") return "gl-public";
  try {
    const key = "ghostledger-guest-id";
    let id = window.localStorage.getItem(key);
    if (!id || !GUEST_RE.test(id)) {
      const hex = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
      id = `gl-${hex}`;
      window.localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "gl-public";
  }
}

export function guestName(): string {
  return "Citizen";
}
