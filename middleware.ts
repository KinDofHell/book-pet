import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sections",
    "/sections/:sectionName",
    "/sections/:sectionName/:id",
  ],
  ignoredRoutes: ["/api/uploadthing", "/api/webhook/clerk"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
