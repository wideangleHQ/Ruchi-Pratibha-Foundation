import localFont from 'next/font/local';

export const cormorantGaramond = localFont({
  src: [
    {
      path: '../../assets/fonts/Cormorant_Garamond/CormorantGaramond-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Cormorant_Garamond/CormorantGaramond-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Cormorant_Garamond/CormorantGaramond-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Cormorant_Garamond/CormorantGaramond-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Cormorant_Garamond/CormorantGaramond-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Cormorant_Garamond/CormorantGaramond-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-cormorant',
  display: 'swap',
});

export const manrope = localFont({
  src: [
    {
      path: '../../assets/fonts/Manrope/Manrope-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Manrope/Manrope-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Manrope/Manrope-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Manrope/Manrope-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Manrope/Manrope-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-manrope',
  display: 'swap',
});

export const spaceGrotesk = localFont({
  src: [
    {
      path: '../../assets/fonts/Space_Grotesk/SpaceGrotesk-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Space_Grotesk/SpaceGrotesk-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Space_Grotesk/SpaceGrotesk-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Space_Grotesk/SpaceGrotesk-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Space_Grotesk/SpaceGrotesk-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-space-grotesk',
  display: 'swap',
});
