import { useQuery, useQueryClient } from 'react-query';
import HomeService from '../service/home_service';
import { AxiosError } from 'axios';
import { ApiError } from '../../../common/model/error/api_error';
import { UserInfoResponse } from '../model/user_info_response';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';

export function useHomeInfo() {
  const selector = useSelector((app: AppStore) => app.user);

  async function getUserInfo(userId: string) {
    const service = new HomeService();
    return await service.getUserInfo(userId);
  }

  const { data, isLoading, error, isError } = useQuery<
    UserInfoResponse,
    AxiosError<ApiError>
  >(['userInfo', selector.userId], () => getUserInfo(selector.userId), {
    retry: 0,
    onSuccess(data) {
      console.log(data);
    },
  });

  return { data, isLoading, error, isError };
}
