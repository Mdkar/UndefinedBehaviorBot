const all = "939728377311547442";
const exchange = "939735936332365824";
const hunan = "939729037146849320";
const laprima = "939736349303521320";
const resnik = "939728800726523975";
const tepper = "939729114057834536";
const uc = "939728658615107704";
const ug = "939734761931411496";

const respond = (userId, placeId, placeName, number, price) => {
  let role = "-1";
  switch (placeId) {
    case "abp":
      role = ug;
      break;
    case "bbb":
      role = uc;
      break;
    case "bs":
      role = uc;
      break;
    case "eg":
      role = resnik;
      break;
    case "cc":
      role = resnik;
      break;
    case "ent":
      role = uc;
      break;
    case "ecg":
      role = exchange;
      break;
    case "gal":
      role = uc;
      break;
    case "gno":
      role = uc;
      break;
    case "hun":
      role = hunan;
      break;
    case "ink":
      role = uc;
      break;
    case "lap":
      role = laprima;
      break;
    case "nrs":
      role = uc;
      break;
    case "tep":
      role = tepper;
      break;
    case "rot":
      role = resnik;
      break;
    case "sch":
      role = uc;
      break;
    case "tah":
      role = resnik;
      break;
    case "tas":
      role = resnik;
      break;
    case "und":
      role = ug;
      break;
    case "urb":
      role = resnik;
      break;
    case "sus":
      role = resnik;
      break;
    default:
      role = "INVALID";
      break;
  }
  const blocks = number === 1 ? "1 block" : number + " blocks";
  const pings = "<@&" + role + "> <@&" + all + ">";
  const message =
    "<@!" +
    userId +
    "> has requested " +
    blocks +
    " for $" +
    price +
    " each from " +
    placeName +
    " " +
    pings;
  return message;
};

module.exports = { respond };
