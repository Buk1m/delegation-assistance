import { expect } from "chai";
import ChecklistCreatePage from "../pageobjects/checklistCreatePage";
import { baseUrl, callTimeout } from "../constants";

describe("create delegation form", () => {
  before(() => {
    ChecklistCreatePage.loginAsManager();
  });

  it("should display required validation errors", () => {
    ChecklistCreatePage.open();

    ChecklistCreatePage.submit();

    expect(ChecklistCreatePage.getAllRequiredMsg.length).to.equal(2);
  });

  it("Should add new Card task", () => {
    ChecklistCreatePage.open();

    ChecklistCreatePage.addNewTask();
    expect(ChecklistCreatePage.getCardTasks.length).to.equal(2);

    ChecklistCreatePage.addNewTask();
    expect(ChecklistCreatePage.getCardTasks.length).to.equal(3);
  });

  it("Should delete newly created Card task", () => {
    ChecklistCreatePage.open();

    ChecklistCreatePage.addNewTask();
    expect(ChecklistCreatePage.getCardTasks.length).to.equal(2);

    const deleteButtons = ChecklistCreatePage.getCardTasksDeleteBtn;
    deleteButtons[deleteButtons.length - 1].click();
    expect(ChecklistCreatePage.getCardTasks.length).to.equal(1);
  });

  it("should create checklist", () => {
    ChecklistCreatePage.open();

    const inputs = ChecklistCreatePage.getCardTasksInputs;
    const textareas = ChecklistCreatePage.getCardTasksTextareas;
    inputs[inputs.length - 1].setValue("Task name");
    textareas[textareas.length - 1].setValue("Task description");

    ChecklistCreatePage.submit();

    browser.waitUntil(
      () => {
        return browser.getUrl() === baseUrl + "/checklist";
      },
      callTimeout,
      "Create checklist failed. Expected to navigate to page " + baseUrl + "/checklist"
    );
  });
});
