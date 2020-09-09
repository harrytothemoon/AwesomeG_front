import moment from 'moment'

export const Filter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    },
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 80) {
        return value.slice(0, 80) + " ...";
      }
      return value;
    },
  },
}