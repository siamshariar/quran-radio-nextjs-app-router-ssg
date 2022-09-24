import { config } from "./config";

const apiBaseUrl = config.apiBaseUrl;
const localizationCode = config.localizationCode;
const translationCode = config.translationCode;

async function waitToCallApi() {
  await new Promise((resolve, reject) => setTimeout(resolve, 1200));
}

export async function getChaptersInfo() {
  await waitToCallApi()
  const res = await fetch(
    `${apiBaseUrl}/chapters/localizations/${localizationCode}`
  );
  const info = await res.json();
  return info;
}

export async function getChapterDetails(chapterNo) {
  // waitToCallApi()
  // let data
  // await firebase.database().ref(chapterNo - 1).once('value').then(snapshot => {
  //     data = snapshot.val()
  // })

  const res = await fetch(
    `${apiBaseUrl}/translations/${translationCode}/chapters/${chapterNo}`
  );
  const data = await res.json();
  return data;
}

export async function getVerseDetails(chapterNo, verseNo) {
  //waitToCallApi()

  // let data
  // await firebase.database().ref(`${chapterNo - 1}/verses/${verseNumber - 1}`).once('value').then(snapshot => {
  //     data = Array(snapshot.val())
  // })

  const url = `${apiBaseUrl}/translations/${translationCode}/chapters/${chapterNo}/verses/${verseNo}`;
  const res = await fetch(url);
  if (res.status === 500) {
    return null;
  }
  const data = await res.json();

  return data;
}

export async function getVersesByQuery(verses) {
  const url = `${apiBaseUrl}/translations/${translationCode}?verses=${verses}`;
  return fetchDataByUrl(url);
}

export async function fetchDataByUrl(url) {
  const res = await fetch(url);
  if (res.status === 500) {
    return null;
  }
  return await res.json();
}

// Start Subjective
export async function getSubjectives() {
  const url = `${apiBaseUrl}/subjective/localizations/${localizationCode}?type=1`;
  return fetchDataByUrl(url);
}

export async function getParentSubjectives() {
  const url = `${apiBaseUrl}/subjective/localizations/${localizationCode}?type=2`;
  return fetchDataByUrl(url);
}

export async function getParentSubjectiveBySlug(slug) {
  const url = `${apiBaseUrl}/subjective/${slug}/localizations/${localizationCode}`;
  return fetchDataByUrl(url);
}

export async function getSubjectiveVersesBySlug(slug) {
  const url = `${apiBaseUrl}/subjective/${slug}/verses/localizations/${localizationCode}`;
  return fetchDataByUrl(url);
}

export async function getAllSubjectives() {
  const url = `${apiBaseUrl}/subjective/localizations/${localizationCode}`;
  return fetchDataByUrl(url);
}
// End Subjective

// 99 names of Allah
export async function getNamesOfAllah() {
  const url = `${apiBaseUrl}/names-of-allah/localizations/${localizationCode}`;
  return fetchDataByUrl(url);
}
