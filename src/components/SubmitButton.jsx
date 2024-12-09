import { Button } from "@mui/material";

export default function SubmitButton({ label, onClick, status }) {

    switch (status) {
        case "success":
            return <Button variant="outlined" color="success">Success!</Button>;
        case "error":
            return <Button variant="outlined" color="error">Error</Button>;
        case "loading":
            return <Button variant="outlined" disabled>Loading...</Button>;
        default:
            return <Button variant="contained" onClick={onClick}>{label}</Button>;
    }
}
