"use client";

import {
  useEffect,
} from "react";

import {
  signOut,
} from "next-auth/react";

export default function
AdminAutoLogout() {

  useEffect(() => {

    let inactivityTimer:
      NodeJS.Timeout;

    // 10 mins
    const INACTIVE_TIME =
      10 * 60 * 1000;

    // 1 hour
    const SESSION_TIME =
      60 * 60 * 1000;

    // AUTO LOGOUT AFTER 1 HOUR
    const sessionTimeout =
      setTimeout(() => {

        signOut({
          callbackUrl: "/",
        });

      }, SESSION_TIME);

    const resetTimer = () => {

      clearTimeout(
        inactivityTimer
      );

      inactivityTimer =
        setTimeout(() => {

          signOut({
            callbackUrl: "/",
          });

        }, INACTIVE_TIME);
    };

    window.addEventListener(
      "mousemove",
      resetTimer
    );

    window.addEventListener(
      "keydown",
      resetTimer
    );

    resetTimer();

    return () => {

      clearTimeout(
        inactivityTimer
      );

      clearTimeout(
        sessionTimeout
      );

      window.removeEventListener(
        "mousemove",
        resetTimer
      );

      window.removeEventListener(
        "keydown",
        resetTimer
      );
    };

  }, []);

  return null;
}