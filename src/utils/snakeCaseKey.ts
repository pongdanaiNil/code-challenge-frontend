import { snakeCase } from 'lodash'

const toSnakeCaseKey = (originObj : any) => {
  let newObj : any = {}
  for (var key in originObj) {
    newObj[snakeCase(key)] = originObj[key];
  }
  return newObj
}

export default toSnakeCaseKey