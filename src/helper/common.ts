export const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace("#", "");


  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const status = [
  { label: 'Tasks Completed', value: '46', color: '#4caf50' },
  { label: 'Tasks Rejected', value: '07', color: '#f44336' },
  { label: 'Tasks In Progress', value: '03', color: '#ff9800' },
];