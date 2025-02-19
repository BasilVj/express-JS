import { NextFunction, Request, Response } from "express";

interface ResponseError extends Error {
  status?: number;
}

let posts = [
  { id: "1", title: "Post one" },
  { id: "2", title: "Post two" },
  { id: "3", title: "Post three" },
];

export const getPosts = (req: Request, res: Response): void => {
  const { limit } = req.query as { limit: string };
  if (!isNaN(Number(limit)) && Number(limit) > 0) {
    res.json(posts.slice(0, Number(limit)));
    return;
  }
  res.json(posts);
};

export const getPostById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = req.params.id;
  const post = posts.find((data) => data.id === id);
  if (!post) {
    const error = new Error(
      `Post with id : ${id} was not found`
    ) as ResponseError;
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
};

export const addPost = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title } = req.body;
  const id = posts.length + 1;
  if (!title) {
    const error = new Error(`Please include a title`) as ResponseError;
    error.status = 400;
    return next(error);
  }
  posts.push({ title, id: id.toLocaleString() });
  res.status(201).json({ message: "new post added" });
};

export const updatePost = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = req.params.id;
  const { title } = req.body;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(
      `Post with id : ${id} was not found`
    ) as ResponseError;
    error.status = 404;
    return next(error);
  }
  post.title = title;
  res.status(200).json({ message: "Post title updated" });
};

export const deletePost = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = req.params.id;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(
      `Post with id : ${id} was not found`
    ) as ResponseError;
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json({ message: "Post has been deleted" });
};
 
 