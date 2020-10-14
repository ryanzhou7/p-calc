"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculatedLossPercent = calculatedLossPercent;
exports.combinedAnalysis = combinedAnalysis;
exports.fullAnalysis = fullAnalysis;
exports.colorEdges = colorEdges;
exports.getEdgeCanvasHelper = getEdgeCanvasHelper;

var ImageAnalysis = _interopRequireWildcard(require("../../utils/ImageAnalysis"));

var combinedCanvasInfoReducer = _interopRequireWildcard(require("../../redux/combinedCanvasInfoReducer"));

var _canvasData = _interopRequireDefault(require("../../models/canvasData"));

var _jsfeat = _interopRequireDefault(require("jsfeat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Consider that some non chart area will be capture, thus start the calculations from a padding, not from the very top
var START_HEIGHT = 30;

function fullAnalysis(image, combinedCanvasInfo, canvasRef, threshold) {
  var width, height, dimensions, canvas, edgeContext, edgeCanvas, context, imageData, canvasData, maxCoor, maxDetectedPixels, nextMaxCoor, nextMaxdetectedPixels, topDetectedPixels, bottomDetectedPixels, _ref, _ref2, leftX, rightX, recolor, topPixelsCount, bottomPixelsCount;

  return regeneratorRuntime.async(function fullAnalysis$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          width = image.width, height = image.height;
          dimensions = {
            detectionWidth: width,
            detectionHeight: height
          }; // Edge canvas stuff

          canvas = canvasRef.current;
          edgeContext = canvas.getContext("2d");
          _context.next = 6;
          return regeneratorRuntime.awrap(getEdgeCanvasHelper(image, edgeContext));

        case 6:
          edgeCanvas = _context.sent;

          /*
           * Setup
           */
          context = combinedCanvasInfo.context;
          context.drawImage(image, 0, 0, width, height);
          imageData = context.getImageData(0, 0, width, height);
          canvasData = new _canvasData["default"]({
            canvasWidth: dimensions.detectionWidth,
            imageArray: imageData.data
          });
          /*
           * Max / Next Max
           */
          // Max

          _context.next = 13;
          return regeneratorRuntime.awrap(findMax(canvasData, dimensions));

        case 13:
          maxCoor = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(ImageAnalysis.getDetectedPixels(canvasData, maxCoor, edgeCanvas, {
            width: width,
            height: height
          }, threshold));

        case 16:
          maxDetectedPixels = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(findNextMax(maxCoor, canvasData, width, height));

        case 19:
          nextMaxCoor = _context.sent;
          _context.next = 22;
          return regeneratorRuntime.awrap(ImageAnalysis.getDetectedPixels(canvasData, nextMaxCoor, edgeCanvas, {
            width: width,
            height: height
          }, threshold));

        case 22:
          nextMaxdetectedPixels = _context.sent;

          /*
           * Max / Next Max -> top / bottom
           */
          // assume that max coor is above next max
          topDetectedPixels = maxDetectedPixels;
          bottomDetectedPixels = nextMaxdetectedPixels; // Means that max coor is not above next max

          if (maxCoor.y > nextMaxCoor.y) {
            // Switch them
            _ref = [bottomDetectedPixels, topDetectedPixels];
            topDetectedPixels = _ref[0];
            bottomDetectedPixels = _ref[1];
          }
          /*
           * Recolor
           */
          //  Cutoff finding


          _context.next = 28;
          return regeneratorRuntime.awrap(findCutOff(topDetectedPixels, bottomDetectedPixels));

        case 28:
          _ref2 = _context.sent;
          leftX = _ref2.left;
          rightX = _ref2.right;
          // Recoloring
          recolor = {
            r: 0,
            g: 255,
            b: 0
          };
          _context.next = 34;
          return regeneratorRuntime.awrap(ImageAnalysis.updateImageData(canvasData, {
            leftX: leftX,
            rightX: rightX,
            height: height
          }, recolor, topDetectedPixels));

        case 34:
          topPixelsCount = _context.sent;
          _context.next = 37;
          return regeneratorRuntime.awrap(ImageAnalysis.updateImageData(canvasData, {
            leftX: leftX,
            rightX: rightX,
            height: height
          }, {
            r: 0,
            g: 0,
            b: 255
          }, bottomDetectedPixels));

        case 37:
          bottomPixelsCount = _context.sent;
          context.putImageData(imageData, 0, 0, 0, 0, dimensions.detectionWidth, dimensions.detectionHeight);
          return _context.abrupt("return", Promise.resolve({
            topPixelsCount: topPixelsCount,
            bottomPixelsCount: bottomPixelsCount
          }));

        case 40:
        case "end":
          return _context.stop();
      }
    }
  });
}

