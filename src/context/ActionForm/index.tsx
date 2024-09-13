import React, { MutableRefObject, createContext, useEffect, useMemo, useRef, useState } from 'react';

import { useIsFetching } from '@tanstack/react-query';
import { element } from 'prop-types';
import { useNavigation, useParams, useSearchParams } from 'react-router-dom';

type ActionForm = {
  formRef: MutableRefObject<HTMLFormElement>;
  continueDisabled: boolean;
  queryClientIsFetching: boolean;
  navigationStateIsActive: boolean;
  setContinueDisabled: Function;
  actionBarAlert: any;
  setActionBarAlert: Function;
  modalAlert: any;
  setModalAlert: Function;
};

export const ActionFormContext = createContext<ActionForm>({
  formRef: null,
  continueDisabled: false,
  queryClientIsFetching: false,
  navigationStateIsActive: false,
  setContinueDisabled: () => {},
  actionBarAlert: null,
  setActionBarAlert: () => {},
  modalAlert: null,
  setModalAlert: () => {},
});

export const INITIAL_CONTINUE_DISABLED = {
  start: true,
  mid: false,
  end: false,
};

const ActionFormProvider = ({ children }) => {
  const [searchParams] = useSearchParams();

  const quoteId = searchParams.get('quoteId');
  const { step } = useParams();
  const formRef = useRef<HTMLFormElement>();
  const [continueDisabled, setContinueDisabled] = useState(INITIAL_CONTINUE_DISABLED[step]);
  const [actionBarAlert, setActionBarAlert] = useState();
  const [modalAlert, setModalAlert] = useState();
  const { state } = useNavigation();

  const queryClientIsFetching = Boolean(useIsFetching({ queryKey: ['quote', quoteId] }));
  const navigationStateIsActive = state === 'submitting' || state === 'loading';

  useEffect(() => {
    setActionBarAlert(null);
  }, [step]);

  const data = useMemo(
    () => ({
      formRef,
      continueDisabled,
      queryClientIsFetching,
      navigationStateIsActive,
      setContinueDisabled,
      actionBarAlert,
      setActionBarAlert,
      modalAlert,
      setModalAlert,
    }),
    [
      formRef,
      actionBarAlert,
      setActionBarAlert,
      modalAlert,
      setModalAlert,
      continueDisabled,
      queryClientIsFetching,
      navigationStateIsActive,
      setContinueDisabled,
    ],
  );

  return <ActionFormContext.Provider value={data}>{children}</ActionFormContext.Provider>;
};

ActionFormProvider.propTypes = {
  children: element,
};

ActionFormProvider.defaultProps = {
  children: null,
};

export default ActionFormProvider;
