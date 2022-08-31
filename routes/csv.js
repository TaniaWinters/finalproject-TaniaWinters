/* CRUD operation 'update' router */
router.post("/CRUDupdate", csvController.update)

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

router.post('/single', upload.single('fileUpload'), (req, res) => {
    console.log('single route')
    console.log('file:' + JSON.stringify(req.file));
    res.send("single file upload success");
});


router.post("/fileUpload", upload.single('fileCSV'),
    csvController.fileupload)