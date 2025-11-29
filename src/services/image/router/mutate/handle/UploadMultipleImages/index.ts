import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { AImageFileField } from '@src/dataStruct/photo';
import { MyResponse } from '@src/dataStruct/response';

class Handle_UploadMultipleImages {
    constructor() {}

    upload = (): multer.Multer => {
        const imagePath = path.join(process.cwd(), 'data', 'image');
        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath, { recursive: true });
        }

        const storage = multer.diskStorage({
            destination: (_req, _file, cb) => {
                cb(null, imagePath);
            },
            filename: (req, file, cb) => {
                const userId = req.cookies?.id || 'unknown';
                const timestamp = Date.now();
                const randomSuffix = Math.round(Math.random() * 1e6);
                const ext = path.extname(file.originalname);
                cb(null, `${userId}_${timestamp}_${randomSuffix}${ext}`);
            },
        });

        const upload = multer({
            storage,
            limits: {
                fileSize: 10 * 1024 * 1024, // giới hạn 10MB mỗi ảnh
            },
            fileFilter: (_req, file, cb) => {
                if (!file.mimetype.startsWith('image/')) {
                    return cb(new Error('Only image files are allowed!'));
                }
                cb(null, true);
            },
        });

        return upload;
    };

    main = (req: Request, res: Response) => {
        const files = req.files as Express.Multer.File[] | undefined;

        if (!files || files.length === 0) {
            res.status(400).json({ message: 'No files uploaded' });
            return;
        }

        const fileInfos: AImageFileField[] = files.map((file) => ({
            filename: file.filename,
            path: `/${file.filename}`, // nếu bạn phục vụ static
            size: file.size,
            mimetype: file.mimetype,
        }));

        const resData: MyResponse<AImageFileField[]> = {
            message: 'Đăng tải những hình ảnh thành công !',
            isSuccess: true,
            data: fileInfos,
        };

        res.json(resData);
        return;
    };
}

export default Handle_UploadMultipleImages;
