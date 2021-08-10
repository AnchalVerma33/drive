const File = require('../models/fileModel');
const Folder = require('../models/folderModel');
const User = require('../models/userModel');

const searchByLetter = async(req, res) => {
    try {
        const queryString = req.params.query;
        console.log(queryString);
        const fileData = await File.find();
        let data = [];
        let flag = -1;
        fileData.map(item => {
            if (queryString == item.name.substr(0, queryString.length)) {
                data.push(item);
            }
            
        })
        console.log("data", data);
        res.status(201).json({
				success: true,
				message: "Successfully Request Made",
				data: data,
			});
    }
    catch (e) {
        if (e.name === "ValidationError") {
			console.log(e);
			const messages = Object.values(e.errors).map((val) => val.message);
			res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			console.log(`Error occured ${e}`);
			return res.status(500).json({
				success: false,
				error: `${e}`,
			});
		}
    }
}


module.exports = { searchByLetter };