export function formatDur(s: number): string {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const rs = Math.floor(s % 60)
    return `${
      h > 0 ? String(h).padStart(2, "0").concat(":") : ""
    }${String(m).padStart(2, "0")}:${String(rs).padStart(2, "0")}`
  }
  
  