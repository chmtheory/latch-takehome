import './App.css';
import input from "./input.json";

function App() {

  var html = parseJSON(input[0]);
  
  return (
    <div className="contract" dangerouslySetInnerHTML={{__html: html}}></div>
  );
}

// Wrapper function for recursive function to provide additional base arguments.
function parseJSON(json) {
  return parser(json, false);
}

// Recursive function to parse JSON into HTML.
function parser(json, flag_p) {
  var str = ""; // Content, to be placed in between tags.
  var mark_beginning = ""; // Opening tag.
  var mark_end = ""; // Ending tag.

  // Handling of specific element types.
  if (json.type) {
    if (json.type === "mention") {
      // Define some custom styling for a mention tag, and define an id for it so we can refer to it later (if necessary).
      mark_beginning += "<mention id=" + json.id + " style=\"font-size: 0.875em; border-radius: 5px; color: white; background-color: " + json.color +";\">";
      mark_end += "</mention>"; 
    } else if (flag_p && json.type === "p") {
      // Creating nested <p> tags inside a <p> tag causes all sorts of formatting issues, so we don't want to create any new tags here.
    } else if (json.type === "clause") {
      // Clauses are lists and we want it to default to list functionality.
        mark_beginning += "<ol>";
        mark_end += "</ol>"; 
    } else {
      mark_beginning += "<" + json.type + ">";
      mark_end += "</" + json.type + ">"; 
    }
  }

  if (json.children) {
    for (var child of json.children) {
      // If we're currently inside of a <p> tag, set flag_p to true so that we won't create additional <p> tags.
      str += parser(child, flag_p || json.type === "p");
    }
  } else {
    str = json.text;
  }

  // Mark handling.
  if (json.underline) {
    mark_beginning += "<u>";
    mark_end += "</u>";
  }

  if (json.bold) {
    mark_beginning += "<b>";
    mark_end += "</b>";
  }

  if (json.italics) {
    mark_beginning += "<i>";
    mark_end += "</i>";
  }

  return mark_beginning + str + mark_end;
}


export default App;
