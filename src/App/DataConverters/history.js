export default function convertEndpointHistory(history) {
  let convertedHistory = history.map(point => {
    return {
      latitude: point.latitude,
      longtitude: point.longitude,
      timestamp: point.device_timestamp
    }
  });
  return convertedHistory;
}