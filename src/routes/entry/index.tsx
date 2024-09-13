import { redirect } from "react-router-dom";

const asyncLoader = async ({ request }): Promise<any> => {
  const { searchParams } = new URL(request.url);
  const info = searchParams.get('info');
  searchParams.delete('info');

  if (info) {
    const decodedString = atob(info);

    const { quoteId: infoQuoteId, ...rest } = JSON.parse(decodedString);

    if (infoQuoteId) {
      searchParams.append('quoteId', infoQuoteId);

      const searchParamsString = searchParams.toString();
      return redirect(`/end/${searchParamsString ? `?${searchParamsString}` : ''}`);
    }

    const customerInfo = { ...rest };

    window.sessionStorage.setItem('customerInfo', JSON.stringify(customerInfo));

    const newQuoteId = crypto.randomUUID();
    searchParams.append('quoteId', newQuoteId);
    const searchParamsString = searchParams.toString();

    return redirect(`/mid/${searchParamsString ? `?${searchParamsString}` : ''}`);
  }

  const searchParamsString = searchParams.toString();

  return redirect(`/start/${searchParamsString ? `?${searchParamsString}` : ''}`);
};

export const loader = () => asyncLoader;

export const Component = () => null;

Component.displayName = 'Entry';
