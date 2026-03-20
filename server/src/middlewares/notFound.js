const notFound = (req, res) => {
  res.status(404).json({ message: "path not found" });
};

export default notFound;
