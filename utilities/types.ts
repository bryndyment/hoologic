// types

export type _Position = { left: number; top: number }

export type _Post = {
  _id: string
  body: any
  bodyThree: any
  bodyTwo: any
  css: any
  description: any
  extra: any
  html: any
  htmlTwo: any
  slug: {
    current: string
  }
  thumbnailImage: {
    asset: {
      _ref: string
    }
  }
  title: string
  visible: boolean
}
