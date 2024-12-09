import { Typography, createTheme, ThemeProvider } from "@mui/material";
import { notesSharp, notesFlat } from "../scripts/keys";
import React from "react";

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body2",
          },
          style: {
            fontSize: ".8rem",
            lineHeight: "1.5rem"
          },
        },
      ],
    },
  },
});

export default function Chord({ useFlats, chord, songKey }) {
  const notes = useFlats ? notesFlat : notesSharp;

  if (chord.num == -1) {
    return <Typography mb={-0.5} align="left">{"\u00A0"}</Typography>;
  }

  const chordNote = (notes.indexOf(songKey) + chord.num) % 12;
  let chordString = notes[chordNote];

  if (chord.type) chordString += chord.type;

  if (chord.bass !== undefined) {
    const bassNote = (notes.indexOf(songKey) + chord.bass) % 12;
    chordString += "/";
    chordString += notes[bassNote];
  }

  //if chord is optional, make it smaller
  return (
    <ThemeProvider theme={theme}>
      <Typography fontWeight={"bold"} mb={-0.5} variant={chord.opt ? "body2" : "body1"} align="left">
        {chordString}
      </Typography>
    </ThemeProvider>
  );
}