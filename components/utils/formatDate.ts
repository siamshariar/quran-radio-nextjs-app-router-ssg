export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

// Compact variant for narrow phone screens: drops the year when it's the
// current one ("Sep 24, 6:09 AM") and abbreviates it otherwise
// ("Sep 24 '25, 6:09 AM"), so it fits on one line without losing meaning.
export const formatDateShort = (timestamp) => {
    const date = new Date(timestamp);
    const md = date.toLocaleString("en-US", { month: "short", day: "numeric" });
    const time = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    const year = date.getFullYear() === new Date().getFullYear() ? "" : ` '${String(date.getFullYear()).slice(-2)}`;
    return `${md}${year}, ${time}`;
};
