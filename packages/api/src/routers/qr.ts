import type { TRPCRouterRecord } from "@trpc/server";
import { minioClient } from "../minio/minio-client";

import QRCode from "qrcode";
import { protectedProcedure } from "../trpc";

export const qrRouter = {
    createQRCode: protectedProcedure.mutation(async ({ ctx }) => {
        
        const qrCode = await QRCode.toDataURL(ctx.session.user.id);
        console.log("QR Code: " + qrCode);
        return qrCode;
    }),

    generateQRCodeAndUpload: protectedProcedure.mutation(async ({ctx}) => {
        const userId = ctx.session.user.id;
        const bucketName = "knight-hacks-qr";
        const objectName = `qr-code-${userId}.png`;

        try {
            const bucketExists = await minioClient.bucketExists(bucketName);

            if (!bucketExists) {
                await minioClient.makeBucket(bucketName, "us-east-1");
            }

            const qrData = `user:${userId}`;
            const qrBuffer = await QRCode.toBuffer(qrData);

            await minioClient.putObject(bucketName, objectName, qrBuffer, qrBuffer.length, {
                "Content-Type": "image/png",
            });

            const qrCodeUrl = `minio-g0soogg4gs8gwcggw4ococok.knighthacks.org/${bucketName}/${objectName}}`;
            // const signedUrl = await minioClient.presignedGetObject(bucketName, objectName, 60 * 60);
            console.log("QR Code upload SUCCESS!");
            // console.log("Signed URL: ", signedUrl);
            return { success: true, qrCodeUrl }; 
        } catch (error) {
            console.error("Error generating and uploading QR Code: ", error);
            throw new Error("Failed to generate or upload the QR Code");
        }
    }),

    getQRCode: protectedProcedure.query(async ({ctx}) => {
        const userId = ctx.session.user.id;
        const bucketName = "knight-hacks-qr";
        const objectName = `qr-code-${userId}.png`;

        try {
            const qrCodeUrl = await minioClient.presignedGetObject(bucketName, objectName, 60 * 60 * 24);
            return { qrCodeUrl };
        } catch (error) {
            console.error("Error fetching QR code URL: ", error);
            throw new Error("Failed to fetch the QR code URL.");
        }
    }),
} satisfies TRPCRouterRecord;