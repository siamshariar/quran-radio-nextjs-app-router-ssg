"use client"

import { useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { getSessionNumber, setSessionItem } from "@/components/utils/session-storage"

/**
 * @returns {Object}
 */
export function useScrollPositionForDetails() {
  const scrollRef = useRef(null)
  const initialScrollTop = useRef(getSessionNumber("detailsScrollPosition", 0))
  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (scrollRef.current?.getState) {
        scrollRef.current.getState((state) => {
          setSessionItem("detailsScrollPosition", String(state.scrollTop))
        })
      }
    }

    const handleRouteChangeComplete = () => {
      const savedPosition = getSessionNumber("detailsScrollPosition", 0)

      if (scrollRef.current?.scrollTo) {
        setTimeout(() => {
          scrollRef.current.scrollTo({
            top: savedPosition,
            behavior: "auto",
          })
        }, 0)
      }
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [router])

  return {
    scrollRef,
    initialScrollTop: initialScrollTop.current,
  }
}