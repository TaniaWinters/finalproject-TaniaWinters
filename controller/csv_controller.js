exports.fileupload = function(req, res) {
    console.log("Inside file Upload!!")
    console.log('single route')
    console.log('file:' + JSON.stringify(req.file.path));


    let stream = fs.createReadStream(req.file.path)

    let csvData = [];

    let csvStream = fastcsv
        .parse()
        .on('error', error => console.error(error))
        .on("data", function(data) {
            //console.log("Data Parse: " + JSON.stringify(data))
            dt = data[0].split(',')
                //console.log("DT: " + dt[0])
            csvData.push({
                username: dt[0],
                identifier: dt[1],
                firstName: dt[2],
                lastName: dt[3]
            });
            //console.log((csvData));
        })
        .on("end", async function() {
            // remove the first line: header
            csvData.shift();

            // save to the MongoDB database collection
            try {
                console.log("client:" + CRUDoperations);
                let CRUDinsert = await CRUDoperations.insertMany(
                    csvData
                )
                console.log("CRUD Insert Many" + CRUDinsert)
                res.status(200).send(CRUDinsert);

            } catch (err) {
                console.log("db error:" + err);
                res.status(400).send(err);
            }
            console.log(JSON.stringify(csvData));
        });

    stream.pipe(csvStream);
}