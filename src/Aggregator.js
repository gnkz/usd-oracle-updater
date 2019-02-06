const Median = async (feeds) => {
  const results = await Promise.all(feeds);

  const valid = results.filter(value => value != null).sort();

  if (valid.length === 0) throw new Error("All feeds failed");

  if (valid.length === 1) return valid[0];

  const isEven = valid.length % 2 === 0;

  if (isEven) {
    return (valid[valid.length / 2 - 1] + valid[valid.length / 2]) / 2;
  }

  return valid[(valid.length - 1) / 2];
};

module.exports = {
  Median,
};
