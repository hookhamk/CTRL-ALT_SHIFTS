export const formatDate = (date: string): string => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  export const getTodayDateISO = (): string => {
    return new Date().toISOString().split("T")[0]; // Returns "YYYY-MM-DD"
  };
  