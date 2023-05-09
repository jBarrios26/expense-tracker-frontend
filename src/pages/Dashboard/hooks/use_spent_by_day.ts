import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import DashboardService from '../service/dashboard_service';
import { SpentByDayResponse } from '../models/spent_by_day_response';

export function useSpentByDay() {
  const selector = useSelector((app: AppStore) => app.user);

  async function getSpentByDay(userId: string) {
    const service = new DashboardService();
    return await service.getTotalSpentByDay(userId);
  }

  const { data, isLoading, error, isError } = useQuery<
    SpentByDayResponse,
    AxiosError<ApiError>
  >(['spentByDay', selector.userId], () => getSpentByDay(selector.userId), {
    retry: 0,
    onSuccess(data) {
      console.log(data);
    },
  });

  return { spentByDay: data, isLoading, error, isError };
}
