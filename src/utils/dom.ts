export class DomUtils {
  static hasScroll = (element: Element) => {
    return element.scrollHeight > element.clientHeight;
  };
}
