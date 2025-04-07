type SortOrder = "asc" | "desc";

export function sortItems<T>(
  items: T[],
  key: keyof T,
  order: SortOrder = "asc"
): T[] {
  return items.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    // Handle date fields
    const dateA = new Date(valueA as unknown as string);
    const dateB = new Date(valueB as unknown as string);

    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      if (dateA < dateB) {
        return order === "asc" ? -1 : 1;
      }
      if (dateA > dateB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    }

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}
