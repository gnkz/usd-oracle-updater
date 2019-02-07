const Median = async (feeds) => {
  if (!Array.isArray(feeds)) throw new Error("feeds must be an array");

  if (feeds.length === 0) throw new Error("feeds are empty");

  const results = await Promise.all(feeds);

  const valid = results.filter(filterNotNulls).sort(sortAsc);

  if (valid.length === 0) throw new Error("All feeds failed");

  if (valid.length === 1) return valid[0];

  const isEven = valid.length % 2 === 0;

  if (isEven) {
    return (valid[valid.length / 2 - 1] + valid[valid.length / 2]) / 2;
  }

  return valid[(valid.length - 1) / 2];
};

const sortAsc = (a, b) => {
  return a - b;
};

const filterNotNulls = (val) => val != null;

module.exports = {
  Median,
};
