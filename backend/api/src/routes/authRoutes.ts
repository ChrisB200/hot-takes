import { Router } from "express";
import {
  completeSignup,
  emailExists,
  emailLogin,
  emailSignup,
  getGoogleURL,
  isAuthenticated,
  oauthCallback,
  resendCode,
  verifyCode,
} from "../controllers/authController";
import protectedRoute from "../middleware/protectedRoute";

const router = Router();

router.post("/signup", emailSignup);
router.post("/code/verify", verifyCode);
router.post("/code/resend", resendCode);
router.post("/login", emailLogin);
router.get("/authenticated", protectedRoute, isAuthenticated);
router.get("/email/exists", emailExists);
router.post("/signup/complete", protectedRoute, completeSignup);
router.get("/google/url", getGoogleURL);
router.get("/callback", oauthCallback);

export default router;
