import { Image as OriginalImage } from "element-tiptap";
import MenuImgBtn from "./MenuImgBtn";

export default class CustomImage extends OriginalImage {
  constructor(options) {
    super(options);
    this.toggleModal = options.toggleModal;
  }

  menuBtnView() {
    return {
      component: MenuImgBtn,
      componentProps: {},
      componentEvents: {
        click: () => this.options.toggleModal(),
      },
    };
  }
}
