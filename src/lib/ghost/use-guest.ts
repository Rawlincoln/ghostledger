"use client";

import { useEffect, useState } from "react";
import { getGuestId } from "./guest";

export function useGuestId(): string | null {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setId(getGuestId());
  }, []);
  return id;
}
