export const setBrandName = (brandName: string) => {
  switch (brandName) {
    case 'GS25':
      return 'GS25';
    case 'CU':
      return 'CU씨유';
    case '7-ELEVEn':
      return '세븐일레븐';
    case 'emart24':
      return '이마트24';

    default:
      return 'black';
  }
};
