import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

import { getQuote, loader } from '../../routes/step';

const useQuote = () => {
  const { quoteId } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  return useSuspenseQuery(getQuote(quoteId));
};

export default useQuote;
