import moment from "moment/moment";

export const DateFilter = (dateTime) => {
    // const date = dateTime && moment(dateTime).format('DD/MM/YYYY')
    console.log("new Date(dateTime)", new Date(dateTime));
    const date = dateTime && moment(new Date(dateTime)).format("DD/MM/YYYY")
    return date;
}