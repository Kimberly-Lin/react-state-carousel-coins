import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on both arrows", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  const leftArrow = container.querySelector(".fa-chevron-circle-left");
  fireEvent.click(leftArrow);
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("does not show left arrow when at first image", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the right arrow to be in the document but not the left
  expect(
    container.querySelector('.fa-chevron-circle-right')
  ).toBeInTheDocument();
  expect(
    container.querySelector('.fa-chevron-circle-left')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("does not show right arrow when at last image", function () {
  const { container, debug } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  debug();
  // move forward in the carousel
  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  debug();
  // expect the left arrow to be in the document but not the right
  expect(
    container.querySelector('.fa-chevron-circle-right')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('.fa-chevron-circle-left')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
});

it("renders without crashing", function () {
  // this is a low-value test, but better than nothing
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing" />);
});

it("matches snapshot", function () {
  const { container,debug } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing" />);
  debug();
  expect(container).toMatchSnapshot();
});
