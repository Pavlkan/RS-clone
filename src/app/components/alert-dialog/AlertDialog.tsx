import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type AlertDialogProps = {
  title: string;
  content: string;
  responseHandler: (resp: boolean) => void;
  open?: boolean;
};

const AlertDialog: React.FC<AlertDialogProps> = ({ title, content, responseHandler, open = false }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => responseHandler(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => responseHandler(false)}>Disagree</Button>
          <Button onClick={() => responseHandler(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
