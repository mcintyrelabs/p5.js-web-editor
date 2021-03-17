import objectID from 'bson-objectid';
import * as ActionTypes from '../../../constants';

const defaultSketch = `from p5 import *


def setup():
  createCanvas(400, 400)


def draw():
  background(220)


run()`;

const defaultHTML =
`<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://assets.computiful.org/pre-alpha/p5.min.js"></script>
    <script src="https://assets.computiful.org/pre-alpha/p5.sound.min.js"></script>
    <script src="https://assets.computiful.org/pre-alpha/skulpt.min.js"></script>
    <script src="https://assets.computiful.org/pre-alpha/skulpt-stdlib.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="p5.computiful.js"></script>
    <script src="skulptSetup.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />
</head>
<body>
    <pre id="output"></pre>
    <div id="sketch-holder"></div>
</body>
</html>
`;

const defaultCSS =
`html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
`;

const p5computiful =
`/**
* By default, p5 uses a left-handed coordinate system with the origin placed
* at the top-left corner of the canvas. This library overrides p5's default
* behavior, creating a right-handed coordinate system with the origin placed
* at the bottom-left corner of the canvas.
* 
* In other words, the canvas is now Quadrant I from math class.
*/
p5.prototype.RIGHT_HAND = 'right-hand';
p5.prototype.LEFT_HAND = 'left-hand';
p5.prototype._coordinateMode = p5.prototype.RIGHT_HAND;


/**
* Transforms the coordinate system based on the current coordinateMode.
*/
p5.prototype._toRightHand = function setCoordinateSystemToRightHanded() {
 if (this._coordinateMode === this.RIGHT_HAND) {
   this.scale(1, -1);
   this.translate(0, -this.height);
 }
};


/**
* Transforms the coordinate system before draw() is called.
*/
p5.prototype.registerMethod('pre', p5.prototype._toRightHand);


/**
* Sets the coordinate system mode to either left-handed or right-handed.
* 
* @param {Constant} mode either LEFT_HAND or RIGHT_HAND
*/
p5.prototype.coordinateMode = function setCoordinateMode(mode) {
 if (mode === this.LEFT_HAND || mode === this.RIGHT_HAND) {
   p5.prototype._coordinateMode = mode;
 }
};

/**
 * Set the default angleMode to degrees.
 */
p5.prototype._angleMode = p5.prototype.DEGREES;

/**
 * Creates a wrapper function to simplify constructing p5.Oscillator objects.
 * 
 * @param {Number} freq defaults to 440Hz (Optional)
 * @param {String} type type of oscillator. Options: 'sine' (default),
 *                      'triangle', 'sawtooth', 'square' (Optional)
 */
p5.prototype.createOscillator = function createP5Oscillator(freq, type) {
  return new p5.Oscillator(freq, type);
};
`;

/* eslint-disable */
const skulptSetup =
`// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) { 
    console.log(text); 
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function uncaught(err) {
    const lineno = err.traceback[0].lineno;
    const msg = err.args.v[0].v;
    throw new Error(msg + " on line " + lineno);
}
  
function runCode() {
  $('#sketch-holder').text('');
  $.get('sketch.py', function (prog) {
    Sk.pre = "output";
    Sk.configure({output:outf, read:builtinRead, uncaughtException:uncaught}); 
    Sk.canvas = "sketch-holder";
    const myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function(mod) {
        console.log(' ');
    },
        function(err) {
            console.log(err.toString());
    });
  }, 'text');
}

runCode();`;
/* eslint-enable */

const initialState = () => {
  const a = objectID().toHexString();
  const b = objectID().toHexString();
  const c = objectID().toHexString();
  const d = objectID().toHexString();
  const e = objectID().toHexString();
  const r = objectID().toHexString();
  return [
    {
      name: 'root',
      id: r,
      _id: r,
      children: [b, a, c, d, e],
      fileType: 'folder',
      content: ''
    },
    {
      name: 'sketch.py',
      content: defaultSketch,
      id: a,
      _id: a,
      isSelectedFile: true,
      fileType: 'file',
      children: []
    },
    {
      name: 'index.html',
      content: defaultHTML,
      id: b,
      _id: b,
      fileType: 'file',
      children: []
    },
    {
      name: 'style.css',
      content: defaultCSS,
      id: c,
      _id: c,
      fileType: 'file',
      children: []
    },
    {
      name: 'skulptSetup.js',
      content: skulptSetup,
      id: d,
      _id: d,
      fileType: 'file',
      children: []
    },
    {
      name: 'p5.computiful.js',
      content: p5computiful,
      id: e,
      _id: e,
      fileType: 'file',
      children: []
    }];
};

