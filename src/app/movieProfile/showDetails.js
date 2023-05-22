import React from "react";
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

export default function showDetails(props) {
    const { openPopup, setOpenPopup, details } = props;

    let fullWidth = true;
    let maxWidth = 'sm'

    const handleClose = () => {
        setOpenPopup(false);
    };

    return (
        <div>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openPopup}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <DialogTitle id="alert-dialog-title">
                        Movie Details
                    </DialogTitle>
                    <Button sx={{ color: "#000" }} variant="" onClick={handleClose}>
                        <CloseIcon />
                    </Button>
                </div>
                <DialogContent>
                    <List>Title : {details?.movie_title}</List>
                    <List>Description : {details?.movie_description}</List>
                    <List>Duration : {details?.movie_duration}</List>
                    <List>Genre : {details?.movie_genre}</List>
                </DialogContent>
            </Dialog>
        </div>
    );
}