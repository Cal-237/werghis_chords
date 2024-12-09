import { notesFlat, notesSharp } from "./keys";

function chordIndices(str) {
  const indices = [];
  let isWordStart = false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " " && !isWordStart) {
      // Found the start of a word
      indices.push(i);
      isWordStart = true;
    } else if (str[i] === " ") {
      // Found a space, set isWordStart to false
      isWordStart = false;
    }
  }

  return indices;
}

function parseChord(str, scale) {
  let chord = str.trim();
  let notes = [];
  let returnObj = { num: -1 };

  if (chord.indexOf("#") != -1 || scale.indexOf("#") != -1) {
    notes = notesSharp;
  } else {
    notes = notesFlat;
  }

  if (
    (chord.indexOf("#") != -1 && scale.indexOf("b") != -1) ||
    (chord.indexOf("b") != -1 && scale.indexOf("#") != -1)
  ) {
    alert("Key and chord do not match.");
    throw new Error("ParseChord error: Key and chord do not match.");
  }

  if (chord[0] == "*") {
    returnObj.opt = true;
    chord = chord.substring(1);
  }

  // take the first 1-2 chars out as the "num"
  if (
    chord.substring(0, 2).indexOf("#") == -1 &&
    chord.substring(0, 2).indexOf("b") == -1
  ) {
    // if no flat or sharp
    // take first char
    let chordNote = chord.substring(0, 1);
    returnObj.num =
      (((notes.indexOf(chordNote) - notes.indexOf(scale)) % 12) + 12) % 12;
    chord = chord.substring(1);
  } else {
    // take first two chars
    let chordNote = chord.substring(0, 2);
    returnObj.num =
      (((notes.indexOf(chordNote) - notes.indexOf(scale)) % 12) + 12) % 12;
    chord = chord.substring(2);
  }

  // add a type and bass note if they exist

  if (chord.indexOf("/") === -1) {
    // if there's no bass note
    if (chord != "") returnObj.type = chord; // add a type if there is one
  } else {
    // if there IS a bass note
    if (chord[0] != "/")
      returnObj.type = chord.substring(0, chord.indexOf("/")); // set type to whatever comes before the "/"

    chord = chord.substring(chord.indexOf("/") + 1); // bass note is the only thing left now

    //handle chord note the same as bass note
    returnObj.bass =
      (((notes.indexOf(chord) - notes.indexOf(scale)) % 12) + 12) % 12;
  }

  return returnObj;
}

function parseStanza(text, scale) {
  let stanzaObject = { lines: [] };

  let lines = text.split("\n");

  stanzaObject.name = lines[0].substring(0, lines[0].indexOf("]"));

  lines = lines.slice(1);

  /* if (stanzaObject.name == "Interlude" || stanzaObject.name == "Intro") {
    // TODO

    let lineObjects = []
    lines.foreach((line) => {

    })
  } */

  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    let nextLine = lines[i + 1];

    if (line.trim() == "") {
      i++;
      continue;
    }

    let lineObject = { segments: [] };

    let indices = chordIndices(line);
    // if first line has no chord at the start, push a segment with no chord
    if (indices[0] != 0) {
      lineObject.segments.push({
        chord: {
          num: -1,
        },
        text: nextLine.substring(0, indices[0]),
      });
    }

    //go thru each chord and make a segment for it
    indices.forEach((indexOfChord, i) => {
      if (i + 1 < indices.length) {
        lineObject.segments.push({
          chord: parseChord(
            line.substring(indexOfChord, indices[i + 1]),
            scale
          ),
          text: nextLine.substring(indexOfChord, indices[i + 1]),
        });
      } else {
        lineObject.segments.push({
          chord: parseChord(line.substring(indexOfChord), scale),
          text: nextLine.substring(indexOfChord),
        });
      }
    });

    //add the line to the current stanza
    stanzaObject.lines.push(lineObject);

    //next line
    i += 2;
  }

  return stanzaObject;
}

/** returns an array [songInfo, songData] 
 * where song data is an object {stanzas: [...]}
 */
export default function parseSongObject(text, title, scale) {
  if (text.indexOf("[") == -1) {
    throw new Error("No Stanzas found. Use [ ] to indicate a stanza.")
  }

  let stanzasText = text.split("[").slice(1);

  let stanzas = [];

  stanzasText.forEach((stanza) => {
    stanzas.push(parseStanza(stanza, scale));
  })
  
  
  //construct date string
  let now = new Date();
  let dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

  return [
    {
      title,
      date: dateStr,
    },
    {
      title,
      date: dateStr,
      stanzas,
    },
  ];
}