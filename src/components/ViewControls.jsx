import { FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { notesSharp, notesFlat } from "../scripts/keys";

export default function ViewControls({ params, handleChange }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120, flexDirection: "row"}} size="small">
      <InputLabel id="select-key-label">Key</InputLabel>
      <Select
        labelId="select-key-label"
        id="select-key"
        value={params.key}
        label="Key"
        onChange={handleChange}
        sx={{minWidth: 100}}
      >
        {(params.flats ? notesFlat : notesSharp).map((note) => (
          <MenuItem value={note} key={(params.flats ? notesFlat : notesSharp).indexOf(note)}>
            {note}
          </MenuItem>
        ))}
      </Select>
      <FormGroup sx={{justifyContent: "center"}}>
        <FormControlLabel
          sx={{ marginX: 1 }}
          control={
            <Switch size="small" id="use-flats" checked={params.flats} onChange={handleChange}/>
          }
          label="Use Flats"
        />
      </FormGroup>
    </FormControl>
  );
}

/* <FormControlLabel
          sx={{ marginLeft: 1}}
          control={
            <Switch size="small" id="two-cols" checked={params.twoCols} onChange={handleChange}/>
          }
          label="Two Columns"
        />
*/