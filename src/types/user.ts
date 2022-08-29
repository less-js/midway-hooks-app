export interface ICaptcha {
  svg: string
  captchaKey: string
}
export interface IRsa {
  publicKey: string
  rsaKey: string
}

export interface ISignInUser {
  username: string
  password: string
  captchaKey: string
  captcha: string
}

export interface ITokenUser {
  token: string
  user: IUserInfo
}

export interface IAvatar {
  name?: string
  url: string
}

export interface IUserBase {
  id?: number
  name?: string
  password?: string
  username?: string
  nickname?: string
  avatar?: string | IAvatar[]
  email?: string
  phone?: number
  remark?: string
}

export interface IPerson extends IUserBase {
  newPassword?: string
  checkPass?: string
}

export interface IUserInfo extends IUserBase {
  status?: number | boolean
  roles?: any[]
  departments?: any[]
  createdAt?: string
  updatedAt?: string
}

export interface IUser extends IUserInfo {
  role?: string
  department?: string
}
