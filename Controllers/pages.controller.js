import {
  getAllPages,
  getPageById,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
} from "../Services/pages.services.js";

export const getAllPagesController = async (req, res) => {
  try {
    const pages = await getAllPages();

    res.json(pages);
  } catch (error) {
    console.error("GET PAGES ERROR:", error);

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
    console.error("GET PAGE ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch page",
    });
  }
};

export const getPageBySlugController = async (req, res) => {
  try {
    const page = await getPageBySlug(req.params.slug);

    if (!page) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    if (page.status !== "active") {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    res.json(page);
  } catch (error) {
    console.error("GET PAGE BY SLUG ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch page",
    });
  }
};

export const createPageController = async (req, res) => {
  try {
    const data = {
      ...req.body,
      imageUrl: req.file ? `/uploads/pages/${req.file.filename}` : null,
    };

    const page = await createPage(data);

    res.status(201).json(page);
  } catch (error) {
    console.error("CREATE PAGE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePageController = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.file) {
      data.imageUrl = `/uploads/pages/${req.file.filename}`;
    }

    const page = await updatePage(req.params.id, data);

    res.json(page);
  } catch (error) {
    console.error("UPDATE PAGE ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed update",
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
    console.error("DELETE PAGE ERROR:", error);

    res.status(500).json({
      message: "Failed delete",
    });
  }
};
