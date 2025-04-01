type SortOrder = "asc" | "desc";

export function sortItems<T>(
  items: T[],
  key: keyof T,
  order: SortOrder = "asc"
): T[] {
  return items.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}

// Example usage:
// const departments = [{ name: 'HR' }, { name: 'Finance' }, { name: 'IT' }];
// const sortedDepartments = sortItems(departments, 'name', 'asc');
// const sortedDepartments = sortItems(departments, 'createdAt', 'dec');
