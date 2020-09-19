// import models database
const User = require("../../models/user.model");

module.exports = {
  getReset: async (req, res, next) => {
    const token = req.params.token;
    const newPassword = req.query.new_password;

    try {
      const userMatch = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: {
          $gt: Date.now()
        }
      });

      if (!userMatch) {
        return res.redirect("/forgot");
      };

      userMatch.password = newPassword;
      userMatch.passwordResetToken = undefined;
      userMatch.passwordResetExpires = undefined;

      await userMatch.save();
      res.redirect("/logout");
    } catch (err) {
      next(err);
    }
  },
};