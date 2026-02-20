const Member = require("../models/Member");

//create member
exports.createMember = async (req, res) => {
    try {
        const member = await Member.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


//get all members

exports.getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


//update member

exports.updateMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


//delete member

exports.deleteMember = async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "member deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};