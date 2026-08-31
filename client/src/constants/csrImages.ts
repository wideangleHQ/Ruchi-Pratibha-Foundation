export const ALL_CSR_IMAGES: string[] = [
  // Covid Precaution Shooting (8)
  '/CSR Activites/Covid Precaution Shooting/DSC_1154.webp',
  '/CSR Activites/Covid Precaution Shooting/DSC_1187.webp',
  '/CSR Activites/Covid Precaution Shooting/DSC_1200.webp',
  '/CSR Activites/Covid Precaution Shooting/DSC_1234.webp',
  '/CSR Activites/Covid Precaution Shooting/DSC_1399.webp',
  '/CSR Activites/Covid Precaution Shooting/DSC_1429.webp',
  '/CSR Activites/Covid Precaution Shooting/DSC_1473.webp',
  '/CSR Activites/Covid Precaution Shooting/DSC_1488.webp',

  // Jajpur Salute to Corona Warrior (10)
  '/CSR Activites/Jajpur salute to corona warrior/DSC_0874.webp',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_0880.webp',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_0889.webp',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_0892.webp',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_0925.webp',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_1044.webp',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_1071.webp',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_1081.webp',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_1099.webp',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_1103.webp',

  // Odia Bazar (3)
  '/CSR Activites/Odia Bazar/DSC05968.webp',
  '/CSR Activites/Odia Bazar/DSC05990.webp',
  '/CSR Activites/Odia Bazar/DSC06000.webp',

  // Salute to Corona Warrior Dhenkanal (11)
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3162.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3201.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3226.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3249.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3265.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3277.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3286.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3294.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3306.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3372.webp',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3385.webp',

  // Sutahat (3)
  '/CSR Activites/Sutahat/DSC05409.webp',
  '/CSR Activites/Sutahat/DSC05413.webp',
  '/CSR Activites/Sutahat/DSC05416.webp',
];

export function shuffleCSRImages(array: string[] = ALL_CSR_IMAGES): string[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
