// import models database
const User = require("../../models/user.model");

module.exports = {
  getReset: async (req, res, next) => {
    const token = req.params.token;
    const newPassword = req.query.new_password;

    const userMatch = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: {
        $gt: Date.now()
      }
    });

    console.log(`post reset: ${userMatch}`)

    if (!userMatch) {
      return res.redirect("/forgot");
    };

    userMatch.password = newPassword;
    userMatch.passwordResetToken = undefined;
    userMatch.passwordResetExpires = undefined;

    await userMatch.save(err => {
      if (err) return res.status(500).send(err.message);
    });
    res.redirect("/logout");
  },
};