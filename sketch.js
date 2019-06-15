class Sort {
  constructor(arr) {
    this.arr = arr;
  }

  getArray() {
    return this.arr;
  }
}

class MergeSort extends Sort {
  constructor(arr) {
    super(arr);
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
    if (this.i < this.arr.length) {
      if (this.j >= 0 && this.arr[this.j] > this.key) {
        this.arr[this.j + 1] = this.arr[this.j];
        this.j--;
      } else {
        this.arr[this.j + 1] = this.key;
        this.i++;
        this.key = this.arr[this.i];
        this.j = this.i - 1;
      }

      return false;
    } else return true;
  }
}

class SelectionSort extends Sort {
  constructor(arr) {
    super(arr);
    this.i = 0;
    this.minIdx = this.i;
    this.j = 1;
  }

  iterate() {
    if (this.i < this.arr.length) {
      if (this.j < this.arr.length) {
        if (this.arr[this.j] < this.arr[this.minIdx]) this.minIdx = this.j;
        this.j++;
      } else {
        // Swap
        let temp = this.arr[this.minIdx];
        this.arr[this.minIdx] = this.arr[this.i];
        this.arr[this.i] = temp;

        // Iterate
        this.i++;
        this.minIdx = this.i;
        this.j = this.i + 1;
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

done = false;

function setup() {
  WIDTH = 800;
  HEIGHT = 600;
  createCanvas(WIDTH, HEIGHT);
  noLoop();
  sel = createSelect();
  sel.option('Selection Sort');
  sel.option('Bubble Sort');
  sel.option('Insertion Sort');
  sel.changed(newSelection);
  fps = createSelect();
  fps.option('MIN');
  fps.option('0.25x');
  fps.option('0.5x');
  fps.option('1x');
  fps.option('2x');
  fps.option('4x');
  fps.option('MAX');
  fps.changed(newFPS);
  amt = createSelect();
  amt.option(10);
  amt.option(25);
  amt.option(50);
  amt.option(75);
  amt.option(100);
  amt.option(150);
  amt.option(200);
  amt.option(500);
  amt.changed(newSelection);
  newFPS();
  sortObj = new SelectionSort(generateData(amt.value(), 100));
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
  const type = sel.value();
  const amount = amt.value();

  const data = generateData(amount, 100);
  switch (type) {
    case 'Selection Sort':
      sortObj = new SelectionSort(data);
      break;
    case 'Bubble Sort':
      sortObj = new BubbleSort(data);
      break;
    case 'Insertion Sort':
      sortObj = new InsertionSort(data);
      break;
  }

  drawArray(sortObj.getArray(), 100, sortObj);
}

function newFPS() {
  let item = fps.value();
  switch (item) {
    case 'MIN':
      frameRate(1);
      break;
    case '0.25x':
      frameRate(7);
      break;
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
    case 'MAX':
      frameRate(1000);
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
    } else if (i == sortObj.minIdx) {
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
