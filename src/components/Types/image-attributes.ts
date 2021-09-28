export interface iImageAttributes {
    mode: string,
    src: string,
    alt: string,
    width: string,
    widthUom: string,
    height: string,
    heightUom: string,
    borderStyle: string,
    borderColor: string,
    borderWidth: string,
    borderWidthUom: string,
    borderRadius: string,
    borderRadiusUom: string,
    shadow: string,
    shadowColor: string,
    hOffset: string,
    hOffsetUom: string,
    vOffset: string,
    vOffsetUom: string,
    blur: string,
    blurUom: string,
    spread: string,
    spreadUom: string
  }

  export class ImageAttributes implements iImageAttributes {
    mode = '';
    src = '';
    alt = '';
    width = '';
    widthUom = '';
    height = '';
    heightUom = '';
    borderStyle = '';
    borderColor = '';
    borderWidth = '';
    borderWidthUom = '';
    borderRadius = '';
    borderRadiusUom = '';
    shadow = '';
    shadowColor = '';
    hOffset = '';
    hOffsetUom = '';
    vOffset = '';
    vOffsetUom = '';
    blur = '';
    blurUom = '';
    spread = '';
    spreadUom = '';
    constructor(){
        // comment here to eliminate empty constructor eslint error
    }
  }