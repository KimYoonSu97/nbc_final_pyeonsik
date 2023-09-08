import { ConvsInform } from 'src/types/types';
import { GetDistanceBtw } from './GetDistanceBtw';

const MAX_RESULTS = 5; // 가져올 편의점 개수

export const GetConvList = async (lat: number, lng: number): Promise<ConvsInform[]> => {
  try {
    const ps = new kakao.maps.services.Places();
    const result = await new Promise<any>((resolve, reject) => {
      ps.categorySearch(
        'CS2', // 편의점
        (data: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(data);
          } else {
            reject(new Error('편의점 검색 실패'));
          }
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
          useMapCenter: true,
          size: MAX_RESULTS,
          radius: 5000,
          sort: kakao.maps.services.SortBy.DISTANCE
        }
      );
    });

    const convs: ConvsInform[] = [];

    const nearestConvs: ConvsInform[] = [];
    const brandArr = ['세븐일레븐', 'CU', 'GS25', '이마트24', '미니스톱'];

    for (let i = 0; i < Math.min(MAX_RESULTS, result.length); i++) {
      const data = result[i];
      const splitedPlace = data.place_name.split(' ');
      console.log(splitedPlace);
      const [brand_name, position_name] = [splitedPlace[0], splitedPlace[1]];

      const newConv: ConvsInform = {
        position: {
          lat: data.y,
          lng: data.x
        },
        brand_name,
        position_name,
        full_name: data.place_name,
        distance: GetDistanceBtw(lat, lng, Number(data.y), Number(data.x), 'meter')
      };
      convs.push(newConv);
    }

    for (const brand of brandArr) {
      let conv = convs.find((conv) => brand === conv.brand_name);
      conv !== undefined
        ? nearestConvs.push(conv)
        : nearestConvs.push({
            brand_name: brand,
            position_name: '',
            full_name: '',
            distance: 0,
            position: { lat: 0, lng: 0 }
          });
    }
    // console.log(nearestConvs)
    return nearestConvs;
    // return convs;
  } catch (error) {
    console.error('편의점 리스트 가져오기 오류:', error);
    return [];
  }
};
