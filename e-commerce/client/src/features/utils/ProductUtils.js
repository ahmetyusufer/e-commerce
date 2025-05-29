export const getAveragePoint = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.point, 0) / reviews.length;
};
