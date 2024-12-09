import { notesFlat } from "../scripts/keys";

function chordObjectToString(chord, key) {
  const notes = notesFlat;

  if (chord.num == -1) {
    return "";
  }

  const chordNote = (notes.indexOf(key) + chord.num) % 12;
  let chordString = notes[chordNote];

  if (chord.opt) chordString = "*" + chordString;

  if (chord.type) chordString += chord.type;

  if (chord.bass !== undefined) {
    const bassNote = (notes.indexOf(key) + chord.bass) % 12;
    chordString += "/";
    chordString += notes[bassNote];
  }

  return chordString;
}

export default function createEditableText(songObject, key) {
  let stringLines = [];

  songObject.stanzas.forEach((stanza) => {
    stringLines.push("[" + stanza.name + "]");

    stanza.lines.forEach((line) => {
      let chordLine = "";
      let lyricLine = "";

      for (let i = 0; i < line.segments.length; i++) {
        const segment = line.segments[i];

        lyricLine += segment.text;
        
        
        let chordString = chordObjectToString(segment.chord, key);
        chordLine += chordString;

        let diff = lyricLine.length - chordLine.length;
        chordLine += " ".repeat(diff >= 0 ? diff : 0);
      }

      stringLines.push(chordLine);
      stringLines.push(lyricLine);
    });
  });

  return stringLines.join("\n");
}
