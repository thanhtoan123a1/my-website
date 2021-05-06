import { TIME } from './constants';
export function dataBase64URLtoFile(dataURL, filename) {
  let arr = dataURL.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
};

export function timeAgo(time) {

  const seconds = Math.floor((new Date() - time) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return {
      number: Math.floor(interval),
      offset: TIME.YEARS,
    };
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return {
      number: Math.floor(interval),
      offset: TIME.MONTHS,
    };
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return {
      number: Math.floor(interval),
      offset: TIME.DAYS,
    };
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return {
      number: Math.floor(interval),
      offset: TIME.HOURS,
    };
  }
  interval = seconds / 60;
  if (interval > 1) {
    return {
      number: Math.floor(interval),
      offset: TIME.MINUTES,
    };
  }
  return {
    number: Math.floor(seconds),
    offset: TIME.SECONDS,
  };
}
