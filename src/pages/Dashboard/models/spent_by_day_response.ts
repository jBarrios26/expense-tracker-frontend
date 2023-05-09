import { DayExpense } from './day_expense';
import { SpentItem } from './spent_item';

export interface SpentByDayResponse {
  expenseInWeekList: DayExpense[];
}
