const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user progress
// @route   PUT /api/users/progress
// @access  Private
exports.updateProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (req.body.completedLesson) {
      if (!user.progress.completedLessons.includes(req.body.completedLesson)) {
        user.progress.completedLessons.push(req.body.completedLesson);
      }
    }

    if (req.body.points) {
      user.progress.points += req.body.points;
    }

    const now = new Date();
    const lastActive = user.progress.lastActive || new Date(0);
    
    const lastActiveDate = new Date(lastActive).setHours(0, 0, 0, 0);
    const today = new Date(now).setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastActiveDate === yesterday.getTime()) {
      user.progress.streak += 1;
    } else if (lastActiveDate < yesterday.getTime()) {
      user.progress.streak = 1;
    }

    user.progress.lastActive = now;
    
    // Update Hindi level based on points
    if (user.progress.points >= 1000 && user.hindiLevel === 'beginner') {
      user.hindiLevel = 'intermediate';
    } else if (user.progress.points >= 3000 && user.hindiLevel === 'intermediate') {
      user.hindiLevel = 'advanced';
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user.progress
    });
  } catch (err) {
    next(err);
  }
};