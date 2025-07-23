import { Router } from 'express';
import { AdminController } from '../controllers/admin-controller';
import { isAdmin, isAuthenticated } from '../middlewares/auth-middleware';

const router = Router();
const controller = new AdminController();

router.get('/scholarships', async (req, res) => {
    await controller.listAllScholarships(req, res);
});

router.get('/users', async (req, res) => {
    await controller.listAllUsers(req, res);
});

router.get('/posts', async (req, res) => {
    await controller.listAllPosts(req, res);
});

router.get('/success-stories', async (req, res) => {
    await controller.listAllSuccessStories(req, res);
});

export default router;