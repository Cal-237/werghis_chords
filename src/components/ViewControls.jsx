import { Box, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { notesSharp, notesFlat } from "../scripts/keys";

export default function ViewControls({ params, handleChange }) {
  
  return (
    <Box display={"flex"} columnGap={2}>
      <ToggleButtonGroup
        size="small"
        id="display-type"
        value={params.displayType}
        exclusive
        onChange={handleChange}
        aria-label="Display"
      >
        <ToggleButton id="display-type1" value="lyrics">Lyrics</ToggleButton>
        <ToggleButton id="display-type2" value="chords">Chords</ToggleButton>
      </ToggleButtonGroup>

      {params.displayType == "chords" &&
      <FormControl id="chord-controls" size="small" sx={{flexDirection: "row"}}>
        <InputLabel id="select-key-label">Key</InputLabel>
        <Select
          labelId="select-key-label"
          id="select-key"
          value={params.key}
          label="Key"
          onChange={handleChange}
          sx={{ minWidth: 100 }}
        >
          {(params.flats ? notesFlat : notesSharp).map((note) => (
            <MenuItem
              value={note}
              key={(params.flats ? notesFlat : notesSharp).indexOf(note)}
            >
              {note}
            </MenuItem>
          ))}
        </Select>
        <FormGroup sx={{ justifyContent: "center" }}>
        <FormControlLabel
          sx={{ marginX: 1 }}
          control={
            <Switch
              size="small"
              id="use-flats"
              checked={params.flats}
              onChange={handleChange}
            />
          }
          label="♭"
        />
      </FormGroup>
      </FormControl>
      }
      
    </Box>
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