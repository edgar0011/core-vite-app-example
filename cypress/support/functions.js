export class Functions {
  hexToRgb(hex): string {
    // Remove the leading hash symbol if present
    const hexOnly = hex.replace('#', '')

    // Split the hexadecimal string into RGB components
    const r = parseInt(hexOnly.substring(0, 2), 16)
    const g = parseInt(hexOnly.substring(2, 4), 16)
    const b = parseInt(hexOnly.substring(4, 6), 16)

    // Return the RGB values as a formatted string
    return `rgb\\(${r}, ${g}, ${b}\\)`
  }
}
