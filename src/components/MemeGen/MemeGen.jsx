import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ChromePicker from "react-color";

import "./MemeGen.scss";

export default class MemeGen extends Component {
  state = {
    topText: "Start Of Debug",
    bottomText: "End Of Debug",
    fontFamily: "Arial",
    fontSize: 25,
    fontColor: "rgb(255, 0, 255)",
    mimeType: "image/jpeg",
    imageUrl: "https://i.imgflip.com/2cp1.jpg",
    displayColorPicker: false,
    results: [],
    imageName: null
  };

  canvas = React.createRef();

  componentDidMount() {
    this.renderImage();
  }

  componentDidUpdate() {
    this.renderImage();
  }

  get canvasElement() {
    return this.canvas.current;
  }

  get canvasContext() {
    return this.canvasElement.getContext("2d");
  }

  onChangeHandler = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  toggleColorPicker = () => {
    this.setState(prevState => {
      return {
        displayColorPicker: !prevState.displayColorPicker
      };
    });
  };

  onColorChangeHandler = color => {
    const { r, g, b } = color.rgb;

    this.setState({
      fontColor: `rgb(${r}, ${g}, ${b})`
    });
  };

  onFileChangeHandler = event => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.setState({
        imageUrl: reader.result,
        imageName: file.name
      });
    };

    reader.readAsDataURL(file);
  };

  onSaveHandler = event => {
    event.preventDefault();

    const { mimeType, topText, bottomText, results } = this.state;

    let snapshot;

    if (mimeType === "image/gif") {
      // eslint-disable-next-line no-undef
      const gif = new GIF({
        workers: 2,
        quality: 10
      });

      gif.addFrame(this.canvasElement, { delay: 200 });

      gif.on("finished", blob => {
        const reader = new FileReader();

        reader.onload = () => {
          snapshot = reader.result;

          const result = {
            topText,
            bottomText,
            imageUrl: snapshot
          };

          const newResults = [...results, result];

          this.setState({
            results: newResults
          });
        };

        reader.readAsDataURL(blob);
      });

      gif.render();
    } else {
      snapshot = this.canvasElement.toDataURL(mimeType);

      const result = {
        topText,
        bottomText,
        imageUrl: snapshot
      };

      const newResults = [...results, result];

      this.setState({
        results: newResults
      });
    }
  };

  onDeleteHandler = index => {
    const { results } = this.state;

    const newResults = [...results];

    newResults.splice(index, 1);

    this.setState({
      results: newResults
    });
  };

  renderImage = () => {
    const image = new Image();

    const {
      fontSize,
      fontFamily,
      fontColor,
      topText,
      bottomText,
      imageUrl
    } = this.state;

    image.addEventListener("load", () => {
      this.canvasElement.width = image.width;
      this.canvasElement.height = image.height;

      this.canvasContext.drawImage(image, 0, 0);

      this.canvasContext.textAlign = "center";
      this.canvasContext.textBaseline = "middle";
      this.canvasContext.font = `${fontSize}px ${fontFamily}`;
      this.canvasContext.fillStyle = fontColor;
      this.canvasContext.fillText(topText, this.canvasElement.width / 2, 50);
      this.canvasContext.fillText(
        bottomText,
        this.canvasElement.width / 2,
        this.canvasElement.height - 50
      );
    });

    image.setAttribute("crossorigin", "anonymous"); // tainted canvas fix
    image.setAttribute("src", imageUrl);
  };

  render() {
    const {
      fontColor,
      fontFamily,
      fontSize,
      topText,
      bottomText,
      mimeType,
      displayColorPicker,
      imageName,
      results
    } = this.state;

    return (
      <div className="app">
        <div className="googleFontFix">Fix</div>

        <div className="app__toolbar">
          <div className="form-row">
            <InputGroup className="col-lg-4 app__control">
              <InputGroup.Prepend>
                <InputGroup.Text>File</InputGroup.Text>
              </InputGroup.Prepend>
              <div className="custom-file">
                <input
                  id="image"
                  name="file"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={this.onFileChangeHandler}
                  className="custom-file-input"
                />
                <label className="custom-file-label" htmlFor="image">
                  {imageName || "Select"}
                </label>
              </div>
            </InputGroup>

            <InputGroup className="col-lg-4 app__control">
              <InputGroup.Prepend>
                <InputGroup.Text id="topText">Top Text</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Type text..."
                onChange={this.onChangeHandler}
                name="topText"
                value={topText}
                aria-label="Top Text"
                aria-describedby="topText"
              />
            </InputGroup>

            <InputGroup className="col-lg-4 app__control">
              <InputGroup.Prepend>
                <InputGroup.Text id="bottomText">Bottom Text</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Type text..."
                onChange={this.onChangeHandler}
                name="bottomText"
                value={bottomText}
                aria-label="Bottom Text"
                aria-describedby="bottomText"
              />
            </InputGroup>
          </div>

          <div className="form-row">
            <InputGroup className="col-lg-4 app__control">
              <InputGroup.Prepend>
                <InputGroup.Text id="font">Font</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="custom-select"
                as="select"
                name="fontFamily"
                value={fontFamily}
                onChange={this.onChangeHandler}
                aria-label="Font Family"
                aria-describedby="font"
              >
                <option disabled="disabled">Choose</option>
                <option value="Arial">Arial</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Pacifico">Pacifico</option>
              </FormControl>
            </InputGroup>

            <InputGroup className="col-lg-4 app__control">
              <InputGroup.Prepend>
                <InputGroup.Text id="color">Color</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                readOnly
                name="fontColor"
                value={fontColor}
                onClick={this.toggleColorPicker}
                aria-label="Font Color"
                aria-describedby="color"
              />
              {displayColorPicker ? (
                <div className="popover">
                  <div
                    className="cover"
                    onClick={this.toggleColorPicker}
                    role="presentation"
                  />
                  <ChromePicker
                    color={fontColor}
                    onChange={this.onColorChangeHandler}
                  />
                </div>
              ) : null}
            </InputGroup>

            <InputGroup className="col-lg-4 app__control">
              <InputGroup.Prepend>
                <InputGroup.Text id="size">Font Size</InputGroup.Text>
              </InputGroup.Prepend>
              <input
                style={{
                  flexGrow: 1,
                  width: "auto"
                }}
                className="custom-range"
                type="range"
                min="15"
                max="50"
                name="fontSize"
                value={fontSize}
                onChange={this.onChangeHandler}
                aria-label="Font Size"
                aria-describedby="size"
              />
            </InputGroup>
          </div>
        </div>

        <div className="app__canvas">
          <canvas ref={this.canvas} id="canvas" />
        </div>

        <div className="app__save">
          <InputGroup className="col-lg-6 app__control">
            <FormControl
              className="custom-select"
              as="select"
              name="mimeType"
              value={mimeType}
              onChange={this.onChangeHandler}
              aria-label="Mime Type"
            >
              <option disabled="disabled">Choose</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
              <option value="image/gif">GIF</option>
            </FormControl>
            <InputGroup.Append>
              <Button name="save" onClick={this.onSaveHandler} variant="info">
                Save As
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <div className="app__results">
          <div className="row">
            {results.map((item, index) => {
              return (
                <div className="col-md-4" key={Math.random()}>
                  <div className="card mb-5">
                    <img
                      className="card-img-top"
                      alt="A custom meme"
                      src={item.imageUrl}
                    />
                    <div className="card-body">
                      <p className="card-text">Top Text: {item.topText}</p>
                      <p className="card-text">
                        Bottom Text: {item.bottomText}
                      </p>
                      <a
                        href={item.imageUrl}
                        download="meme"
                        className="btn btn-success"
                      >
                        Download
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          this.onDeleteHandler(index);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
