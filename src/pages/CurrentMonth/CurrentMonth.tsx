import React, { useEffect, useState } from 'react';
import { Subtitle } from '../../Components/Subtitle';
import { TextField } from '../../Components/TextField';
import { Title } from '../../Components/Title';
import { classNames } from '../../util/classnames';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from '../../Components/PrimaryButton';
import OutlineButton from '../../Components/OutlineButton/OutlineButton';
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import { MdAdd } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router-dom';
import { Pagination } from '../../Components/Pagination';
import { BudgetCard } from './components/BudgetCard';
import { useBudgetList } from './hooks/useCurrentMonthBudget';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBudgetList,
  modifyBudgetList,
  resetBudgetList,
} from '../../redux/states/budget_list_state';
import { AppStore } from '../../redux/store';
import { Loader } from '../../Components/Loader';

interface SearchForm {
  searchValue: string;
}

const searchSchema = yup.object().shape({
  searchValue: yup.string().required('Search value is required'),
});

function CurrentMonth() {
  const dispatch = useDispatch();
  const budgetListState = useSelector((app: AppStore) => app.budgetList);
  useEffect(() => {
    dispatch(resetBudgetList());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: yupResolver(searchSchema),
    mode: 'onBlur',
  });

  const {
    budgetList,
    budgetFetching,
    budgetsLoading,
    budgetsHasError,
    budgetsError,
  } = useBudgetList(budgetListState.pagination.currentPage, 20, (data) => {
    dispatch(createBudgetList({ pagination: data.pagination }));
  });

  const navigation = useNavigate();

  function onSubmit() {
    console.log('Submit');
  }

  function onError() {
    console.error('ERror');
  }

  function goToCreateBudget() {
    navigation('/home/budget/create');
  }

  return (
    <div className={classNames('w-full flex-col py-6 px-5')}>
      <Title> Current month budgets</Title>
      <Subtitle> January-2023</Subtitle>
      <form
        className="mt-4 flex w-full items-center justify-start gap-3"
        onSubmit={(...args) => void handleSubmit(onSubmit, onError)(...args)}
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
        <span className="hidden grow-0 md:block">
          <OutlineButton
            name={'Create budget'}
            type={'button'}
            onClick={() => goToCreateBudget()}
          ></OutlineButton>
        </span>
        <span className="fixed bottom-3 right-3 grow-0 md:hidden">
          <FloatingButton onClick={() => goToCreateBudget()}>
            <MdAdd size={32} />
          </FloatingButton>
        </span>
      </form>
      <div className={classNames('grid grid-cols-12 gap-3 py-3')}>
        {budgetList === undefined ? <Loader></Loader> : <></>}
        {budgetList?.budgets.map((budget, index) => (
          <BudgetCard
            key={index}
            name={budget.name}
            onDelete={function (id: string): void {
              console.log(budget.createdAt);
            }}
            topCategories={budget.topCategories.slice(
              0,
              Math.min(budget.topCategories.length, 3)
            )}
            createDate={new Date(budget.createdAt)}
          ></BudgetCard>
        ))}
      </div>
      <Pagination
        currentPage={budgetListState.pagination.currentPage + 1}
        totalPages={budgetListState.pagination.numOfPages}
        goTo={function (page: number): void {
          dispatch(
            modifyBudgetList({
              pagination: {
                ...budgetListState.pagination,
                currentPage: page - 1,
              },
            })
          );
        }}
        next={function (): void {
          modifyBudgetList({
            pagination: {
              ...budgetListState.pagination,
              currentPage: budgetListState.pagination.currentPage + 1,
            },
          });
        }}
        previous={function (): void {
          modifyBudgetList({
            pagination: {
              ...budgetListState.pagination,
              currentPage: budgetListState.pagination.currentPage - 1,
            },
          });
        }}
      />
    </div>
  );
}

export default CurrentMonth;
