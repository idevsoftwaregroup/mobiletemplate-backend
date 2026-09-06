import {
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
} from "../Services/pages.services.js";

export const getAllPagesController = async (req, res) => {
  try {
    const pages = await getAllPages();

    res.json(pages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch pages",
    });
  }
};

export const getPageByIdController = async (req, res) => {
  try {
    const page = await getPageById(req.params.id);

    if (!page) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    res.json(page);
  } catch (error) {
    res.status(500).json({
      message: "Failed",
    });
  }
};

export const createPageController = async (req, res) => {
  try {
    console.log("PAGE BODY:", req.body);

    console.log("PAGE FILE:", req.file);

    const data = {
      ...req.body,

      imageUrl: req.file ? `/uploads/pages/${req.file.filename}` : null,
    };

    const page = await createPage(data);

    res.status(201).json(page);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePageController = async (req, res) => {
  try {
    const page = await updatePage(req.params.id, req.body);

    res.json(page);
  } catch (error) {
    res.status(500).json({
      message: "Failed update",
    });
  }
};

export const deletePageController = async (req, res) => {
  try {
    await deletePage(req.params.id);

    res.json({
      message: "Page deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed delete",
    });
  }
};
