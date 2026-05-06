"use client";
import { useEffect, useState } from "react";

export function useCountdown(expiryAt) {
  // State to store remaining seconds
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    // Function to calculate remaining time
    const tick = () => {
      const left = expiryAt
        // Calculate seconds left (expiry time - current time)
        // Math.max ensures it never goes below 0
        ? Math.max(0, Math.floor((expiryAt - Date.now()) / 1000))
        : 0;

      // Update state with remaining seconds
      setSecs(left);
    };

    // Run once immediately (so UI updates instantly, no 1s delay)
    tick();

    // Run tick every 1 second
    const id = setInterval(tick, 1000);

    // Cleanup function:
    // Clears interval when component unmounts or expiryAt changes
    // Prevents memory leaks and multiple intervals running
    return () => clearInterval(id);
  }, [expiryAt]); // Re-run effect if expiryAt changes

  // Convert seconds into minutes (mm format)
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");

  // Get remaining seconds (ss format)
  const s = (secs % 60)
    .toString()
    .padStart(2, "0");

  return {
    // Formatted time string (e.g., "02:05")
    display: `${m}:${s}`,

    // Flag: true if less than 2 minutes left
    isUrgent: secs < 120,

    // Flag: true if countdown finished (only when expiryAt is set AND time is up)
    expired: expiryAt !== null && secs === 0,
  };
}