export function formatInstagramTimestamp(timestamp: string) {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const timeDiffInSeconds = Math.floor((currentDate.getTime() - postDate.getTime()) / 1000); // Time difference in seconds

  if (timeDiffInSeconds < 60) {
    return `${timeDiffInSeconds}s ago`; // Less than a minute ago
  } else if (timeDiffInSeconds < 3600) {
    const minutes = Math.floor(timeDiffInSeconds / 60);
    return `${minutes}m ago`; // Less than an hour ago
  } else if (timeDiffInSeconds < 86400) {
    const hours = Math.floor(timeDiffInSeconds / 3600);
    return `${hours}h ago`; // Less than a day ago
  } else if (timeDiffInSeconds < 2592000) {
    const days = Math.floor(timeDiffInSeconds / 86400);
    return `${days}d ago`; // Less than a month ago (30 days)
  } else if (timeDiffInSeconds < 31536000) {
    const months = Math.floor(timeDiffInSeconds / 2592000);
    return `${months}mo ago`; // Less than a year ago (12 months)
  } else {
    const years = Math.floor(timeDiffInSeconds / 31536000);
    return `${years}y ago`; // More than a year ago
  }
}
