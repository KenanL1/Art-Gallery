// Utils to reduce boilerplate
export const routeHandler = async (res, successCallback: () => void) => {
  try {
    await successCallback();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
