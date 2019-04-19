const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasInfo = {
  width: window.innerWidth / 3,
  height: 75,
  square: 0,
};

canvasInfo.square = canvasInfo.width * canvasInfo.height;

const configCanvas = () => {
  canvas.width = canvasInfo.width;
  canvas.height = canvasInfo.height;
};

const fireColorsPalette = [
  'rgba(7, 7, 7, 0.0)',
  'rgb(31, 7, 7, 0.1)',
  'rgb(47, 15, 7, 0.2)',
  'rgb(71, 15, 7, 0.3)',
  'rgb(87, 23, 7, 0.4)',
  'rgb(103, 31, 7, 0.5)',
  'rgb(119, 31, 7, 0.6)',
  'rgb(143, 39, 7, 0.7)',
  'rgb(159, 47, 7, 0.8)',
  'rgb(175, 63, 7, 0.9)',
  'rgb(191, 71, 7)',
  'rgb(199, 71, 7)',
  'rgb(223, 79, 7)',
  'rgb(223, 87, 7)',
  'rgb(223, 87, 7)',
  'rgb(215, 95, 7)',
  'rgb(215, 95, 7)',
  'rgb(215, 103, 15)',
  'rgb(207, 111, 15)',
  'rgb(207, 119, 15)',
  'rgb(207, 127, 15',
  'rgb(207, 135, 23',
  'rgb(199, 135, 23',
  'rgb(199, 143, 23)',
  'rgb(199, 151, 31)',
  'rgb(191, 159, 31)',
  'rgb(191, 159, 31)',
  'rgb(191, 167, 39)',
  'rgb(191, 167, 39)',
  'rgb(191, 175, 47)',
  'rgb(183, 175, 47)',
  'rgb(183, 183, 47)',
  'rgb(183, 183, 55)',
  'rgb(207, 207, 111)',
  'rgb(223, 223, 159)',
  'rgb(239, 239, 199)',
  'rgb(255, 255, 255)',
];

const dataStructure = new Array(canvasInfo.square)
  .fill({})
  .map((data, index) => ({
      colorIndex: 0,
      x: index % canvasInfo.width,
      y: Math.floor(index / canvasInfo.width),
    })
  );

const renderPixel = (x, y, color) => {
  context.clearRect(x, y, 1, 1);

  context.beginPath();
  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
  context.closePath();
}

const calculateFireStrengh = () => {
  const rows = canvasInfo.width;

  for (let i = dataStructure.length; i > 0; i--) {
    const neighborBellowIndex = i + rows;
    const decay = Math.floor(Math.random() * 3);
    const colorIndexBase = dataStructure[neighborBellowIndex] ? dataStructure[neighborBellowIndex].colorIndex : fireColorsPalette.length - 1;
    let colorIndex = colorIndexBase - decay;
    colorIndex = colorIndex > 0 ? colorIndex : 0;

    const data = dataStructure[i - decay];
    
    if (data) {
      data.colorIndex = colorIndex;

      renderPixel(data.x, data.y, fireColorsPalette[colorIndex]);
    }
  }
};

/**
 * Start executing
 */
configCanvas();

const animationFrame = () => {
  // context.clearRect(0, 0, canvas.width, canvas.height);

  calculateFireStrengh();
  context.fill();
  
    requestAnimationFrame(animationFrame);
};

animationFrame();