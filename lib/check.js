export const checkIsFavorite = (arr, reciterId, chapterNo) => {
  const filtered = arr.filter(
    (item) => item.reciterId === reciterId && item.chapterNo === chapterNo
  );
  if (filtered.length) return true;
  else return false;
};

export const checkIsInRecent = (arr, reciterId, chapterNo) => {
  const filtered = arr.filter(
    (item) => item.reciterId === reciterId && item.chapterNo === chapterNo
  );
  if (filtered.length) return true;
  else return false;
};
