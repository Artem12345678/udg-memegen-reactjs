import React from "react";
import { shallow } from "enzyme";
import ChromePicker from "react-color";

import MemeGen from "./MemeGen";

describe("MemeGen.jsx", () => {
  let wrapper;

  const data = {
    topText: "Start Of Debug",
    bottomText: "End Of Debug",
    fontFamily: "Arial",
    fontSize: "25",
    fontColor: "rgb(255, 0, 255)",
    mimeType: "image/jpeg",
    imageUrl: "https://i.imgflip.com/2cp1.jpg",
    fontFamilyOptions: [
      { value: null, text: "Choose...", disabled: true },
      { value: "Arial", text: "Arial" },
      { value: "Comic Sans MS", text: "Comic Sans MS" },
      { value: "Pacifico", text: "Pacifico" }
    ],
    mimeTypeOptions: [
      { value: null, text: "Choose...", disabled: true },
      { value: "image/jpeg", text: "JPG" },
      { value: "image/png", text: "PNG" },
      { value: "image/gif", text: "GIF" }
    ],
    results: []
  };

  const onFileChangeHandler = jest.fn();
  const onSaveHandler = jest.fn();
  const onDeleteHandler = jest.fn();
  const renderImage = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<MemeGen />);

    const instance = wrapper.instance();
    instance.onFileChangeHandler = onFileChangeHandler;
    instance.onSaveHandler = onSaveHandler;
    instance.onDeleteHandler = onDeleteHandler;
    instance.renderImage = renderImage;

    wrapper.setState(data);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("File input element", () => {
    it("exists", () => {
      expect(wrapper.find('[name="file"]').exists()).toBe(true);
    });

    it("triggers onFileChange() method", () => {
      wrapper.find('[name="file"]').simulate("change");

      expect(wrapper.instance().onFileChangeHandler).toBeCalled();
    });
  });

  describe("Top Text input element", () => {
    it("exists", () => {
      expect(wrapper.find('[name="topText"]').exists()).toBe(true);
    });

    it("has right default value", () => {
      expect(wrapper.find('[name="topText"]').prop("value")).toBe(data.topText);
    });

    it("updates corresponding model property", () => {
      const newValue = "Top Text Test";

      const event = {
        target: {
          name: "topText",
          value: newValue
        }
      };

      wrapper.find('[name="topText"]').simulate("change", event);

      expect(wrapper.state("topText")).toBe(newValue);
      expect(wrapper.find('[name="topText"]').prop("value")).toBe(newValue);
    });
  });

  describe("Bottom Text input element", () => {
    it("exists", () => {
      expect(wrapper.find('[name="bottomText"]').exists()).toBe(true);
    });

    it("has right default value", () => {
      expect(wrapper.find('[name="bottomText"]').prop("value")).toBe(
        data.bottomText
      );
    });

    it("updates corresponding model property", () => {
      const newValue = "Bottom Text Test";

      const event = {
        target: {
          name: "bottomText",
          value: newValue
        }
      };

      wrapper.find('[name="bottomText"]').simulate("change", event);

      expect(wrapper.state("bottomText")).toBe(newValue);
      expect(wrapper.find('[name="bottomText"]').prop("value")).toBe(newValue);
    });
  });

  describe("Font Size input element", () => {
    it("exists", () => {
      expect(wrapper.find('[name="fontSize"]').exists()).toBe(true);
    });

    it("has right default value", () => {
      expect(wrapper.find('[name="fontSize"]').prop("value")).toBe(
        data.fontSize
      );
    });

    it("updates corresponding model property", () => {
      const newValue = "50";

      const event = {
        target: {
          name: "fontSize",
          value: newValue
        }
      };

      wrapper.find('[name="fontSize"]').simulate("change", event);

      expect(wrapper.state("fontSize")).toBe(newValue);
      expect(wrapper.find('[name="fontSize"]').prop("value")).toBe(newValue);
    });
  });

  describe("Font Family select element", () => {
    it("exists", () => {
      expect(wrapper.find('[name="fontFamily"]').exists()).toBe(true);
    });

    it("renders the right amount of options", () => {
      expect(wrapper.find('[name="fontFamily"] option').length).toBe(
        data.fontFamilyOptions.length
      );
    });

    it("has right default value", () => {
      expect(wrapper.find('[name="fontFamily"]').prop("value")).toBe(
        data.fontFamily
      );
    });

    it("updates corresponding model property", () => {
      const newValue = "Pacifico";

      const event = {
        target: {
          name: "fontFamily",
          value: newValue
        }
      };

      wrapper.find('[name="fontFamily"]').simulate("change", event);

      expect(wrapper.state("fontFamily")).toBe(newValue);
      expect(wrapper.find('[name="fontFamily"]').prop("value")).toBe(newValue);
    });
  });

  describe("Mime Type select element", () => {
    it("exists", () => {
      expect(wrapper.find('[name="mimeType"]').exists()).toBe(true);
    });

    it("renders the right amount of options", () => {
      expect(wrapper.find('[name="mimeType"] option').length).toBe(
        data.mimeTypeOptions.length
      );
    });

    it("has right default value", () => {
      expect(wrapper.find('[name="mimeType"]').prop("value")).toBe(
        data.mimeType
      );
    });

    it("updates corresponding model property", () => {
      const newValue = "image/gif";

      const event = {
        target: {
          name: "mimeType",
          value: newValue
        }
      };

      wrapper.find('[name="mimeType"]').simulate("change", event);

      expect(wrapper.state("mimeType")).toBe(newValue);
      expect(wrapper.find('[name="mimeType"]').prop("value")).toBe(newValue);
    });
  });

  describe("Colorpicker element", () => {
    it("exists", () => {
      expect(wrapper.find('[name="fontColor"]').exists()).toBe(true);
    });

    it("doesn't show colorpicker itself by default", () => {
      expect(wrapper.find(ChromePicker).exists()).toBe(false);
    });

    it("shows colorpicker itself on click", () => {
      wrapper.find('[name="fontColor"]').simulate("click");

      expect(wrapper.find(ChromePicker).exists()).toBe(true);
    });

    it("updates corresponding model property", () => {
      const newValue = "rgb(255, 255, 255)";

      const event = {
        rgb: {
          r: 255,
          g: 255,
          b: 255
        }
      };

      wrapper.find('[name="fontColor"]').simulate("click");

      wrapper.find(ChromePicker).simulate("change", event);

      expect(wrapper.state("fontColor")).toBe(newValue);
      expect(wrapper.find('[name="fontColor"]').prop("value")).toBe(newValue);
    });
  });

  describe("Save As button element", () => {
    it("exists", () => {
      expect(wrapper.find('[name="save"]').exists()).toBe(true);
    });

    it("triggers onSaveHandler() method", () => {
      wrapper.find('[name="save"]').simulate("click");

      expect(wrapper.instance().onSaveHandler).toBeCalled();
    });
  });

  describe("Results section", () => {
    beforeEach(() => {
      wrapper.setState({
        results: [
          {
            topText: "Top Text Test",
            bottomText: "Bottom Text Test",
            imageUrl: "imageUrl"
          }
        ]
      });
    });

    it("exists", () => {
      expect(wrapper.find(".app__results .row").exists()).toBe(true);
    });

    it("renders the right amount of elements", () => {
      expect(wrapper.find(".app__results .row .col-md-4").length).toBe(
        wrapper.state("results").length
      );
    });

    it("renders right Top Text string", () => {
      expect(
        wrapper
          .find(".app__results .row .col-md-4 p.card-text")
          .at(0)
          .text()
      ).toBe(`Top Text: ${wrapper.state("results")[0].topText}`);
    });

    it("renders right Bottom Text string", () => {
      expect(
        wrapper
          .find(".app__results .row .col-md-4 p.card-text")
          .at(1)
          .text()
      ).toBe(`Bottom Text: ${wrapper.state("results")[0].bottomText}`);
    });

    it("renders right href attribute for the Download link element", () => {
      expect(
        wrapper.find(".app__results .row .col-md-4 .btn-success").prop("href")
      ).toBe(wrapper.state("results")[0].imageUrl);
    });

    describe("Delete button element", () => {
      it("exists", () => {
        expect(
          wrapper.find(".app__results .row .col-md-4 .btn-danger").exists()
        ).toBe(true);
      });

      it("triggers onDeleteHandler() method", () => {
        wrapper
          .find(".app__results .row .col-md-4 .btn-danger")
          .simulate("click");

        expect(wrapper.instance().onSaveHandler).toBeCalled();
      });
    });
  });
});
