export function formatDate(ISOstring) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        day: 'numeric',
        hour: 'numeric',
        dayPeriod: 'short',
        minute: 'numeric',
        hour12: false,
    }).format(new Date(ISOstring));
}
