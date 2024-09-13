import dayjs from "dayjs";
import randomInteger from "../utils/randomInteger";

export const INITIAL_CUSTOMER_INFO = {
  customer: { name: '' },
};

export const QUOTE_DATA = {
  price: randomInteger(10000, 50000),
  date: dayjs.unix(randomInteger(1729569600, 1732251600)),
};
