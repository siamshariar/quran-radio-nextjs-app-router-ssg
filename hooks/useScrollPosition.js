"use client"

import { useRef, useEffect } from "react"
import { getSessionNumber, setSessionItem } from "@/components/utils/session-storage"

// App Router has no router.events (routeChangeStart/Complete) equivalent, so we
// save on unmount instead of on "navigating away from /reciters/*" specifically.
// Net effect: scroll position now persists across any navigation away and back,
// not just navigation into a reciter detail page — a minor, intentional behavior
// change forced by the App Router API surface.
export function useScrollPosition() {
  const scrollRef = useRef(null)
  const initialScrollTop = useRef(getSessionNumber("reciterScrollPosition", 0))

  useEffect(() => {
    return () => {
      if (scrollRef.current?.getState) {
        scrollRef.current.getState((state) => {
          setSessionItem("reciterScrollPosition", String(state.scrollTop))
        })
      }
    }
  }, [])

  return {
    scrollRef,
    initialScrollTop: initialScrollTop.current,
  }
}
