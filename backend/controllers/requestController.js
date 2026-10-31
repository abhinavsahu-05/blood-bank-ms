const Request = require('../models/Request');

exports.createBloodRequest = async (req, res) => {
  try {
    const { patientName, bloodGroup, units, hospital } = req.body;

    const newRequest = new Request({
      userId: req.user.id,
      patientName,
      bloodGroup,
      units,
      hospital
    });

    await newRequest.save();
    res.status(201).json({ success: true, message: 'Blood request submitted successfully!', request: newRequest });
  } catch (error) {
    console.error('Create Request Error:', error);
    res.status(500).json({ message: 'Server error while creating blood request' });
  }
};

exports.getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching user requests' });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('userId', 'name email phone').sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Get All Requests Error:', error);
    res.status(500).json({ message: 'Server error fetching all requests' });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedRequest = await Request.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    res.status(200).json({ success: true, message: `Request status updated to ${status}`, request: updatedRequest });
  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({ message: 'Server error updating request status' });
  }
};