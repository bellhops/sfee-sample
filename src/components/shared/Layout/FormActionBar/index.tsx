import React, { useContext, useEffect } from 'react';

import { arrayOf, func, node, oneOfType } from 'prop-types';
import { useActionData, useNavigate, useNavigation, useParams, useSubmit } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import { Alert, Box, Button, CardContent, CircularProgress, IconButton, Typography, useMediaQuery } from '@mui/material';

import { ActionFormContext } from '../../../../context/ActionForm';
import useQuote from '../../../../utils/useQuote';
import Dialog from '../../Dialog';

const ActionButton = ({ children, onClick }) => {
  const { continueDisabled, queryClientIsFetching, navigationStateIsActive } = useContext(ActionFormContext);

  return (
    <Button
      type="submit"
      variant="contained"
      onClick={onClick}
      disabled={queryClientIsFetching || navigationStateIsActive || continueDisabled}
      startIcon={queryClientIsFetching || navigationStateIsActive ? <CircularProgress color="secondary" size={20} /> : null}
    >
      {children}
    </Button>
  );
};

ActionButton.propTypes = {
  children: oneOfType([node, arrayOf(node)]),
  onClick: func,
};

ActionButton.defaultProps = {
  children: null,
  onClick: () => {},
};

const CheckoutButton = () => {
  const { data: quoteData } = useQuote();

  const { formRef } = useContext(ActionFormContext);

  const submit = useSubmit();

  const checkout = () => {
    const formData = new FormData(formRef.current);
    formData.append('intent', 'checkout');
    submit(formData, { method: 'post' });
  };

  if (!quoteData) return null;

  return <ActionButton onClick={checkout}>Reserve now for $0</ActionButton>;
};

const FormActionBar = () => {
  const { formRef, actionBarAlert, setContinueDisabled, modalAlert, setModalAlert } = useContext(ActionFormContext);
  const isDesktop = useMediaQuery(({ breakpoints }) => breakpoints.up('sm'));

  const { step } = useParams();

  const { ok, error }: any = useActionData() ?? {};
  const submit = useSubmit();
  const navigate = useNavigate();

  const hasActionErrored = typeof ok !== 'undefined' && !ok;

  const { state } = useNavigation();

  const isActionLoadingOrSubmitting = state === 'loading' || state === 'submitting';

  const showActionBarAlert = isDesktop && !hasActionErrored;

  const onClickNextStep = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const intent = formData.get('intent')?.toString();

    if (!formRef.current.reportValidity()) {
      return;
    }
    if (step === 'start' || step === 'mid') {
      if (!intent) {
        formData.append('intent', 'next-step');
      }
    }
    submit(formData, { method: 'post' });
  };

  useEffect(() => {
    if (hasActionErrored && !isActionLoadingOrSubmitting) {
      setContinueDisabled(false);
      console.error(error);
    }
  }, [error, hasActionErrored, isActionLoadingOrSubmitting]);

  return (
    <>
      {modalAlert ? (
        <Dialog open onClose={() => setModalAlert(null)}>
          <CardContent>{modalAlert}</CardContent>
        </Dialog>
      ) : null}
      <Box
        bgcolor="background.default"
        boxShadow="0px -5px 15px rgba(0, 0, 0, 0.1)"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={3}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height={{ xs: 88, md: 100 }}
          width={{ xs: '100%', md: 600, lg: 650 }}
          maxWidth={{ md: 600, lg: 650 }}
          mx="auto"
          px={{ xs: 2, md: 0 }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack color="action" />
          </IconButton>
          {isDesktop && hasActionErrored && !isActionLoadingOrSubmitting ? (
            <Box maxWidth={400} mx={2}>
              <Alert severity="error" variant="standard">
                <Typography variant="body3">
                  {`We're experiencing an issue, please try again later or give us a call, (888) 555-1234.`}
                </Typography>
              </Alert>
            </Box>
          ) : null}
          {showActionBarAlert && actionBarAlert ? actionBarAlert : null}
          {step === 'end' ? <CheckoutButton /> : <ActionButton onClick={onClickNextStep}>Continue</ActionButton>}
        </Box>
      </Box>
    </>
  );
};

export default FormActionBar;
