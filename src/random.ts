import { customAlphabet } from "nanoid"
export default () => {
  return customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-")()
}
