import React from 'react';
import { useParams } from 'react-router-dom';

function Budget() {
  const { budgetId } = useParams();
  return <div>Budget {budgetId}</div>;
}

export default Budget;
