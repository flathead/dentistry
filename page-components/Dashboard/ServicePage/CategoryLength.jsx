import { useCategoryPages } from '@/lib/category';

const { Badge } = require('@nextui-org/react');

const CategoryLength = () => {
  const { data } = useCategoryPages();
  const categories = data
    ? data.reduce((acc, val) => [...acc, ...val.categories], [])
    : [];

  function createLabel(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    }`;
  }

  return categories.length >= 1 ? (
    <Badge color={'success'}>
      {createLabel(categories.length, [
        'Добавлена ',
        'Добавлено ',
        'Добавлено ',
      ])}
      {categories.length}
      {createLabel(categories.length, [
        ' категория',
        ' категории',
        ' категорий',
      ])}
    </Badge>
  ) : (
    <Badge color={'error'}>Пока не добавлено категорий</Badge>
  );
};

export default CategoryLength;
