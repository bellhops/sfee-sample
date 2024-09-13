import React, { lazy, useEffect } from 'react';

import { queryOptions } from '@tanstack/react-query';
import { json, redirect as routerRedirect, useActionData, useNavigate, useParams } from 'react-router-dom';

import FormActionBar from '../../components/shared/Layout/FormActionBar';
import Loading from '../../components/shared/Loading';
import { QUOTE_DATA } from '../../constants/booking';

export const VALID_STEPS = {
  START: 'start',
  MID: 'mid',
  END: 'end',
};

const STEPS_REQUIRE_QUOTE = [VALID_STEPS.MID, VALID_STEPS.END];

const getQuoteById = (id) => ({
  id,
  ...QUOTE_DATA,
});

export const invalidateQuoteQuery = (queryClient, quoteId) =>
  queryClient.invalidateQueries({ queryKey: ['quote', quoteId] });

export const getQuote = (id) => {
  if (!id) {
    return queryOptions({
      enabled: false,
      queryKey: ['no-quote'],
      queryFn: () => ({}),
    });
  }
  return queryOptions({
    enabled: !!id,
    staleTime: 1000 * 10,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    queryKey: ['quote', id],
    queryFn: async () => {
      const quote = await getQuoteById(id);
      if (!quote) {
        throw new Response('', {
          status: 404,
          statusText: 'Not found',
        });
      }
      return quote;
    },
  });
};

export const loader =
  (queryClient): any =>
  async ({ request, params }) => {
    const { searchParams } = new URL(request.url);
    const { step } = params;
    const quoteId = searchParams.get('quoteId');

    if (!Object.values(VALID_STEPS).includes(step)) {
      throw json(null, { status: 404, statusText: 'Not Found' });
    }

    if (!STEPS_REQUIRE_QUOTE.includes(step)) {
      return {};
    }

    if (STEPS_REQUIRE_QUOTE.includes(step) && !quoteId) {
      throw json(
        {
          errorLoc: 'loader',
          route: 'step',
          step,
          extra: {
            message: 'Missing quote id',
          },
        },
        { status: 400, statusText: 'Bad Request' },
      );
    }

    await queryClient.ensureQueryData(getQuote(quoteId));
    return { quoteId };
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const { searchParams } = new URL(request.url);
    const quoteId = searchParams.get('quoteId');
    const { step } = params;

    const formData = await request.formData();
    const intent = formData.get('intent')?.toString();

    if (step === 'end') {
      if (intent === 'checkout') {
        // MOCK
        const confirmationId = 'ABC123';
        const zip = 12345;

        return Promise.resolve({
          redirect: 'https://www.getbellhops.com',
          intent,
          ok: true,
          error: null,
          extraData: null,
          data: {
            confirmationId,
            zip,
          },
        });
      }
    }

    if (step === 'mid') {
      if (intent !== 'next-step') {
        return Promise.resolve({
          ok: false,
          intent,
          error: 'Unknown Intent',
        });
      }
    }

    let stepData;

    switch (step) {
      case 'start':
        stepData = {
          next_step: 'mid',
          quote_data: {
            id: crypto.randomUUID(),
            // MOCK
            ...QUOTE_DATA,
          },
        };
        break;
      case 'mid':
        stepData = {
          next_step: 'end',
          quote_data: {
            id: quoteId,
            // MOCK
            ...QUOTE_DATA,
          },
        };
        break;
      default:
        break;
    }

    if (stepData.next_step) {
      if (stepData.quote_data) {
        queryClient.setQueryData(['quote', quoteId], stepData.quote_data);
      } else {
        invalidateQuoteQuery(queryClient, quoteId);
      }

      if (stepData.quote_data?.id && !searchParams.get('quoteId')) {
        searchParams.append('quoteId', stepData.quote_data.id);
      }
      const searchParamsString = searchParams.toString() ?? '';

      const nextStepUrl = `/${stepData.next_step}/${searchParamsString ? `?${searchParamsString}` : ''}`;
      return routerRedirect(nextStepUrl);
    }

    return { ok: false, error: 'no next step returned' };
  };

const StartComponent = lazy(() => import('../../components/Step/Start'));
const MidComponent = lazy(() => import('../../components/Step/Mid'));
const EndComponent = lazy(() => import('../../components/Step/End'));

export const Component = () => {
  const { step } = useParams();

  const actionData: any = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (actionData) {
        const { redirect } = actionData;

        if (redirect) {
          if (redirect.startsWith('http')) {
            // External Redirect
            window.location.href = redirect;
          } else {
            // Internal Redirect
            navigate(redirect);
          }
        }
      }
    })();
  }, [actionData]);

  const stepComponents = {
    [VALID_STEPS.START]: <StartComponent />,
    [VALID_STEPS.MID]: <MidComponent />,
    [VALID_STEPS.END]: <EndComponent />,
  };

  if (stepComponents[step]) {
    return (
      <React.Suspense fallback={<Loading text="Loading" />}>
        {stepComponents[step]}
        <FormActionBar />
      </React.Suspense>
    );
  }

  return null;
};

Component.displayName = 'Step';
