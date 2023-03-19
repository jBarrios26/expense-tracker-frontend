import { useState } from 'react';

export function useMonthPicker(initialMonth: number, initialYear: number) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  function toggle(): void {
    setShowMenu((prev) => !prev);
  }

  function onYearChange(year: number) {
    setSelectedYear(year);
  }

  function onMonthChange(month: number) {
    setSelectedMonth(month);
    toggle();
  }

  return {
    showMenu,
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
    toggle,
  };
}
