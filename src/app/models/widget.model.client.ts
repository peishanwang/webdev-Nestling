export class Widget {

  type: String;
  pageId: String;
  name: String;
  size?: Number;
  text?: String;
  url?: String;
  width?: String;

  constructor(type, pageId, name, size: Number, text = 'text', width = '100%', url = 'url') {
    this.type = type;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.url = url;
    this.width = width;
  }
}

