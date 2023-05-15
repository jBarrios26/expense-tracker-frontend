import React from 'react';
import Card from '../Card';
import { Subtitle } from '../../../../Components/Subtitle';
import HorizontalBarChart from '../HorizontalBarChart';
import { useTopCategories } from '../../hooks/use_top_categories';
import { Loader } from '../../../../Components/Loader';

function TopCategories() {
  const { categories, isLoading } = useTopCategories();
  return (
    <Card className="lg:h-1/2">
      <Subtitle> Top categories </Subtitle>
      {isLoading ? (
        <Loader />
      ) : (
        <HorizontalBarChart
          labels={
            categories?.topCategories.map((category) => category.name) ?? []
          }
          data={
            categories?.topCategories.map((category) => category.amountSpent) ??
            []
          }
          name="Top categories"
          colors={
            categories?.topCategories.map((category) => category.color) ??
            '#0368FF80'
          }
        ></HorizontalBarChart>
      )}
    </Card>
  );
}

export default TopCategories;