function getAllDescendantIds(state, nodeId) {
  return state.find(file => file.id === nodeId).children
    .reduce((acc, childId) => (
      [...acc, childId, ...getAllDescendantIds(state, childId)]
    ), []);
}

function deleteChild(state, parentId, id) {
  const newState = state.map((file) => {
    if (file.id === parentId) {
      const newFile = Object.assign({}, file);
      newFile.children = newFile.children.filter(child => child !== id);
      return newFile;
    }
    return file;
  });
  return newState;
}

function deleteMany(state, ids) {
  const newState = [...state];
  ids.forEach((id) => {
    let fileIndex;
    newState.find((file, index) => {
      if (file.id === id) {
        fileIndex = index;
      }
      return file.id === id;
    });
    newState.splice(fileIndex, 1);
  });
  return newState;
}

function sortedChildrenId(state, children) {
  const childrenArray = state.filter(file => children.includes(file.id));
  childrenArray.sort((a, b) => (a.name > b.name ? 1 : -1));
  return childrenArray.map(child => child.id);
}

function updateParent(state, action) {
  return state.map((file) => {
    if (file.id === action.parentId) {
      const newFile = Object.assign({}, file);
      newFile.children = [...newFile.children, action.id];
      return newFile;
    }
    return file;
  });
}

function renameFile(state, action) {
  return state.map((file) => {
    if (file.id !== action.id) {
      return file;
    }
    return Object.assign({}, file, { name: action.name });
  });
}

const files = (state, action) => {
  if (state === undefined) {
    state = initialState(); // eslint-disable-line
  }
  switch (action.type) {
    case ActionTypes.UPDATE_FILE_CONTENT:
      return state.map((file) => {
        if (file.id !== action.id) {
          return file;
        }

        return Object.assign({}, file, { content: action.content });
      });
    case ActionTypes.SET_BLOB_URL:
      return state.map((file) => {
        if (file.id !== action.id) {
          return file;
        }
        return Object.assign({}, file, { blobURL: action.blobURL });
      });
    case ActionTypes.NEW_PROJECT:
      return [...action.files];
    case ActionTypes.SET_PROJECT:
      return [...action.files];
    case ActionTypes.RESET_PROJECT:
      return initialState();
    case ActionTypes.CREATE_FILE: // eslint-disable-line
    {
      const newState = [
        ...updateParent(state, action),
        {
          name: action.name,
          id: action.id,
          _id: action._id,
          content: action.content,
          url: action.url,
          children: action.children,
          fileType: action.fileType || 'file'
        }];
      return newState.map((file) => {
        if (file.id === action.parentId) {
          file.children = sortedChildrenId(newState, file.children);
        }
        return file;
      });
    }
    case ActionTypes.UPDATE_FILE_NAME:
    {
      const newState = renameFile(state, action);
      return newState.map((file) => {
        if (file.children.includes(action.id)) {
          file.children = sortedChildrenId(newState, file.children);
        }
        return file;
      });
    }
    case ActionTypes.DELETE_FILE:
    {
      const newState = deleteMany(state, [action.id, ...getAllDescendantIds(state, action.id)]);
      return deleteChild(newState, action.parentId, action.id);
      // const newState = state.map((file) => {
      //   if (file.id === action.parentId) {
      //     const newChildren = file.children.filter(child => child !== action.id);
      //     return { ...file, children: newChildren };
      //   }
      //   return file;
      // });
      // return newState.filter(file => file.id !== action.id);
    }
    case ActionTypes.SET_SELECTED_FILE:
      return state.map((file) => {
        if (file.id === action.selectedFile) {
          return Object.assign({}, file, { isSelectedFile: true });
        }
        return Object.assign({}, file, { isSelectedFile: false });
      });
    case ActionTypes.SHOW_FOLDER_CHILDREN:
      return state.map((file) => {
        if (file.id === action.id) {
          return Object.assign({}, file, { isFolderClosed: false });
        }
        return file;
      });
    case ActionTypes.HIDE_FOLDER_CHILDREN:
      return state.map((file) => {
        if (file.id === action.id) {
          return Object.assign({}, file, { isFolderClosed: true });
        }
        return file;
      });
    default:
      return state.map((file) => {
        file.children = sortedChildrenId(state, file.children);
        return file;
      });
  }
};

export const getHTMLFile = state => state.filter(file => file.name.match(/.*\.html$/i))[0];
export const getJSFiles = state => state.filter(file => file.name.match(/.*\.js$/i));
export const getCSSFiles = state => state.filter(file => file.name.match(/.*\.css$/i));
export const getLinkedFiles = state => state.filter(file => file.url);

export default files;
