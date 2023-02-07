import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (request) => {
  return NextResponse.next();
};
