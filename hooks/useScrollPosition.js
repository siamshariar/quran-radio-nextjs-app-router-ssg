"use client"

import { useRef, useEffect } from "react"
import { getSessionNumber, setSessionItem } from "@/components/utils/session-storage"

const SCROLL_KEY = "reciterScrollPosition"
const ANCHOR_ID_KEY = "reciterScrollAnchorId"
const ANCHOR_TOP_KEY = "reciterScrollAnchorTop"

// App Router has no router.events (routeChangeStart/Complete) equivalent, so we
// save on unmount instead of on "navigating away from /reciters/*" specifically.
// Net effect: scroll position now persists across any navigation away and back,
// not just navigation into a reciter detail page — a minor, intentional behavior
// change forced by the App Router API surface.
export function useScrollPosition() {
  const scrollRef = useRef(null)
  const initialScrollTop = useRef(getSessionNumber(SCROLL_KEY, 0))

  useEffect(() => {
    // Neither an unmount cleanup nor a plain scroll listener works here:
    // Next.js's own navigation scroll-to-top runs before this component
    // unmounts, and it fires as a real `scroll` event too — so anything
    // meant to track "this page's" position ends up overwritten with 0 by
    // that reset before an unmount-time save could ever run. A capturing
    // click listener runs synchronously during the click's capture phase,
    // strictly before the Link's own handler starts the navigation (and
    // before any resulting scroll reset), so it's the only reliably correct
    // point to snapshot the still-current scroll position. This must be the
    // ONLY writer — an unmount-time save as a second writer previously raced
    // this one and clobbered the correct value with a stale one.
    const handleClickCapture = (event) => {
      setSessionItem(SCROLL_KEY, String(window.scrollY))

      const link = event.target?.closest?.("a[href^='/reciters/']")
      if (!link) return

      const reciterCard = link.closest("[id]")
      const reciterId = reciterCard?.id
      if (!reciterId) return

      setSessionItem(ANCHOR_ID_KEY, reciterId)
      setSessionItem(ANCHOR_TOP_KEY, String(Math.round(reciterCard.getBoundingClientRect().top)))
    }
    window.addEventListener("click", handleClickCapture, { capture: true })

    return () => {
      window.removeEventListener("click", handleClickCapture, { capture: true })
    }
  }, [])

  return {
    scrollRef,
    initialScrollTop: initialScrollTop.current,
  }
}
