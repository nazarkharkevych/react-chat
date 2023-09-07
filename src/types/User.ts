export interface User {
  name: {
    title: string,
    first: string,
    last: string
  },
  login: {
    uuid: string,
    username: string,
    password: string,
    salt: string,
    md5: string,
    sha1: string,
    sha256: string
  },
  registered: {
    date: string,
    age: number
  },
  picture: {
    large: string,
    medium: string,
    thumbnail: string
  }
}
