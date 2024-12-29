import { Client } from "minio";

export const minioClient = new Client({
    endPoint: "minio-g0soogg4gs8gwcggw4ococok.knighthacks.org",
    port: 443,
    useSSL: true,
    accessKey: "reiFjdGLnh00D28xtI6p",
    secretKey: "SBFmUHXZxgxtu0wV7AmWuMicxjDwStD2P2geU3Ib"
})

export default async function TestConnection() {
    try {
        const buckets = await minioClient.listBuckets();
        console.log("Buckets: ", buckets);
    } catch (error) {
        console.error("Buckets Error: ", error);
    }
} 