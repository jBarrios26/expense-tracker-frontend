import React from 'react';
import { classNames } from '../../util/classnames';
import { Title } from '../../Components/Title';
import { Subtitle } from '../../Components/Subtitle';
import { TextField } from '../../Components/TextField';
import { PrimaryButton } from '../../Components/PrimaryButton';
import { OutlineButton } from '../../Components/OutlineButton';
import { FloatingButton } from '../../Components/FloatingButton';
import { MdAdd } from 'react-icons/md';
import { Loader } from '../../Components/Loader';
import { BudgetCard } from '../../Components/BudgetCard';
import { Pagination } from '../../Components/Pagination';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CreateMonthPickerDropdown from '../../Components/CreateMonthPickerModal/CreateMonthPickerModal';

interface SearchForm {
  searchValue: string;
}

const searchSchema = yup.object().shape({
  searchValue: yup.string().required('Search value is required'),
});

export default function BudgetHistoryList() {
  const dateMonth = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: yupResolver(searchSchema),
    mode: 'onBlur',
  });

  return (
    <div className={classNames('w-full flex-col py-6 px-5')}>
      <Title> Your budget history</Title>
      <Subtitle>
        {' '}
        Currently watching budget from:{' '}
        {dateMonth.substring(0, 1).toUpperCase() + dateMonth.substring(1)}
      </Subtitle>
      <CreateMonthPickerDropdown
        onYearChange={function (year: number): void {
          throw new Error('Function not implemented.');
        }}
        onMonthChange={function (month: number): void {
          throw new Error('Function not implemented.');
        }}
        defaultMonth={1}
        defaultYear={2010}
        show={true}
        onToggle={function (nextShow: boolean): void {
          throw new Error('Function not implemented.');
        }}
      ></CreateMonthPickerDropdown>
      <form
        className="mt-4 flex w-full items-center justify-start gap-3"
        onSubmit={() => {}}
      >
        <span className=" grow">
          <TextField
            id="search-bar"
            label="Search your budget"
            //register={register('searchValue')}
          ></TextField>
        </span>
        <span className="grow-0">
          <PrimaryButton name={'Search'} type={'submit'}></PrimaryButton>{' '}
        </span>
      </form>
      <div className={classNames('grid grid-cols-12 gap-3 py-3')}>
        {/*budgetList === undefined ? <Loader></Loader> : <></>*/}
        {/*budgetList?.budgets.map((budget, index) => (
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
          ))*/}
      </div>
      <Pagination
        currentPage={1}
        totalPages={1}
        goTo={function (page: number): void {
          /*dispatch(
          modifyBudgetList({
            pagination: {
              ...budgetListState.pagination,
              currentPage: page - 1,
            },
          })
        );*/
        }}
        next={function (): void {
          /*modifyBudgetList({
          pagination: {
            ...budgetListState.pagination,
            currentPage: budgetListState.pagination.currentPage + 1,
          },
        });*/
        }}
        previous={function (): void {
          /*modifyBudgetList({
          pagination: {
            ...budgetListState.pagination,
            currentPage: budgetListState.pagination.currentPage - 1,
          },
        });*/
        }}
      />
    </div>
  );
}
