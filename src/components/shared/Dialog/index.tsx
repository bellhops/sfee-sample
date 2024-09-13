import React from 'react';

import { arrayOf, bool, func, node, number, oneOfType, string } from 'prop-types';
import { Box, IconButton, Dialog as MuiDialog, useMediaQuery, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';

const Dialog = ({ open, onClose, children, width, height }) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  return (
    <MuiDialog open={open} onClose={onClose} fullScreen={isMobile} PaperProps={{ elevation: 0, sx: { borderRadius: 2 } }}>
      <Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
        <IconButton onClick={onClose}>
          <Close fontSize={isMobile ? 'large' : 'small'} />
        </IconButton>
      </Box>
      <Box maxWidth={isMobile ? '100%' : width} maxHeight={height}>
        {children}
      </Box>
    </MuiDialog>
  );
};

Dialog.propTypes = {
  children: oneOfType([node, arrayOf(node)]),
  onClose: func.isRequired,
  open: bool.isRequired,
  width: oneOfType([number, string]),
  height: oneOfType([number, string]),
};

Dialog.defaultProps = {
  children: null,
  width: 400,
  height: 600,
};

export default Dialog;
