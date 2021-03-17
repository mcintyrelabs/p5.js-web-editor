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
    <script src="https://assets.computiful.org/pre-alpha/p5.js"></script>
    <script src="https://assets.computiful.org/pre-alpha/p5.sound.js"></script>
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

export default function createDefaultFiles() {
  return {
    'index.html': {
      content: defaultHTML
    },
    'style.css': {
      content: defaultCSS
    },
    'sketch.py': {
      content: defaultSketch
    },
    'skulptSetup.js': {
      content: skulptSetup
    },
    'p5.computiful.js': {
      content: p5computiful
    }
  };
}
