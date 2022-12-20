import { render, fireEvent, screen } from "@testing-library/react";
import Checklist from "./Checklist";

test("render component", () => {
render(<Checklist />);

const addCheckListButton = screen.getByTestId("add-checklist");
const listItem = screen.getByTestId("list-item");

fireEvent.click(addCheckListButton);

expect(listItem).toHaveTextContent("2");
});