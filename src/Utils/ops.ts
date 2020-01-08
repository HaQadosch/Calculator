export function operate (operator: string) {
  switch (operator) {
    case '+':
      return (a: number, b: number): number => a + b
    case '-':
      return (a: number, b: number): number => a - b
    case '*':
      return (a: number, b: number): number => a * b
    case '/':
      return (a: number, b: number): number => a / b
    default:
      return (a: number): number => a
  }
}