function findNextMax(maxCoor, canvasData, width, height) {
  var photoOriginY, middleX, distanceFromOrigin, distanceFromTop, isTopToBottomSearch, boundary, coor, intensity, y, coordinate, rgbPixel, value;
  return regeneratorRuntime.async(function findNextMax$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Setup
          photoOriginY = height / 2;
          middleX = width / 2;
          distanceFromOrigin = Math.abs(maxCoor.y - photoOriginY);
          distanceFromTop = maxCoor.y; // If the already found coor's distance from the bottom (origin) is less than the tops then
          // it's closer to the bottom and we are searching from top to bottom

          isTopToBottomSearch = distanceFromOrigin < distanceFromTop;
          boundary = distanceFromTop; // Ensure that boundary is least some distance from the top / bottom so it won't be mistaken

          boundary += isTopToBottomSearch ? -10 : 10;
          coor = {
            x: middleX
          };
          intensity = Number.MIN_SAFE_INTEGER;
          y = isTopToBottomSearch ? START_HEIGHT : photoOriginY;

          while (y !== boundary) {
            coordinate = {
              x: middleX,
              y: y
            };
            rgbPixel = canvasData.rgbPixel(coordinate);
            value = rgbPixel.r * 2 - rgbPixel.b - rgbPixel.g;

            if (value > intensity) {
              coor = {
                y: y,
                x: middleX
              };
              intensity = value;
            }

            isTopToBottomSearch ? y++ : y--;
          }

          return _context2.abrupt("return", coor);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function findMax(canvasData, _ref3) {
  var detectionWidth, detectionHeight, middleX, coor, intensity, y, coordinate, rgbPixel, value;
  return regeneratorRuntime.async(function findMax$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          detectionWidth = _ref3.detectionWidth, detectionHeight = _ref3.detectionHeight;
          middleX = detectionWidth / 2;
          coor = {
            x: middleX
          };
          intensity = 0; // We use detection height / 2 so we only detect for the upper half of the image

          for (y = START_HEIGHT; y < detectionHeight / 2; y++) {
            coordinate = {
              x: middleX,
              y: y
            };
            rgbPixel = canvasData.rgbPixel(coordinate);
            value = rgbPixel.r * 2 - rgbPixel.b - rgbPixel.g;

            if (value > intensity) {
              coor.y = y;
              intensity = value;
            }
          }

          return _context3.abrupt("return", coor);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function calculatedLossPercent(outerPixels, innerPixels) {
  var percentage = 100 * (outerPixels - innerPixels) / outerPixels;
  return percentage.toFixed(2);
}

function combinedAnalysis(outerCanvasInfo, innerCanvasInfo, combinedCanvasInfo, canvasDimensions, dispatch) {
  var outerDetectedPixels, innerDetectedPixels, _ref4, leftX, rightX, _ref5, imageData, outerNumPixelsColored, innerNumPixelsColored;

  return regeneratorRuntime.async(function combinedAnalysis$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          outerDetectedPixels = outerCanvasInfo.detectedPixels;
          innerDetectedPixels = innerCanvasInfo.detectedPixels;
          _context4.next = 4;
          return regeneratorRuntime.awrap(findCutOff(outerDetectedPixels, innerDetectedPixels));

        case 4:
          _ref4 = _context4.sent;
          leftX = _ref4.left;
          rightX = _ref4.right;
          _context4.next = 9;
          return regeneratorRuntime.awrap(ImageAnalysis.colorAreaWithBounds(canvasDimensions, outerCanvasInfo, innerCanvasInfo, combinedCanvasInfo, {
            leftX: leftX,
            rightX: rightX
          }));

        case 9:
          _ref5 = _context4.sent;
          imageData = _ref5.imageData;
          outerNumPixelsColored = _ref5.outerNumPixelsColored;
          innerNumPixelsColored = _ref5.innerNumPixelsColored;
          combinedCanvasInfo.context.putImageData(imageData, 0, 0, 0, 0, canvasDimensions.width, canvasDimensions.height);
          dispatch(combinedCanvasInfoReducer.setContext(combinedCanvasInfo.context));
          dispatch(combinedCanvasInfoReducer.setNumColoredInnerPixels(innerNumPixelsColored));
          dispatch(combinedCanvasInfoReducer.setNumColoredOuterPixels(outerNumPixelsColored));

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function findCutOff(detectedPixels1, detectedPixels2) {
  var smallestX1, smallestX2, largestX1, largestX2, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, coordinate, x, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _coordinate, _x;

  return regeneratorRuntime.async(function findCutOff$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          smallestX1 = Number.MAX_SAFE_INTEGER;
          smallestX2 = Number.MAX_SAFE_INTEGER;
          largestX1 = 0;
          largestX2 = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context5.prev = 7;

          for (_iterator = detectedPixels1[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            coordinate = _step.value;
            x = coordinate.x;
            smallestX1 = Math.min(smallestX1, x);
            largestX1 = Math.max(largestX1, x);
          }

          _context5.next = 15;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context5.t0;

        case 15:
          _context5.prev = 15;
          _context5.prev = 16;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 18:
          _context5.prev = 18;

          if (!_didIteratorError) {
            _context5.next = 21;
            break;
          }

          throw _iteratorError;

        case 21:
          return _context5.finish(18);

        case 22:
          return _context5.finish(15);

        case 23:
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context5.prev = 26;

          for (_iterator2 = detectedPixels2[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _coordinate = _step2.value;
            _x = _coordinate.x;
            smallestX2 = Math.min(smallestX2, _x);
            largestX2 = Math.max(largestX2, _x);
          }

          _context5.next = 34;
          break;

        case 30:
          _context5.prev = 30;
          _context5.t1 = _context5["catch"](26);
          _didIteratorError2 = true;
          _iteratorError2 = _context5.t1;

        case 34:
          _context5.prev = 34;
          _context5.prev = 35;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 37:
          _context5.prev = 37;

          if (!_didIteratorError2) {
            _context5.next = 40;
            break;
          }

          throw _iteratorError2;

        case 40:
          return _context5.finish(37);

        case 41:
          return _context5.finish(34);

        case 42:
          return _context5.abrupt("return", {
            left: Math.max(smallestX1, smallestX2),
            right: Math.min(largestX1, largestX2)
          });

        case 43:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[7, 11, 15, 23], [16,, 18, 22], [26, 30, 34, 42], [35,, 37, 41]]);
}
/* Not in use  */


function getEdgeCanvasHelper(image, context) {
  var width, height, imageData, columns, rows, data_type, img_u8, r, kernel_size, low_threshold, high_threshold, data_u32, alpha, i, pix, edgeCanvas;
  return regeneratorRuntime.async(function getEdgeCanvasHelper$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          width = image.width, height = image.height;
          context.drawImage(image, 0, 0, width, height);
          imageData = context.getImageData(0, 0, width, height);
          columns = 450, rows = 320, data_type = _jsfeat["default"].U8_t;
          img_u8 = new _jsfeat["default"].matrix_t(columns, rows, data_type);

          _jsfeat["default"].imgproc.grayscale(imageData.data, width, height, img_u8);

          r = 3; // 0 -4

          kernel_size = r + 1 << 1;
          low_threshold = 120; // 1 - 127

          high_threshold = 120; // 1 - 127

          _jsfeat["default"].imgproc.gaussian_blur(img_u8, img_u8, kernel_size, 0);

          _jsfeat["default"].imgproc.canny(img_u8, img_u8, low_threshold, high_threshold); // render result back to canvas


          data_u32 = new Uint32Array(imageData.data.buffer);
          alpha = 0xff << 24;
          i = img_u8.cols * img_u8.rows, pix = 0;

          while (--i >= 0) {
            pix = img_u8.data[i];
            data_u32[i] = alpha | pix << 16 | pix << 8 | pix;
          } // Draw canny


          context.putImageData(imageData, 0, 0, 0, 0, width, height);
          edgeCanvas = new _canvasData["default"]({
            canvasWidth: width,
            imageArray: imageData.data
          });
          return _context6.abrupt("return", edgeCanvas);

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function colorEdges(image, combinedCanvasInfo) {
  var width, height, dimensions, context, imageData, canvasData, y, x, coor;
  return regeneratorRuntime.async(function colorEdges$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          width = image.width, height = image.height;
          dimensions = {
            detectionWidth: width,
            detectionHeight: height
          };
          context = combinedCanvasInfo.context;
          context.drawImage(image, 0, 0, width, height);
          imageData = context.getImageData(0, 0, width, height);
          canvasData = new _canvasData["default"]({
            canvasWidth: dimensions.detectionWidth,
            imageArray: imageData.data
          });

          for (y = 5; y < height / 2; y++) {
            for (x = 5; x < width - 10; x++) {
              coor = {
                x: x,
                y: y
              };

              if (ImageAnalysis.isEdge(coor, canvasData)) {
                canvasData.recolor(coor, {
                  r: 0,
                  g: 255,
                  b: 0
                });
              }
            }
          }

          context.putImageData(imageData, 0, 0, 0, 0, dimensions.detectionWidth, dimensions.detectionHeight);

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  });
}