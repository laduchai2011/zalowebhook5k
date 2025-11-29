import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_UploadAImage from './handle/UploadAImage';
import Handle_UploadMultipleImages from './handle/UploadMultipleImages';
import Handle_UploadMultipleImagesToZalo from './handle/UploadMultipleImagesToZalo';

dotenv.config();

const router_mutate_image: Router = express.Router();
const handle_uploadAImage = new Handle_UploadAImage();
const handle_uploadMultipleImages = new Handle_UploadMultipleImages();
const handle_uploadMultipleImagesToZalo = new Handle_UploadMultipleImagesToZalo();

router_mutate_image.post(
    '/uploadAImage',
    authentication,
    handle_uploadAImage.upload().single('image'),
    handle_uploadAImage.main
);

router_mutate_image.post(
    '/uploadMultipleImage',
    authentication,
    handle_uploadMultipleImages.upload().array('images', 30), // 👈 Cho phép tối đa 30 ảnh
    handle_uploadMultipleImages.main
);

router_mutate_image.post(
    '/uploadMultipleImageToZalo',
    handle_uploadMultipleImagesToZalo.upload().array('images', 30), // 👈 Cho phép tối đa 30 ảnh
    handle_uploadMultipleImagesToZalo.main
);

export default router_mutate_image;
