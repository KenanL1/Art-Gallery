// Utils to reduce boilerplate
export const routeHandler = async (res, successCallback: () => void) => {
  try {
    await successCallback();
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

// result pagination
export const paginatedResult = async (
  model: any,
  filter: any,
  page: number,
  populate?: string
) => {
  // const limit = req.query.limit;
  const limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page + limit;

  const results: any = {};

  if (endIndex < (await model.countDocuments())) {
    results.next = page + 1;
  }

  if (startIndex > 0) {
    results.prev = page - 1;
  }
  if (populate)
    results.results = await model
      .find(filter)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex)
      .populate(populate);
  else
    results.results = await model
      .find(filter)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);
  return results;
};
