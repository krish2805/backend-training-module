const { v4: uuidv4 } = require("uuid");
const { minioClient, BUCKET } = require("../../config/minio");

module.exports = ({ itemRepo }) => {

    
    async function uploadPictures(item_code, version, files) {
        const uploaded = [];

        for (const file of files || []) {
            const objectName = `${item_code}/v${version}/${uuidv4()}-${file.originalname}`;

            await minioClient.putObject(
                BUCKET,
                objectName,
                file.buffer,
                file.size,
                { "Content-Type": file.mimetype }
            );

            const url = `http://localhost:9000/${BUCKET}/${objectName}`;
            uploaded.push(url);
        }

        return uploaded;
    }

    const createItem = async (req, res) => {
        try {
            const {
                item_code,
                description,
                length,
                breadth,
                height,
                created_by,
            } = req.body;

            const version = 1;

            const pictures = await uploadPictures(
                item_code,
                version,
                req.files
            );

            const item = await itemRepo.create({
                item_code,
                description,
                length,
                breadth,
                height,
                version,
                created_by,
                created_at: new Date(),
                item_pictures: pictures,
            });

            res.status(201).json(item);
        } catch (err) {
            console.error("createItem error:", err);
            res.status(500).json({ message: "Error creating item" });
        }
    };

    const createNewVersion = async (req, res) => {
        try {
            const { item_code } = req.params;
            const {
                description,
                length,
                breadth,
                height,
                created_by,
            } = req.body;

            const latest = await itemRepo.findLatestByCode(item_code);
            const newVersion = latest ? latest.version + 1 : 1;

            const pictures = await uploadPictures(
                item_code,
                newVersion,
                req.files
            );

            const item = await itemRepo.create({
                item_code,
                description,
                length,
                breadth,
                height,
                version: newVersion,
                created_by,
                created_at: new Date(),
                item_pictures: pictures,
            });

            res.status(201).json(item);
        } catch (err) {
            console.error("createNewVersion error:", err);
            res.status(500).json({ message: "Error creating new version" });
        }
    };

    const getLatestItem = async (req, res) => {
        try {
            const { item_code } = req.params;

            const latest = await itemRepo.findLatestByCode(item_code);
            if (!latest) {
                return res.status(404).json({ message: "Item not found" });
            }

            res.json(latest);
        } catch (err) {
            console.error("getLatestItem error:", err);
            res.status(500).json({ message: "Error fetching item" });
        }
    };

    const getAllVersions = async (req, res) => {
        try {
            const { item_code } = req.params;

            const items = await itemRepo.findAllVersions(item_code);
            res.json(items);
        } catch (err) {
            console.error("getAllVersions error:", err);
            res.status(500).json({ message: "Error fetching versions" });
        }
    };

    return {
        createItem,
        createNewVersion,
        getLatestItem,
        getAllVersions,
    };
};
