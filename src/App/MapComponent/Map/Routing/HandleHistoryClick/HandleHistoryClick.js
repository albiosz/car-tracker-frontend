import store from "../../../../../store/store";

export default function HandleHistoryClick(event) {
  if (event.dateTimeFrom !== undefined && event.dateTimeTo !== undefined) {
    store.dispatch({type: "DATE_TIME", from: event.dateTimeFrom, to: event.dateTimeTo});
  }
  store.dispatch({type: "SHOW_HISTORY", showHistory: event.showHistory});
  store.dispatch({type: "HISTORY_ID", historyId: event.id});
  store.dispatch({type: 'SHOW_LIST', showList: false});
  store.dispatch({type: "HISTORY_TYPE", historyType: event.historyType})
}