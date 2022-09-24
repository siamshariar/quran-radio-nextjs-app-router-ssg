export const checkIsFavorite = (arr, reciterId, chapterIndex) => {
  const filtered = arr.filter(
    (item) => item.reciterId === reciterId && item.chapterIndex === chapterIndex
  );
  if (filtered.length) return true;
  else return false;
};
