class Vector {
  constructor(hexColor, coordinates) {
    this.hexColor = hexColor;
    this.coordinates = coordinates;
  }
  getCoordinates() {
    return this.coordinates;
  }
  getShape() {
    let returnStatement = "";
    if (this.coordinates.length == 6) {
      this.returnStatement = "triangle";
    }
    if (this.coordinates.length == 8) {
      this.returnStatement = "quad";
    }
    return this.returnStatement;
  }
  getColor() {
    return this.hexColor;
  }
  setCoordinates(x, y, z) {
    this.coordinates[z] = x;
    this.coordinates[z + 1] = y;
  }
}
var masterShapes = [];

function setup() {
  myCanvas = createCanvas(960, 720);
  rectMode(CENTER);
  frameRate = 1000;
  selectorColorum = createColorPicker("pink");

  var newQuad = createButton("Quadrilateral");
  newQuad.mousePressed(newQuadrilateral);

  var newTri = createButton("Triangle");
  newTri.mousePressed(newTriangle);
  
  var saveTheCanvas = createButton("Save Image");
  saveTheCanvas.mousePressed(crtlSave);
}

function draw() {
  background(255);
  //fill(100, 100, 100);
  //quad(myQ[0], myQ[1], myQ[2], myQ[3], myQ[4], myQ[5], myQ[6], myQ[7]);

  //iterate through master list of shapes from top to bottom to create shapes.
  for (i = 0; i < masterShapes.length; i++) {
    fill(masterShapes[i].getColor());
    if (masterShapes[i].getShape() == "quad") {
      //if element is a quad
      quad(
        masterShapes[i].getCoordinates()[0],
        masterShapes[i].getCoordinates()[1],
        masterShapes[i].getCoordinates()[2],
        masterShapes[i].getCoordinates()[3],
        masterShapes[i].getCoordinates()[4],
        masterShapes[i].getCoordinates()[5],
        masterShapes[i].getCoordinates()[6],
        masterShapes[i].getCoordinates()[7]
      );
    } else if (masterShapes[i].getShape() == "triangle") {
      //if a triangle
      triangle(
        masterShapes[i].getCoordinates()[0],
        masterShapes[i].getCoordinates()[1],
        masterShapes[i].getCoordinates()[2],
        masterShapes[i].getCoordinates()[3],
        masterShapes[i].getCoordinates()[4],
        masterShapes[i].getCoordinates()[5]
      );
    }
    for (j = 0; j < masterShapes[i].getCoordinates().length; j += 2) {
      //console.log(masterShapes[i].getCoordinates()[j] + masterShapes[i].getCoordinates()[j + 1]);
      if (
        mouseX > masterShapes[i].getCoordinates()[j] - 10 &&
        mouseX < masterShapes[i].getCoordinates()[j] + 10 &&
        mouseY > masterShapes[i].getCoordinates()[j + 1] - 10 &&
        mouseY < masterShapes[i].getCoordinates()[j + 1] + 10 &&
        mouseIsPressed
      ) {
        console.log("aaaaaaa");
        masterShapes[i].coordinates[j] = mouseX;
        masterShapes[i].coordinates[j + 1] = mouseY;
      }
    }
  }
}

function newQuadrilateral() {
  masterShapes.push(
    new Vector(
      [selectorColorum.value()],
      [
        width / 2,
        height / 2,
        width / 2 + 75,
        height / 2,
        width / 2 + 75,
        height / 2 + 75,
        width / 2,
        height / 2 + 75,
      ]
    )
  );
}

function newTriangle() {
  masterShapes.push(
    new Vector(
      [selectorColorum.value()],
      [
        width / 2,
        height / 2,
        width / 2,
        height / 2 + 75,
        width / 2 + 75,
        height / 2 + 75,
      ]
    )
  );
}

function crtlSave() {
  saveCanvas();
}