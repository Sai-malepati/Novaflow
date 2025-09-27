export const hexToRgba = (hex: string, alpha: number) => {
  // Remove '#' if present
  const cleanHex = hex.replace("#", "");
 
  // Parse r, g, b
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
 
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
 
export const status = [
  { label: 'Completed Tasks', value: 27, color: '#4caf50' },
  { label: 'Tasks Rejected', value: 27, color: '#f44336' },
  { label: 'Tasks In Progress', value: 27, color: '#ff9800' },
  { label: 'New Tasks', value: 27, color: '#2196f3' },
];