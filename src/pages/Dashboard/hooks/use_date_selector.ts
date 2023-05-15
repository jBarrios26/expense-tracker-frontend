import { useState } from 'react';

export function useDateSelector() {
  const [date, setDate] = useState(new Date());
  const [canGoNext, setCanGoNext] = useState(false);

  function goToPreviousMonth() {
    let previousMonthDate = new Date(date.setMonth((date.getMonth() - 1) % 12));
    if (previousMonthDate.getMonth() > date.getMonth()) {
      previousMonthDate = new Date(
        previousMonthDate.setFullYear(previousMonthDate.getFullYear() - 1)
      );
    }
    setCanGoNext(true);
    setDate(new Date(previousMonthDate));
  }

  function goToNextMonth() {
    const previousDate = new Date(date);
    let nextMonthDate = new Date(date.setMonth((date.getMonth() + 1) % 12));

    if (nextMonthDate.getMonth() < previousDate.getMonth()) {
      nextMonthDate = new Date(
        nextMonthDate.setFullYear(date.getFullYear() + 1)
      );
    }
    setDate(nextMonthDate);
    nextMonthDate = new Date(
      new Date(date).setMonth((date.getMonth() + 1) % 12)
    );
    if (nextMonthDate.getTime() > new Date().getTime()) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
  }

  function goToPreviousYear() {
    setDate(new Date(date.setFullYear(date.getFullYear() - 1)));
    setCanGoNext(true);
  }

  function goToNextYear() {
    const previousDate = new Date(date);
    let canGoNextYearDate = new Date(
      date.setFullYear(previousDate.getFullYear() + 1)
    );

    setDate(canGoNextYearDate);
    canGoNextYearDate = new Date(
      new Date(date).setMonth((date.getMonth() + 1) % 12)
    );
    if (canGoNextYearDate.getTime() > new Date().getTime()) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
  }

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    goToPreviousMonth,
    goToNextMonth,
    goToNextYear,
    goToPreviousYear,
    canGoNext,
  };
}
