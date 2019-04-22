import Page from "./page";

class ChecklistCreatePage extends Page {
  open() {
    super.open("checklist/create");
  }

  get submitBtn() {
    return $('form button[type="submit"]');
  }

  get AddNewTaskBtn() {
    return $(".checklist-footer > button:first-of-type");
  }

  get getAllRequiredMsg() {
    return $$("span*=required");
  }

  get getCardTasks() {
    return $$('div[class^="CardTask_card_"]');
  }

  get getCardTasksDeleteBtn() {
    return $$('button[class^="CardTask_card-delete"]');
  }

  get getCardTasksInputs() {
    return $$('input[name$=".task"]');
  }

  get getCardTasksTextareas() {
    return $$('textarea[name$=".description"]');
  }

  submit() {
    this.submitBtn.click();
  }

  addNewTask() {
    this.AddNewTaskBtn.click();
  }
}

export default new ChecklistCreatePage();
