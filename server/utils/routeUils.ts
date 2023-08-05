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
