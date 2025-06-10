export default interface Response<T> {
  data: T,
  meta: {
    current_page: number,
    from: number,
    last_page: number,
  }
}