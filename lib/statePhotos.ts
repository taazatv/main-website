/**
 * Landmark photo for each tile of the state picker, from Wikimedia Commons.
 * Their licences need a credit; it is shown on the About page.
 * Files are in public/taaza/states/, named after the key (a state's slug, or "national").
 */
export const STATE_PHOTOS: Record<string, { place: string; author: string; license: string; file: string }> = {
  national: { place: "India Gate, New Delhi", author: "A. Savin", license: "FAL", file: "India_Gate_in_New_Delhi_03-2016.jpg" },
  "west-bengal": { place: "Victoria Memorial, Kolkata", author: "Subhrajyoti07", license: "CC BY-SA 4.0", file: "Victoria_Memorial_situated_in_Kolkata.jpg" },
  bihar: { place: "Mahabodhi Temple, Bodh Gaya", author: "Photo Dharma", license: "CC BY 2.0", file: "Mahabodhi_Temple_-_Main_Sikhara_(9222239606).jpg" },
  "uttar-pradesh": { place: "Taj Mahal, Agra", author: "Yann / King of Hearts", license: "CC BY-SA 4.0", file: "Taj_Mahal,_Agra,_India_edit2.jpg" },
  jharkhand: { place: "Hundru Falls, Ranchi", author: "Kingshuk Mondal", license: "CC BY 4.0", file: "Hundru_Falls,_Jharkhand,_India.jpg" },
};

export const commonsUrl = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;
