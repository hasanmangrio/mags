declare module 'react-pageflip' {
  import { Component, ReactNode, CSSProperties } from 'react'

  interface PageFlipProps {
    width: number
    height: number
    size?: 'fixed' | 'stretch'
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    drawShadow?: boolean
    flippingTime?: number
    usePortrait?: boolean
    startPage?: number
    showCover?: boolean
    mobileScrollSupport?: boolean
    onFlip?: (e: { data: number }) => void
    onChangeOrientation?: (e: any) => void
    onChangeState?: (e: any) => void
    onInit?: (e: any) => void
    onUpdate?: (e: any) => void
    className?: string
    style?: CSSProperties
    startZIndex?: number
    autoSize?: boolean
    clickEventForward?: boolean
    useMouseEvents?: boolean
    swipeDistance?: number
    showPageCorners?: boolean
    disableFlipByClick?: boolean
    maxShadowOpacity?: number
    children?: ReactNode
    ref?: React.Ref<any>
  }

  export default class HTMLFlipBook extends Component<PageFlipProps> {
    pageFlip(): {
      flipNext: (corner?: string) => void
      flipPrev: (corner?: string) => void
      flip: (page: number, corner?: string) => void
      getCurrentPageIndex: () => number
      getPageCount: () => number
    }
  }
}
