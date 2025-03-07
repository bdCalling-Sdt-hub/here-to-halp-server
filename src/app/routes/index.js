const express = require("express");
const router = express.Router();
const AuthRoutes = require("../module/auth/auth.routes");
const AdminRoutes = require("../module/admin/admin.routes");
const UserRoutes = require("../module/user/user.routes");
const DashboardRoutes = require("../module/dashboard/dashboard.routes");
const ManageRoutes = require("../module/manage/manage.routes");
const FeedbackRoutes = require("../module/feedback/feedback.routes");
const BlogRoutes = require("../module/blog/blog.routes");
const ServiceRoutes = require("../module/service/service.routes");
const JobRoutes = require("../module/job/job.routes");
const NewsRoutes = require("../module/news/news.routes");
const PartnerRequestRoutes = require("../module/partnerRequest/partnerRequest.routes");
const ReviewRoutes = require("../module/review/review.routes");
const NewsletterRoutes = require("../module/newsletter/newsletter.routes");

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
  {
    path: "/manage",
    route: ManageRoutes,
  },
  {
    path: "/feedback",
    route: FeedbackRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/service",
    route: ServiceRoutes,
  },
  {
    path: "/job",
    route: JobRoutes,
  },
  {
    path: "/news",
    route: NewsRoutes,
  },
  {
    path: "/partnerRequest",
    route: PartnerRequestRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/newsletter",
    route: NewsletterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
