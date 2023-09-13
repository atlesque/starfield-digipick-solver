import { MAX_PRONGS } from '../constants';

// Thanks ChatGPT!
export const getProngNumber = (x: number, y: number, center: number) => {
  const angle_rad = Math.atan2(y - center, x - center);

  // Convert the angle to degrees if needed
  const angle_deg = (180 / Math.PI) * angle_rad;
  // Calculate the notch number
  let notch_number = Math.round((angle_deg * MAX_PRONGS / 2) / 360) * 2 + 9;

  // Adjust the notch number to be within the range 1-31
  if (notch_number <= 0) {
    notch_number += MAX_PRONGS;
  }

  // Calculate the radius from the center to the touch point
  const radius = Math.sqrt((x - center) ** 2 + (y - center) ** 2);

  // Calculate the layer number
  let layerNumber = Math.floor(((center) - radius) / 20);

  // Ensure that the layerNumber is within the range 0-2
  layerNumber = Math.min(4, Math.max(0, layerNumber));

  return [notch_number, layerNumber].join(':')
}
