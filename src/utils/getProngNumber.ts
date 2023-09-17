import { MAX_PRONGS } from '../constants';

// Thanks ChatGPT!
const getProngNumber = (
  x: number,
  y: number,
  center: number,
  activeLayer: string,
  offsetTouch: boolean = false
) => {
  const angleRad = Math.atan2(y - center, x - center);

  // Convert the angle to degrees if needed
  const angleDeg = (180 / Math.PI) * angleRad;
  // Calculate the notch number
  let notchNumber = Math.round((angleDeg * MAX_PRONGS) / 2 / 360) * 2 + 9;

  // Adjust the notch number to be within the range 1-31
  if (notchNumber <= 0) {
    notchNumber += MAX_PRONGS;
  }

  // Calculate the radius from the center to the touch point
  const radius = Math.sqrt((x - center) ** 2 + (y - center) ** 2) / (offsetTouch ? 0.4 : 1);

  // Calculate the layer number
  let layerNumber = Math.floor((center - radius) / 20);

  // Ensure that the layerNumber is within the range 0-layers
  layerNumber = Math.min(4, Math.max(0, layerNumber));

  return [notchNumber, activeLayer ? Number(activeLayer) - 1 : layerNumber].join(':');
};

export default getProngNumber;
