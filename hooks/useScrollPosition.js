import { useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { getSessionNumber, setSessionItem, removeSessionItem } from "@/components/utils/session-storage"

/**
 * @returns {Object} 
 */
export function useScrollPosition() {
  const scrollRef = useRef(null)
  const initialScrollTop = useRef(getSessionNumber("reciterScrollPosition", 0))
  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      if (scrollRef.current?.getState) {
        scrollRef.current.getState((state) => {
          // Save current scroll position
          const scrollTop = state.scrollTop

          if (url.startsWith("/reciters/")) {
            setSessionItem("reciterScrollPosition", String(scrollTop))
          } else {
            removeSessionItem("reciterScrollPosition")
          }
        })
      }
    }


    const handleRouteChangeComplete = (url) => {
      if (url === "/reciters" || url.startsWith("/reciters/")) {
        const savedPosition = getSessionNumber("reciterScrollPosition", 0)

        if (scrollRef.current?.scrollTo) {
          setTimeout(() => {
            scrollRef.current.scrollTo({
              top: savedPosition,
              behavior: "auto",
            })
          }, 0)
        }
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