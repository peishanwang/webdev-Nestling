export class WidgetText {
  type: String;
  pageId: String;
  name: String;
  text: String;
  rows: Number;
  placeholder: String;
  formatted: Boolean;

  constructor(type, pageId, name, text, rows, placeholder, formatted) {
    this.type = type;
    this.pageId = pageId;
    this.name = name;
    this.text = text;
    this.rows = rows;
    this.placeholder = placeholder;
    this.formatted = formatted;
  }
}
