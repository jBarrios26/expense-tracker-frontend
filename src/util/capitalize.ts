function capitalize(value: string): string {
  return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

export default capitalize;
