class Sort {
  constructor(arr) {
    this.arr = arr;
  }

  getArray() {
    return this.arr;
  }
}

class InsertionSort extends Sort {
  constructor(arr) {
    super(arr);
    this.i = 1;
    this.j = 0;
    this.key = this.arr[this.i];
  }

  iterate() {
    // This needs to be fixed
    if (this.i >= this.arr.length) return true;
    else {
      this.key = this.arr[this.i];

      if (this.j >= 0 && this.arr[this.j] > this.key) {
        this.arr[this.j + 1] = this.arr[this.j];
        this.j--;
      } else {
        this.arr[this.j + 1] = this.key;
        this.i++;
        this.j = this.i - 1;
      }
      return false;
    }
  }
}

class SelectionSort extends Sort {
  constructor(arr) {
    super(arr);
    this.i = 0;
    this.minIdx = 1;
    this.j = 1;
  }

  iterate() {
    if (this.i !== this.arr.length - 1) {
      if (this.j !== this.arr.length) {
        if (this.arr[this.j] < this.arr[this.minIdx]) this.minIdx = this.j;
        this.j++;
      } else {
        // Swap
        let temp = this.arr[this.minIdx];
        this.arr[this.minIdx] = this.arr[this.i];
        this.arr[this.i] = temp;

        // Iterate
        this.i++;
        this.j = this.i + 1;
        this.minIdx = this.i + 1;
        return false;
      }
    } else {
      return true;
    }
  }
}

class BubbleSort extends Sort {
  constructor(arr) {
    super(arr);
    this.i = 0;
    this.j = 1;
  }

  iterate() {
    if (this.i !== this.arr.length - 1) {
      if (this.j !== this.arr.length - this.i - 1) {
        if (this.arr[this.j + 1] < this.arr[this.j]) {
          let temp = this.arr[this.j + 1];
          this.arr[this.j + 1] = this.arr[this.j];
          this.arr[this.j] = temp;
        }
        this.j++;
      } else {
        // Iterate
        this.i++;
        this.j = 0;

        return false;
      }
    } else {
      return true;
    }
  }

  getArray() {
    return this.arr;
  }
}

sortObj = new SelectionSort(generateData(60, 100));

done = false;

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(WIDTH, HEIGHT);
  noLoop();
  sel = createSelect();
  sel.option('Selection Sort');
  sel.option('Bubble Sort');
  sel.changed(newSelection);
  fps = createSelect();
  fps.option('0.5x');
  fps.option('1x');
  fps.option('2x');
  fps.option('4x');
  fps.changed(newFPS);
  button = createButton('Toggle');
  reset = createButton('Reset');
  reset.mousePressed(newSelection);
  button.mousePressed(start);
}

function draw() {
  background(220);
  if (sortObj.iterate()) {
    noLoop();
    done = true;
  }
  drawArray(sortObj.getArray(), 100, sortObj);
}

function start() {
  button.mousePressed(stop);
  newFPS();
  loop();
}

function stop() {
  noLoop();
  button.mousePressed(start);
}

function newSelection() {
  noLoop();
  button.mousePressed(start);
  let item = sel.value();
  if (item == 'Selection Sort') {
    sortObj = new SelectionSort(generateData(60, 100));
  } else if (item == 'Bubble Sort') {
    sortObj = new BubbleSort(generateData(60, 100));
  }
  drawArray(sortObj.getArray(), 100, sortObj);
}

function newFPS() {
  let item = fps.value();
  switch (item) {
    case '0.5x':
      frameRate(15);
      break;
    case '1x':
      frameRate(30);
      break;
    case '2x':
      frameRate(60);
      break;
    case '4x':
      frameRate(120);
      break;
    default:
      break;
  }
}

function drawArray(arr, max, sortObj) {
  background(220);
  let colWidth = WIDTH / arr.length;
  for (let i in arr) {
    let colHeight = (arr[i] / max) * HEIGHT;
    fill(0);
    stroke(0);
    if (i == sortObj.i) {
      fill(color(0, 128, 255));
      stroke(color(0, 128, 255));
    } else if (i == sortObj.minIdx || i == sortObj.key) {
      fill(color(128, 0, 0));
      stroke(color(128, 0, 0));
    } else if (i == sortObj.j) {
      fill(color(0, 200, 0));
      stroke(color(0, 200, 0));
    }
    rect(i * colWidth, HEIGHT, colWidth, -colHeight);
  }
}

function generateData(n, max) {
  let data = [];
  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * max));
  }
  return data;
}
