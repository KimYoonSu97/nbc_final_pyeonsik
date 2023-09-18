import { Product } from 'src/types/types';

export const ButtonFilter = (list: Product[], eventFilter: boolean, brandFilter: string) => {
  let filteredData: Product[];

  if (!eventFilter && brandFilter === 'all') return list;

  if (eventFilter) {
    filteredData = list.filter((item) => item.event !== null);
    if (brandFilter === 'all') {
      return filteredData;
    } else if (brandFilter === 'GS25') {
      return filteredData.filter((item) => item.prodBrand === 'GS25');
    } else if (brandFilter === 'CU') {
      return filteredData.filter((item) => item.prodBrand === 'CU');
    } else if (brandFilter === 'emart24') {
      return filteredData.filter((item) => item.prodBrand === 'emart24');
    } else {
      return filteredData.filter((item) => item.prodBrand === '7-ELEVEn');
    }
  } else {
    filteredData = list;
    if (brandFilter === 'all') {
      return filteredData;
    } else if (brandFilter === 'GS25') {
      return filteredData.filter((item) => item.prodBrand === 'GS25');
    } else if (brandFilter === 'CU') {
      return filteredData.filter((item) => item.prodBrand === 'CU');
    } else if (brandFilter === 'emart24') {
      return filteredData.filter((item) => item.prodBrand === 'emart24');
    } else {
      return filteredData.filter((item) => item.prodBrand === '7-ELEVEn');
    }
  }
};
