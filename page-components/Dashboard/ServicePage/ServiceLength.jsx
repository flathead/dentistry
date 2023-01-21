import { useServicePages } from '@/lib/service';

const { Badge } = require('@nextui-org/react');

const ServiceLength = () => {
  const { data } = useServicePages();
  const services = data
    ? data.reduce((acc, val) => [...acc, ...val.services], [])
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

  return services.length >= 1 ? (
    <Badge color={'success'}>
      {createLabel(services.length, ['Добавлена ', 'Добавлено ', 'Добавлено '])}
      {services.length}
      {createLabel(services.length, [' услуга', ' услуги', ' услуг'])}
    </Badge>
  ) : (
    <Badge color={'error'}>Пока не добавлено услуг</Badge>
  );
};

export default ServiceLength;
