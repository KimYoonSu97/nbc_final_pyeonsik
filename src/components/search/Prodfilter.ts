import { Product } from 'src/types/types';

export const ButtonFilter = (list: Product[], eventFilter: boolean, brandFilter: string) => {
  let filteredData: Product[];

  // 이벤트 필터가 거짓 이고 브랜드 필터도 전체일때
  if (!eventFilter && brandFilter === 'all') return list;

  // 이벤트 필터가 참이면?
  if (eventFilter) {
    filteredData = list.filter((item) => item.event !== null);
    // 이벤트 필터가 참인데 브랜드 필터가 전체일때
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
  //   return list;
};
