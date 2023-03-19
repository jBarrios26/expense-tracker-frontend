import React, { useEffect, useMemo } from 'react';
import { classNames } from '../../util/classnames';
import { Title } from '../../Components/Title';
import { Subtitle } from '../../Components/Subtitle';
import { TextField } from '../../Components/TextField';
import { PrimaryButton } from '../../Components/PrimaryButton';
import { Loader } from '../../Components/Loader';
import { BudgetCard } from '../../Components/BudgetCard';
import { Pagination } from '../../Components/Pagination';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MonthPickerDropdown from '../../Components/MonthPickerDropdown/MonthPickerDropdown';
import { useMonthPicker } from '../../hooks/useMonthPicker';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import {
  createHistoryBudgetList,
  modifyHistoryBudgetList,
  resetHistoryBudgetList,
} from '../../redux/states/history_budget_list';
import { useBudgetHistoryList } from './hooks/useBudgetHistoryList';

interface SearchForm {
  searchValue: string;
}

const searchSchema = yup.object().shape({
  searchValue: yup.string().required('Search value is required'),
});

export default function BudgetHistoryList() {
  const dispatch = useDispatch();
  const historyBudgetListState = useSelector(
    (app: AppStore) => app.historyBudgetList
  );
  useEffect(() => {
    dispatch(resetHistoryBudgetList());
    return;
  }, [dispatch]);

  const currentDate = useMemo(() => {
    return new Date();
  }, []);

  const {
    showMenu,
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
    toggle,
  } = useMonthPicker(currentDate.getMonth(), currentDate.getFullYear());

  const dateMonth = useMemo(
    () =>
      new Date(selectedYear, selectedMonth).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      }),
    [selectedMonth, selectedYear]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: yupResolver(searchSchema),
    mode: 'onBlur',
  });

  const {
    budgetHistoryList,
    budgetFetching,
    budgetsLoading,
    budgetsHasError,
    budgetsError,
  } = useBudgetHistoryList(
    historyBudgetListState.pagination.currentPage,
    20,
    selectedYear,
    selectedMonth,
    (data) => {
      dispatch(createHistoryBudgetList({ pagination: data.pagination }));
    }
  );

  return (
    <div className={classNames('w-full flex-col py-6 px-5')}>
      <Title> Your budget history</Title>
      <div className="flex flex-col justify-between md:flex-row">
        <Subtitle>
          {' '}
          Currently watching budget from:{' '}
          {dateMonth.substring(0, 1).toUpperCase() + dateMonth.substring(1)}
        </Subtitle>
        <div className="w-full md:w-1/5">
          <MonthPickerDropdown
            onYearChange={onYearChange}
            onMonthChange={onMonthChange}
            defaultMonth={selectedMonth}
            defaultYear={selectedYear}
            show={showMenu}
            onToggle={toggle}
          ></MonthPickerDropdown>
        </div>
      </div>
      <form
        className="mt-4 flex w-full items-center justify-start gap-3"
        onSubmit={() => {
          return;
        }}
      >
        <span className=" grow">
          <TextField
            id="search-bar"
            label="Search your budget"
            register={register('searchValue')}
          ></TextField>
        </span>
        <span className="grow-0">
          <PrimaryButton name={'Search'} type={'submit'}></PrimaryButton>{' '}
        </span>
      </form>
      <div className={classNames('grid grid-cols-12 gap-3 py-3')}>
        {budgetsHasError ? (
          <Title> Something went wrong . . . </Title>
        ) : budgetsLoading ? (
          <Loader></Loader>
        ) : (
          budgetHistoryList?.budgets.map((budget, index) => (
            <BudgetCard
              key={index}
              name={budget.name}
              id={budget.budgetId}
              onDelete={function (id: string): void {
                console.log(budget.createdAt);
              }}
              topCategories={budget.topCategories.slice(
                0,
                Math.min(budget.topCategories.length, 3)
              )}
              createDate={new Date(budget.createdAt)}
            ></BudgetCard>
          ))
        )}
      </div>
      <Pagination
        currentPage={historyBudgetListState.pagination.currentPage + 1}
        totalPages={historyBudgetListState.pagination.numOfPages}
        goTo={function (page: number): void {
          dispatch(
            modifyHistoryBudgetList({
              pagination: {
                ...historyBudgetListState.pagination,
                currentPage: page - 1,
              },
            })
          );
        }}
        next={function (): void {
          modifyHistoryBudgetList({
            pagination: {
              ...historyBudgetListState.pagination,
              currentPage: historyBudgetListState.pagination.currentPage + 1,
            },
          });
        }}
        previous={function (): void {
          modifyHistoryBudgetList({
            pagination: {
              ...historyBudgetListState.pagination,
              currentPage: historyBudgetListState.pagination.currentPage - 1,
            },
          });
        }}
      />
    </div>
  );
}
